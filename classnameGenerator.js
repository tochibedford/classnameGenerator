
function generateClassName_(unconditionalClasses)
function generateClassName_(conditionalClass)
function generateClassName_(unconditionalClasses, conditionalClass)
function generateClassName_(arg1, arg2){
    function conditionalClassBuilder(arg, classList) {
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
    const classList = []
    if (Array.isArray(arg1)) {
        arg1.forEach(item => {
            classList.push(item)
        })
        if (typeof arg2 === 'object' && arg2 !== null) {
            conditionalClassBuilder(arg2, classList)
        }
    } else if (typeof arg1 === 'object' && arg1 !== null) {
        conditionalClassBuilder(arg1, classList)
    }
    return classList.join(" ")
}