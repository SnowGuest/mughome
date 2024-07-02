
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
    interface LayoutProvide {
        open: "small" | "opened" | "close" | "fullscreen";
        changeSideBar: (bool: LayoutProvide['open']) => void
        showloginMode: () => void
    }
}
export { } 