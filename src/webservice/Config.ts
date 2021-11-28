import * as purifyTs from "purify-ts";
import { Codec } from "purify-ts";

export const configCodec = Codec.interface({
    port: purifyTs.number,
    dhis2Api: Codec.interface({
        url: purifyTs.string,
        auth: Codec.interface({
            username: purifyTs.string,
            password: purifyTs.string,
        }),
    }),
});

export type Config = purifyTs.GetType<typeof configCodec>;
