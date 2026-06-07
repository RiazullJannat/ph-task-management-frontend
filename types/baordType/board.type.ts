export type TCreateBoardPayload = {
    name: string,
    description: string,
    background_color: string,
    visibility: string
}

interface BoardCreator {
    id: string;
    name: string;
    avatar_url: string | null;
}

interface BoardCount {
    cards: number;
}

export interface TBoard {
    id: string;
    workspace_id: string;
    name: string;
    description: string;
    cover_image_url: string | null;
    background_color: string;
    visibility: 'workspace' | 'private' | 'public' | string;
    status: 'active' | 'archived' | string;
    created_by: string;
    created_at: string;
    updated_at: string;
    creator: BoardCreator;
    _count: BoardCount;
    isStarred: boolean;
}