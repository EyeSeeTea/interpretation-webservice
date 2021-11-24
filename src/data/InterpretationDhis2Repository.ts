import { FutureData, toFuture } from "./future";
import { Future } from "../utils/future";
import { D2Api } from "./d2-api";
import { InterpretationRepository } from "../domain/repositories/InterpretationRepository";
import { Interpretation } from "../domain/entities/Interpretation";
import { Maybe } from "../utils/ts-utils";

export class InterpretationDhis2Repository implements InterpretationRepository {
    constructor(private api: D2Api) {}

    get(id: string): FutureData<Interpretation> {
        const res$ = this.api.metadata.get({
            interpretations: {
                fields: {
                    id: true,
                    comments: { id: true, mentions: { username: true } },
                },
                filter: { id: { eq: id } },
            },
        });

        return toFuture(res$).flatMap(res => {
            const d2Interpretation = res.interpretations[0] as Maybe<D2Interpretation>;
            return d2Interpretation
                ? Future.success(d2Interpretation)
                : Future.error(`Cannot find interpretation ${id}`);
        });
    }
}

interface D2Interpretation {
    id: string;
    comments: Array<{
        id: string;
        mentions: Array<{ username: string }>;
    }>;
}
