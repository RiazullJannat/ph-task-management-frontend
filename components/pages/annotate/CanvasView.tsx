"use client";

import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Line, Circle, Group, Text, Rect } from 'react-konva';
import { ProjectImage, Coordinate, Annotation } from "@/types/annotate/annotate.types";
import Konva from 'konva';
import { createAnnotation, deleteAnnotation } from "@/service/task_service/task.service";

import TopBarControls from './TopBarControls';
import BottomToolbar from './BottomToolbar';
import LabelPromptModal from './LabelPromptModal';

// Colors strictly mapped from styles.md tokens
const COLORS = {
    Tumor: '#F50F0F',    // --accent-red
    Lesion: '#FFB13F',   // --accent-yellow
    Healthy: '#05DF72',  // --accent-green
};

export default function CanvasView({ images = [], viewId = "1" }: { images: ProjectImage[], viewId?: string }) {
    // We maintain a local copy of images to persist annotations dynamically
    const [imagesData, setImagesData] = useState<ProjectImage[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    // Tools State
    const [isSegmentationMode, setIsSegmentationMode] = useState(false);
    const [selectedClass, setSelectedClass] = useState('Tumor');
    const [hideAnnotations, setHideAnnotations] = useState(false);
    const [applyCTWindow, setApplyCTWindow] = useState(false);

    // Canvas Transformation State
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Active Drawing Points
    const [activePoints, setActivePoints] = useState<Coordinate[]>([]);

    // Label Dialog Modal State
    const [showLabelModal, setShowLabelModal] = useState(false);
    const [labelText, setLabelText] = useState('');
    const [pendingPoints, setPendingPoints] = useState<Coordinate[]>([]);

    const stageRef = useRef<any>(null);
    const imageRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

    // Generate a unique key based on image IDs to avoid reference-based re-triggering of useEffect
    const imagesKey = images.map(img => img.id).join(',');

    // Initialize/Sync images props to state ONLY when image IDs actually change (e.g. changing project or first load)
    useEffect(() => {
        if (images && images.length > 0) {
            setImagesData(JSON.parse(JSON.stringify(images))); // Deep copy to prevent prop mutation issues
        }
    }, [imagesKey]);

    // Handle container resizing
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height: Math.max(height, 500) });
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const currentImage = imagesData[currentIndex] || images[currentIndex];
    const imageUrl = currentImage ? (currentImage.image_url || (currentImage as any).image) : null;

    // Load Image DOM Element
    useEffect(() => {
        if (!imageUrl) {
            setImageError("No image URL found");
            setLoadedImage(null);
            return;
        }

        setImageError(null);
        setLoadedImage(null);

        const img = new window.Image();
        img.src = imageUrl;

        img.onload = () => {
            setLoadedImage(img);
        };

        img.onerror = (err) => {
            console.error("Failed to load image:", imageUrl, err);
            setImageError("Failed to load image slice");
        };
    }, [imageUrl]);

    // Apply CT filter using Konva's built-in filters (Contrast & Grayscale)
    useEffect(() => {
        if (imageRef.current && loadedImage) {
            if (applyCTWindow) {
                imageRef.current.cache();
                imageRef.current.filters([Konva.Filters.Grayscale, Konva.Filters.Contrast]);
                imageRef.current.contrast(45); // Set custom contrast
            } else {
                imageRef.current.filters([]);
                imageRef.current.clearCache();
            }
            if (stageRef.current) {
                stageRef.current.batchDraw();
            }
        }
    }, [loadedImage, applyCTWindow]);

    // Reset view transforms when switching images
    useEffect(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setActivePoints([]);
        setIsSegmentationMode(false);
    }, [currentIndex]);

    const saveActiveDrawing = async (label: string, pointsToSave: Coordinate[]) => {
        if (pointsToSave.length < 2) return;

        const newAnnotation = {
            image: currentImage.id,
            coordinates: pointsToSave,
            fill_color: COLORS[selectedClass as keyof typeof COLORS] || '#F50F0F',
            label: label
        };

        // Temporary unique ID for optimistic update
        const tempId = `temp-${Date.now()}`;
        const optimisticAnnotation: Annotation = {
            id: tempId,
            ...newAnnotation,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        // Update local state instantly
        setImagesData(prev => {
            const copy = [...prev];
            const img = copy[currentIndex];
            if (img) {
                img.annotations = [...(img.annotations || []), optimisticAnnotation];
            }
            return copy;
        });

        try {
            const response = await createAnnotation(newAnnotation);
            if (response?.data?.id) {
                // Update temporary ID with actual DB ID
                setImagesData(prev => {
                    const copy = [...prev];
                    const img = copy[currentIndex];
                    if (img && img.annotations) {
                        const idx = img.annotations.findIndex(a => a.id === tempId);
                        if (idx !== -1) {
                            copy[currentIndex].annotations[idx] = response.data;
                        }
                    }
                    return copy;
                });
            }
        } catch (error) {
            console.error("Auto-save failed:", error);
        }
    };

    const handleConfirmLabel = () => {
        const finalLabel = labelText.trim() || selectedClass;
        saveActiveDrawing(finalLabel, pendingPoints);
        setShowLabelModal(false);
        setPendingPoints([]);
        setLabelText('');
    };

    const handlePrev = () => {
        triggerManualSave();
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        triggerManualSave();
        if (currentIndex < imagesData.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Zooming using mouse wheel
    const handleWheel = (e: any) => {
        e.evt.preventDefault();
        const scaleBy = 1.1;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        setScale(newScale);
        setPosition({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        });
    };

    // Check if clicked close to the first point to auto-close the path
    const checkClickNearFirstPoint = (clickPos: Coordinate, firstPoint: Coordinate, currentScale: number) => {
        const dx = clickPos.x - firstPoint.x;
        const dy = clickPos.y - firstPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const threshold = 12 / currentScale;
        return distance < threshold;
    };

    // Click to add annotation points
    const handleStageMouseDown = (e: any) => {
        if (!isSegmentationMode) return;

        const stage = e.target.getStage();
        const transform = stage.getAbsoluteTransform().copy();
        transform.invert();

        const pos = stage.getPointerPosition();
        const relPos = transform.point(pos);

        if (activePoints.length >= 3 && checkClickNearFirstPoint(relPos, activePoints[0], scale)) {
            const completed = [...activePoints, activePoints[0]]; // Close path
            setPendingPoints(completed);
            setLabelText(selectedClass); // Prefill
            setShowLabelModal(true);
            setIsSegmentationMode(false);
            setActivePoints([]);
        } else {
            setActivePoints(prev => [...prev, { x: relPos.x, y: relPos.y }]);
        }
    };

    const triggerManualSave = () => {
        if (activePoints.length >= 3) {
            const completed = [...activePoints, activePoints[0]]; // Close path
            setPendingPoints(completed);
            setLabelText(selectedClass);
            setShowLabelModal(true);
        }
        setActivePoints([]);
    };

    const toggleSegmentationMode = () => {
        if (isSegmentationMode) {
            triggerManualSave();
        }
        setIsSegmentationMode(!isSegmentationMode);
    };

    const handleUndo = () => {
        if (activePoints.length > 0) {
            setActivePoints(prev => prev.slice(0, -1));
        }
    };

    const handleDeleteAll = async () => {
        const toDelete = [...(currentImage?.annotations || [])];

        setImagesData(prev => {
            const copy = [...prev];
            if (copy[currentIndex]) {
                copy[currentIndex].annotations = [];
            }
            return copy;
        });
        setActivePoints([]);

        for (const ann of toDelete) {
            if (ann.id && !ann.id.startsWith('temp-')) {
                try {
                    await deleteAnnotation(ann.id);
                } catch (e) {
                    console.error("Failed to delete annotation ID:", ann.id, e);
                }
            }
        }
    };

    return (
        <div className="flex flex-col h-[70vh] min-h-[550px] effect border border-white/[0.08] rounded-xl overflow-hidden text-white relative shadow-2xl">
            {/* Top Bar Controls */}
            <TopBarControls
                viewId={viewId}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                currentIndex={currentIndex}
                totalImages={imagesData.length}
                handlePrev={handlePrev}
                handleNext={handleNext}
                hideAnnotations={hideAnnotations}
                setHideAnnotations={setHideAnnotations}
                applyCTWindow={applyCTWindow}
                setApplyCTWindow={setApplyCTWindow}
                isSegmentationMode={isSegmentationMode}
                toggleSegmentationMode={toggleSegmentationMode}
            />

            {/* Canvas Area */}
            <div
                ref={containerRef}
                className={`flex-1 relative  overflow-hidden border-t border-b border-white/[0.05] ${isSegmentationMode ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
                    }`}
            >
                {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0d0a1f]/90 text-[#F50F0F] p-4 text-center z-10 font-bold border border-red-500/10">
                        {imageError}
                    </div>
                )}

                {loadedImage && (
                    <Stage
                        width={dimensions.width}
                        height={dimensions.height}
                        onWheel={handleWheel}
                        onMouseDown={handleStageMouseDown}
                        onTouchStart={handleStageMouseDown}
                        scaleX={scale}
                        scaleY={scale}
                        x={position.x}
                        y={position.y}
                        draggable={!isSegmentationMode}
                        ref={stageRef}
                    >
                        {/* Layer 1: Base Medical Image */}
                        <Layer>
                            <KonvaImage
                                image={loadedImage}
                                ref={imageRef}
                                width={currentImage?.width || loadedImage.width}
                                height={currentImage?.height || loadedImage.height}
                            />
                        </Layer>

                        {/* Layer 2: Annotations (polygons + points) */}
                        {!hideAnnotations && (
                            <Layer>
                                {/* Previously saved/committed annotations */}
                                {currentImage?.annotations?.map((ann) => {
                                    const firstPoint = ann.coordinates[0];
                                    return (
                                        <Group key={ann.id}>
                                            <Line
                                                points={ann.coordinates.flatMap(c => [c.x, c.y])}
                                                stroke={ann.fill_color || '#F50F0F'}
                                                strokeWidth={1.5 / scale}
                                                closed={true}
                                                fill={`${ann.fill_color}25` || 'rgba(245,15,15,0.15)'}
                                            />
                                            {ann.coordinates.map((c, i) => (
                                                <Circle
                                                    key={i}
                                                    x={c.x}
                                                    y={c.y}
                                                    radius={3.5 / scale}
                                                    fill={ann.fill_color || '#F50F0F'}
                                                    stroke="white"
                                                    strokeWidth={1 / scale}
                                                />
                                            ))}

                                            {/* Render Text Badge for Annotation Label */}
                                            {firstPoint && ann.label && (
                                                <Group>
                                                    <Rect
                                                        x={firstPoint.x - 4 / scale}
                                                        y={firstPoint.y - 20 / scale}
                                                        width={(ann.label.length * 6 + 10) / scale}
                                                        height={14 / scale}
                                                        fill={ann.fill_color || '#F50F0F'}
                                                        cornerRadius={3 / scale}
                                                    />
                                                    <Text
                                                        x={firstPoint.x}
                                                        y={firstPoint.y - 18 / scale}
                                                        text={ann.label}
                                                        fontSize={10 / scale}
                                                        fill="white"
                                                        fontStyle="bold"
                                                    />
                                                </Group>
                                            )}
                                        </Group>
                                    );
                                })}

                                {/* Active unsaved drawing */}
                                {activePoints.length > 0 && (
                                    <Group>
                                        <Line
                                            points={activePoints.flatMap(c => [c.x, c.y])}
                                            stroke={COLORS[selectedClass as keyof typeof COLORS] || '#F50F0F'}
                                            strokeWidth={2 / scale}
                                            closed={false}
                                        />
                                        {activePoints.map((c, i) => {
                                            const isFirst = i === 0;
                                            const canClose = isFirst && activePoints.length >= 3;
                                            return (
                                                <Circle
                                                    key={i}
                                                    x={c.x}
                                                    y={c.y}
                                                    radius={(canClose ? 6.5 : 3.5) / scale}
                                                    fill={COLORS[selectedClass as keyof typeof COLORS] || '#F50F0F'}
                                                    stroke={canClose ? '#51A2FF' : 'white'} // Blue border if can close
                                                    strokeWidth={(canClose ? 2 : 1) / scale}
                                                />
                                            );
                                        })}
                                    </Group>
                                )}
                            </Layer>
                        )}
                    </Stage>
                )}

                {/* Overlay for Segmentation Mode */}
                {isSegmentationMode && (
                    <div className="absolute top-4 left-4 bg-[#F50F0F]/15 border border-[#F50F0F]/30 text-[#F50F0F] px-3.5 py-1.5 rounded-full text-xs font-bold font-sans backdrop-blur-md pointer-events-none flex items-center shadow-lg uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#F50F0F] animate-pulse mr-2"></span>
                        Click to Place Points {activePoints.length >= 3 && "(Click first point to complete)"}
                    </div>
                )}
            </div>

            {/* Bottom Toolbar */}
            <BottomToolbar
                scale={scale}
                setScale={setScale}
                setPosition={setPosition}
                handleUndo={handleUndo}
                activePointsLength={activePoints.length}
                handleDeleteAll={handleDeleteAll}
                hasAnnotationsOrPoints={!!(currentImage?.annotations?.length || activePoints.length)}
            />

            {/* Small Label Prompt Modal Overlay */}
            <LabelPromptModal
                isOpen={showLabelModal}
                onClose={() => {
                    setShowLabelModal(false);
                    setPendingPoints([]);
                    setLabelText('');
                }}
                labelText={labelText}
                setLabelText={setLabelText}
                selectedClass={selectedClass}
                onConfirm={handleConfirmLabel}
            />
        </div>
    );
}
