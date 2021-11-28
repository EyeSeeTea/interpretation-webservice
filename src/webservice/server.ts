import express, { Response } from "express";
import fs from "fs";
import { getCompositionRoot } from "../compositionRoot";
import { D2Api } from "../data/d2-api";
import { Config, configCodec } from "./Config";
import { FutureData } from "../data/future";
import cors from "cors";

export function runAccessWebserver(config: Config): void {
    const api = new D2Api({ baseUrl: config.dhis2Api.url, auth: config.dhis2Api.auth });
    const port = config.port;
    const compositionRoot = getCompositionRoot(api);

    const app = express();
    app.use(cors());

    app.get("/access/interpretation/:interpretationId/users/:usernames", (req, res) => {
        const { params } = req;
        const usernames = params.usernames.split(",");
        const options = { interpretationId: params.interpretationId, usernames };
        return run(res, compositionRoot.getInterpretationAccess.execute(options));
    });

    app.get("/access/:objectId/users/:usernames", (req, res) => {
        const { params } = req;
        const usernames = params.usernames.split(",");
        return run(res, compositionRoot.getObjectAccess.execute({ objectId: params.objectId, usernames }));
    });

    app.get("/access/:objectId/interpretation/:interpretationId/comment/:commentId", (req, res) => {
        return run(res, compositionRoot.getObjectCommentAccess.execute(req.params));
    });

    app.listen(config.port, () => {
        console.info(`Server started at http://localhost:${port}`);
    });
}

function run<Data>(res: Response, data$: FutureData<Data>): void {
    data$.run(
        data => res.json(data),
        err => res.status(400).json({ message: err })
    );
}

export function runServer() {
    const [configFile] = process.argv.slice(2);
    if (!configFile) throw new Error("Usage: server CONFIG_FILE.json");

    const configContents = fs.readFileSync(configFile, "utf8");
    const configE = configCodec.decode(JSON.parse(configContents));

    configE.caseOf({
        Left: err => {
            console.error(err);
            process.exit(1);
        },
        Right: config => runAccessWebserver(config),
    });
}
