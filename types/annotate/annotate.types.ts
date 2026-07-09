export interface CreateProjectPayload {
    title: string;
    description: string;
    images: File[];
}
export interface UpdateProjectPayload {
    title?: string;
    description?: string;
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface Annotation {
    id: string;
    coordinates: Coordinate[];
    fill_color: string;
    label: string;
    created_at: string;
    updated_at: string;
    image: string;
}

export interface ProjectImage {
    id: string;
    annotations: Annotation[];
    image_url: string;
    order_index: number;
    width: number;
    height: number;
    created_at: string;
    project: string;
}

export interface TProject {
    id: string;
    title: string;
    description: string;
    images: ProjectImage[];
    created_at: string;
    updated_at: string;
    user: number;
}