import { FutureData } from "../../data/future";
import _ from "lodash";
import { ObjectAccess, ObjectId } from "../entities/ObjectAccess";
import { CommentId, InterpretationId } from "../entities/Interpretation";
import { AccessRepository } from "../repositories/AccessRepository";
import { InterpretationRepository } from "../repositories/InterpretationRepository";

export class GetObjectCommentAccessUseCase {
    constructor(
        private interpretationRepository: InterpretationRepository,
        private accessRepository: AccessRepository
    ) {}

    execute(options: {
        objectId: ObjectId;
        interpretationId: InterpretationId;
        commentId: CommentId;
    }): FutureData<ObjectAccess> {
        const interpretation$ = this.interpretationRepository.get(options.interpretationId);
        return interpretation$.flatMap(interpretation => {
            const usernames = _(interpretation.comments)
                .filter(comment => comment.id === options.commentId)
                .flatMap(comment => comment.mentions)
                .map(mention => mention.username)
                .uniq()
                .value();

            return this.accessRepository.get({ objectId: options.objectId, usernames });
        });
    }
}
