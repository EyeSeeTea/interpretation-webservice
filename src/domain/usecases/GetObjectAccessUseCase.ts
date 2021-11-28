import { FutureData } from "../../data/future";
import { ObjectAccess, ObjectId, Username } from "../entities/ObjectAccess";
import { AccessRepository } from "../repositories/AccessRepository";

export class GetObjectAccessUseCase {
    constructor(private accessRepository: AccessRepository) {}

    execute(options: { objectId: ObjectId; usernames: Username[] }): FutureData<ObjectAccess> {
        return this.accessRepository.get(options);
    }
}
