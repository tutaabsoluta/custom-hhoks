import { useState } from "react"
export const useForm = (initialForm = {}) => {

    const [formState, setformState] = useState(initialForm)

    const onInputChange = ({target}) => {
        const {name, value} = target
        setformState({
            ...formState,
            [ name ]: value
        })
        
    }

    const onResetForm = () => {
      setformState(initialForm)
    }

  return {
    formState,
    ...formState,
    onInputChange,
    onResetForm,
  }
}

// Si dejamos el State con el objeto con las propiededes de username, email y password, el hook useForm solo va a poder manejar forms con esa estructura y esa no es la idea

// Yo quiero poder enviar en el useForm el objeto inicial

// El formState es exactamente igual a lo que sea que le pase como argumento

// En el return esparcimos formState para asi poder extraer las propiedades y no tener que desestructurar:

// const { username, email, password } = formState