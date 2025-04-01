import api from "@/util/reqApi.ts";

export type getVersionData = {
    id?: number,
    name?: string,
    limit?: number,
    offset?: number
}

export function getVersionList(data?: getVersionData) {
    return api({
        url: "/version",
        method: "get",
        params: {
            data
        }
    });
}

export function getVersionGroupList(data?: getVersionData) {
    return api({
        url: "/version-group",
        method: "get",
        params: {
            data
        }
    });
}
