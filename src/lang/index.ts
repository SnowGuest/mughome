

export function getAllLanguage(): Record<LangEnmu, any> {
    const modules = import.meta.glob('./*.json', { eager: true, import: 'default', });
    const messages: Record<LangEnmu, any> = {
        "zh-cn": {},
        "en": {}
    }
    for (const key in modules) {
        const value = modules[key]
        Reflect.set(messages, key.replace("./", "").replace(".json", ""), value)
    }
    return messages
}



export function getAllLanguageKey(): LangEnmu[] {
    const modules = import.meta.glob('./*.json', { eager: true, import: 'default' });
    const messages: LangEnmu[] = []
    for (const key in modules) {
        messages.push(key.replace("./", "").replace(".json", "") as LangEnmu)
    }
    return messages
}