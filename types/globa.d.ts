type LangEnmu = "zh-cn" | "en";
type LangEnmuSelect = LangEnmu | "auto"

interface Setting {

}

declare global {
    const LangEnmu: LangEnmu;
    const LangEnmuSelect: LangEnmu | "auto";
    const Setting: Setting
}

export { }