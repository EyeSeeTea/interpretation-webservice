export interface ObjectAccess {
    object: { id: ObjectId; name: string };
    userAccesses: Array<{
        user: { id: UserId; username: Username };
        access: { read: boolean };
    }>;
}

export type ObjectId = string;
export type Username = string;
export type UserId = string;
