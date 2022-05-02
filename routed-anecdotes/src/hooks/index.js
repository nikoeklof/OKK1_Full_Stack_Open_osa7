import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
        
    }
    const resetField = () => {
        setValue("")
        
    }

    return {
        type,
        value,
        onChange,
        resetField
    }
}

// moduulissa voi olla monta nimettyä eksportia
// export const useAnotherHook = () => {

// }