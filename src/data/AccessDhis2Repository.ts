import _ from "lodash";
import { AccessRepository } from "../domain/repositories/AccessRepository";
import { ObjectAccess, ObjectId, Username } from "../domain/entities/ObjectAccess";
import { FutureData, toFuture } from "./future";
import { Future } from "../utils/future";
import { D2Api } from "./d2-api";

export class AccessDhis2Repository implements AccessRepository {
    constructor(private api: D2Api) {}

    get(options: { objectId: ObjectId; usernames: Username[] }): FutureData<ObjectAccess> {
        const resR = this.api.metadata.get({
            visualizations: {
                fields: {
                    id: true,
                    name: true,
                    publicAccess: true,
                    userAccesses: { access: true, id: true },
                    userGroupAccesses: { access: true, id: true },
                },
                filter: { id: { eq: options.objectId } },
            },
            users: {
                fields: {
                    id: true,
                    name: true,
                    userGroups: { id: true },
                    userCredentials: { username: true },
                },
                filter: { "userCredentials.username": { in: options.usernames } },
            },
        });

        return toFuture(resR).flatMap(res => {
            const visualization = res.visualizations[0];
            const users = res.users;
            if (!visualization) return Future.error(`Cannot find object ${options.objectId}`);

            const obj = {
                publicAccess: getD2Access(visualization.publicAccess),
                userAccesses: getD2Accesses(visualization.userAccesses),
                userGroupAccesses: getD2Accesses(visualization.userGroupAccesses),
            };

            const userAccesses = _(users)
                .map(user => {
                    const userCanReadObject =
                        obj.publicAccess.read ||
                        obj.userAccesses[user.id]?.read ||
                        _(user.userGroups).some(userGroup => obj.userGroupAccesses[userGroup.id]?.read);
                    return {
                        user: { id: user.id, name: user.name, username: user.userCredentials.username },
                        access: { read: userCanReadObject },
                    };
                })
                .value();

            const access: ObjectAccess = {
                object: { id: visualization.id, name: visualization.name },
                userAccesses,
            };

            return Future.success(access);
        });
    }
}

interface D2Access {
    read: boolean;
    write: boolean;
}

function getD2Access(access: string): D2Access {
    return {
        read: access[0] === "r",
        write: access[1] === "w",
    };
}

function getD2Accesses(objs: { access: string; id: string }[]): Record<string, D2Access> {
    return _(objs)
        .map(obj => [obj.id, getD2Access(obj.access)])
        .fromPairs()
        .value();
}
