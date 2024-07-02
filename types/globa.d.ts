
declare global {
    type LangEnmu = "zh-cn" | "en";
    type LangEnmuSelect = LangEnmu | "auto"

    interface Setting {

    }
    interface Tab {
        path?: string;
        label?: string;
        icon?: string
        type?: "ground" | "line"
    }
}
export { } 