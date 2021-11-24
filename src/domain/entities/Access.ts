export interface Access {
    object: { id: ObjectId; name: string };
    userAccesses: Array<{
        user: { id: string; username: string };
        access: { read: boolean };
    }>;
}

export type ObjectId = string;
export type Username = string;
