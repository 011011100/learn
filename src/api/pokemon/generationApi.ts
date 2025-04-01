import api from "@/util/reqApi.ts";

export type getGenerationData = {
    id?: number,
    name?: string,
    limit?: number,
    offset?: number
}

export function getGenerationsPageList(data?: getGenerationData) {
    return api({
        url: "/generation",
        method: "get",
        params: {
            data
        }
    });
}
