"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonComponent from '@/components/ui/ButtonComponent';

interface LabelPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    labelText: string;
    setLabelText: (val: string) => void;
    selectedClass: string;
    onConfirm: () => void;
}

export default function LabelPromptModal({
    isOpen,
    onClose,
    labelText,
    setLabelText,
    selectedClass,
    onConfirm,
}: LabelPromptModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="w-[90%] md:max-w-[425px]! ">
                <DialogHeader>
                    <DialogTitle className="text-white tracking-wide">Label Your Annotation</DialogTitle>
                    <DialogDescription className="text-[#9B98AE]">
                        Name this segment before saving to the database.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                    <Input 
                        type="text" 
                        value={labelText}
                        onChange={(e) => setLabelText(e.target.value)}
                        placeholder={`e.g. ${selectedClass}`}
                        className="w-full bg-[#0d0a1f] border-white/[0.08] text-white focus-visible:ring-[#FFB13F] focus-visible:border-[#FFB13F] transition-all duration-200"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onConfirm();
                            }
                        }}
                    />
                </div>

                <DialogFooter className="flex justify-end gap-2.5">
                    {/* <Button 
                        variant="outline" 
                        onClick={onClose}
                        className="bg-transparent hover:bg-white/[0.05] border-white/[0.08] text-white hover:text-white transition"
                    >
                        Discard
                    </Button> */}
                    <ButtonComponent buttonName="Discard" onClick={onClose} varient="red"/>
                    <ButtonComponent buttonName="Confirm & Save" onClick={onConfirm} varient="green"/>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}