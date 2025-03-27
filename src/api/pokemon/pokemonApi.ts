import api from "@/util/reqApi.ts";

export type getResourceListData = {
    limit?:number,
    offset?:number
}


export function getResourceList(data:getResourceListData):Promise<any> {
    return api({
        url: "/",
        method: "get",
        params:{
            limit:data.limit,
            offset:data.offset
        }
    });
}
