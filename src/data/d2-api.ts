import { D2Api } from "@eyeseetea/d2-api/2.34";
import { getMockApiFromClass } from "@eyeseetea/d2-api";
import { CancelableResponse } from "@eyeseetea/d2-api/repositories/CancelableResponse";

export type { Event } from "@eyeseetea/d2-api/api/events";
export type { CancelableResponse };

export * from "@eyeseetea/d2-api/2.34";
export const getMockApi = getMockApiFromClass(D2Api);
