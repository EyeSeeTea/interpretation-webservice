import { AccessDhis2Repository } from "./data/AccessDhis2Repository";
import { D2Api } from "./data/d2-api";
import { InterpretationDhis2Repository } from "./data/InterpretationDhis2Repository";
import { GetInterpretationAccessUseCase } from "./domain/usecases/GetInterpretationAccessUseCase";
import { GetObjectAccessUseCase } from "./domain/usecases/GetObjectAccessUseCase";
import { GetObjectCommentAccessUseCase } from "./domain/usecases/GetObjectCommentAccessUseCase";
import { FromPromise } from "./utils/ts-utils";

export function getCompositionRoot(api: D2Api) {
    const interpretationRepository = new InterpretationDhis2Repository(api);
    const accessRepository = new AccessDhis2Repository(api);

    return {
        getObjectAccess: new GetObjectAccessUseCase(accessRepository),
        getObjectCommentAccess: new GetObjectCommentAccessUseCase(interpretationRepository, accessRepository),
        getInterpretationAccess: new GetInterpretationAccessUseCase(
            interpretationRepository,
            accessRepository
        ),
    };
}

export type CompositionRoot = FromPromise<ReturnType<typeof getCompositionRoot>>;
