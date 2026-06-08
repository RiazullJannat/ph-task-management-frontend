interface CommentUser {
    id: string;
    name: string;
    avatar_url: string | null;
}

interface CommentReply {
    id: string;
    card_id: string;
    user_id: string;
    content: string;
    is_edited: boolean;
    parent_id: string;
    created_at: string;
    updated_at: string;
    user: CommentUser;
}

export interface TCommentItem {
    id: string;
    card_id: string;
    user_id: string;
    content: string;
    is_edited: boolean;
    parent_id: string | null;
    created_at: string;
    updated_at: string;
    user: CommentUser;
    replies: CommentReply[];
}

