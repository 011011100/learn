import api from "../util/reqApi.ts";

export function getResourceList(data:any):Promise<any> {
    return api({
        url: "/",
        method: "get",
        params:{
            limit:data.limit,
            offset:data.offset
        }
    });
}

export type getBerryListData = {
    id?:number,
    name?:string,
    limit?:number,
    offset?:number
}

export function getBerryList(data:getBerryListData):Promise<any> {
    return api({
        url: "/berry",
        method: "get",
        params:{
            id:data.id,
            name:data.name,
            limit:data.limit,
            offset:data.offset
        }
    });
}
