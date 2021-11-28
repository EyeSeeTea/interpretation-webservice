import { FutureData } from "../../data/future";
import { ObjectAccess } from "../entities/ObjectAccess";
import { InterpretationId } from "../entities/Interpretation";
import { AccessRepository } from "../repositories/AccessRepository";
import { InterpretationRepository } from "../repositories/InterpretationRepository";

export class GetInterpretationAccessUseCase {
    constructor(
        private interpretationRepository: InterpretationRepository,
        private accessRepository: AccessRepository
    ) {}

    execute(options: { interpretationId: InterpretationId; usernames: string[] }): FutureData<ObjectAccess> {
        const interpretation$ = this.interpretationRepository.get(options.interpretationId);

        return interpretation$.flatMap(interpretation => {
            return this.accessRepository.get({
                objectId: interpretation.relatedObject.id,
                usernames: options.usernames,
            });
        });
    }
}
