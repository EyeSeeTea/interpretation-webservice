import { FutureData } from "../../data/future";
import { Interpretation } from "../entities/Interpretation";

export interface InterpretationRepository {
    get(id: string): FutureData<Interpretation>;
}
