export interface Interpretation {
    id: InterpretationId;
    comments: Array<{
        id: CommentId;
        mentions: Array<{ username: string }>;
    }>;
}

export type InterpretationId = string;
export type CommentId = string;
export type Username = string;
