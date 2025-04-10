import api from "@/util/reqApi.ts";


export type getResourceListData = {
    limit?: number,
    offset?: number
}

export function getResourceList(data: getResourceListData): Promise<any> {
    return api({
        url: "/",
        method: "get",
        params: {
            limit: data.limit,
            offset: data.offset
        }
    });
}

export function getPokemonInfo(id: string): Promise<any> {
    return api({
        url: `pokemon/${id}`,
        method: "get"
    });
}

export function getPokemonSpeciesInfo(id: string): Promise<any> {
    return api({
        url: "pokemon-species",
        method: "get",
        params: {
            id: id
        }
    });
}
