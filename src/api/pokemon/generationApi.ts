import api from "@/util/reqApi.ts";

export type getGenerationData = {
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

export function getGenerationsInfo(id: number) {
    return api({
        url:`/generation/${id}`,
        method: "get"
    });
}
