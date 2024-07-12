import { defineStore } from 'pinia'

export const userCompetition = defineStore('competition', () => {
    const startCard = [{
        title: "monf2024",
        status: "start",
        time: "2024",
        endDate: "2024/9/2",
        userName: "Monf赛事主办",
        path: "/monf/2024"
    }]
    const endCard = [{
        title: "monf2023",
        status: "end",
        time: "2023",
        endDate: "2023/9/2",
        userName: "Monf赛事主办",
        path: "/monf/2023"
    },
    {
        title: "bof2023",
        status: "end",
        time: "2023",
        endDate: "2023/9/2",
        userName: "音柚娘",
        path: "https://baidu.com"
    }]
    return {
        startCard,
        endCard,
    }
})