
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
     interface InstanceBody<T = null> {
        code: number,
        message: string,
        data: T
    }
    interface Pagination {
        page: string | number;
        pageSize: string | number;
    }

}
export { } 