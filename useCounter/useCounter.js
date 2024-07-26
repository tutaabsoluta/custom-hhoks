import { useState } from "react"


export const useCounter = ( initialValue = 1 ) => {

    const [counter, setCounter] = useState(initialValue)

    const resetCounter = () => {
        setCounter(0)
    }

    const incrementCounter = () => {
        setCounter(counter + 1)
    }

    const decrementCounter = () => {
        if (counter <= 0) return
        setCounter(counter - 1)
    }

    return {
        counter,
        resetCounter,
        incrementCounter,
        decrementCounter
    }
}

// Tomar en cuenta lo que estamos retornando, esto es importante a la hora de la desestructuracion