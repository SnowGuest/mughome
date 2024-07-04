import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userMap = reactive(new Map<User["id"], User>)
    const setUsers = (users: User[]) => {
        users.forEach(e => {
            userMap.set(e.id, e)
        })
    }
    return {
        userMap,
        setUsers
    }
})