
import request from "@/utils/request";



export function getBanners() {
    return request.Get<InstanceBody<Banner[]>>(`/banner`)
}