import request from "@/utils/request"

export interface CategoriesParams {

}
export interface CategoriesBody { categories: Categorie[] }


export function getCategories(params?: CategoriesParams) {
    return request.Get<InstanceBody<CategoriesBody>>("category", params);

}
export function getCategorie(id: number | string) {
    return request.Get<InstanceBody<Categorie>>(`category/${id}`)
}