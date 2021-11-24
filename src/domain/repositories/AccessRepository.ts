import { FutureData } from "../../data/future";
import { Access, ObjectId, Username } from "../entities/Access";

export interface AccessRepository {
    get(options: { objectId: ObjectId; usernames: Username[] }): FutureData<Access>;
}
