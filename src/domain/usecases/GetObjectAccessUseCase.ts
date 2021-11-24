import { FutureData } from "../../data/future";
import { Access, ObjectId, Username } from "../entities/Access";
import { AccessRepository } from "../repositories/AccessRepository";

export class GetObjectAccessUseCase {
    constructor(private accessRepository: AccessRepository) {}

    execute(options: { objectId: ObjectId; usernames: Username[] }): FutureData<Access> {
        return this.accessRepository.get(options);
    }
}
