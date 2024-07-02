import request from "@/utils/request";


export function login() {
    return request.Post("/account/login")
}