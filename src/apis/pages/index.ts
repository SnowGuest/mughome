
import request from "@/utils/request";



export function getBanners() {
    return request.Get<InstanceBody<{banners:Banner[]}>>(`/banner`)
}