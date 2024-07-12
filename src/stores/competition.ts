import dayjs from 'dayjs/esm';
import { defineStore } from 'pinia'
import monf2024 from "@/pages/competition/images/monf2024.png"
import monf2023 from "@/pages/competition/images/monf2023.png"
import bof2023 from "@/pages/competition/images/BOF2023.png"
type CompetitionStatus = "noStart" | "stop" | "end" | "start"
export interface Competition {
    title: string;
    status?: any;
    time: string;
    startTime: string;
    deadlineDate?: string; // 截至时间
    endDate: string;
    userName: string;
    path: string;
    img: string;
    type: "monf" | "bof"
}

export const useCompetition = defineStore('competition', () => {
    const competitions = ref<Competition[]>([{
        title: "Monf2024",
        img: monf2024,
        time: "2024",
        type: "monf",
        startTime: "2024/7/15 00:00",
        deadlineDate: "2024/8/20 20:00",
        endDate: "2024/9/7 20:00",
        userName: "Monf赛事主办",
        path: "/monf/2024"
    }, {
        title: "monf2023",
        time: "2023",
        img: monf2023,
        type: "monf",
        startTime: "2023/8/31 16:00",
        deadlineDate: "2023/8/31 16:00",
        endDate: "2023/9/9 16:00",
        userName: "Monf赛事主办",
        path: "/monf/2023",
    }, {
        title: "bof2023",
        time: "2023",
        type: "bof",
        img: bof2023,
        startTime: "2023/10/11 20:00",
        endDate: "2023/11/26 22:59",
        userName: "音柚娘",
        path: "/bof/2023"
    }]);
    competitions.value.forEach(e => {
        e.status = computed<CompetitionStatus>(() => {
            console.log(e)
            if (dayjs().isBefore(dayjs(e.startTime))) return "noStart";
            if (dayjs().isBetween(e.startTime, e.deadlineDate ? e.deadlineDate : e.endDate)) return "start";
            if (e.deadlineDate && dayjs().isBetween(e.deadlineDate, e.endDate)) return "stop";
            return "end"
        })
    })
    const noStartCard = computed<Competition[]>(e => competitions.value.filter(e => e.status === "noStart"));
    const startCard = computed<Competition[]>(e => competitions.value.filter(e => e.status === "start" || e.status === "stop"));
    const endCard = computed<Competition[]>(e => competitions.value.filter(e => e.status === "end"));
    const getCompetition = (time: string, type: Competition["type"]): Competition | undefined => {
        return competitions.value.find(e => e.type === type && e.time === time)
    }
    return {
        startCard,
        endCard,
        noStartCard,
        competitions,
        getCompetition
    }
})