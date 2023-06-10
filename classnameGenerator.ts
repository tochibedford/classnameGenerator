type IConditionalClasses = {
    [k: string]: boolean | boolean[] | (() => boolean),
}

function gCN(unconditionalClasses: string[]): string
function gCN(conditionalClass: IConditionalClasses): string
function gCN(unconditionalClasses: string[], conditionalClass: IConditionalClasses): string
function gCN(arg1: unknown, arg2?: unknown): string {
    function conditionalClassBuilder(arg: IConditionalClasses, classList: string[]) {
        let conditionalClasses = arg
        Object.keys(conditionalClasses).forEach(item => {
            const value = conditionalClasses[item]
            if (typeof value === "boolean" && value) { // boolean
                classList.push(item)
            } else if (Array.isArray(value)) {
                const boolValue = value.reduce((prev, curr) => { //boolean[]
                    return prev && curr
                })
                if (boolValue)
                    classList.push(item)
            } else if (typeof value === 'function' && value()) { //()=>boolean
                classList.push(item)
            }
        })
    }
    const classList: string[] = []
    if (Array.isArray(arg1)) {
        arg1.forEach(item => {
            classList.push(item)
        })
        if (typeof arg2 === 'object' && arg2 !== null) {
            conditionalClassBuilder(arg2 as IConditionalClasses, classList)
        }
    } else if (typeof arg1 === 'object' && arg1 !== null) {
        conditionalClassBuilder(arg1 as IConditionalClasses, classList)
    }
    return classList.join(" ")
}