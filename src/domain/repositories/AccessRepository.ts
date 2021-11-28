import { FutureData } from "../../data/future";
import { ObjectAccess, ObjectId, Username } from "../entities/ObjectAccess";

export interface AccessRepository {
    get(options: { objectId: ObjectId; usernames: Username[] }): FutureData<ObjectAccess>;
}
