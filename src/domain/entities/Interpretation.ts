export interface Interpretation {
    id: InterpretationId;
    relatedObject: { id: string };
    comments: Array<{
        id: CommentId;
        mentions: Array<{ username: string }>;
    }>;
}

export type InterpretationId = string;
export type CommentId = string;
export type Username = string;
