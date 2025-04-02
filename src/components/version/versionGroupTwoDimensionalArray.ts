import request from "@/util/request.ts";

type versionGroup = {
    name: string
    url: string
    versions: Array<{ name: string, zhName?: string}>
}

const columns = async function versionGroupTwoDimensionalArray(versionGroupUrlList:string[]):Promise<versionGroup[]>{
    const back:versionGroup[] = []
    await Promise.all(
        versionGroupUrlList.map(async (url: string) => {
            const res = await request.get(url)
            const data = {
                name: res.data.name,
                url,
                versions: Array<{ name: string, zhName?: string }>()
            }

            await Promise.all(
                res.data.versions.map(async (version: any) => {
                    const res = await request.get(version.url);
                    data.versions.push({
                        name: res.data.name as string,
                        zhName: res.data.names.find((name: any) => name.language.name === "zh-Hans" )?.name as string
                    })
                })
            );
            back.push(data)
        })
    )
    return back
}

export default columns
