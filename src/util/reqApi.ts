import request from "./request.ts";
import createErrorMsg from "../components/message/error_message.ts";
import type {AxiosResponse} from "axios";

export default function api(data: any) {
    return new Promise((resolve) => {
        request(data).then((res: AxiosResponse<any, any>|any) => {
            if (res.status !== 200) {
                createErrorMsg(res.message)
            }
            resolve(res)
        })
    })
}
