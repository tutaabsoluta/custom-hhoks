export const todoReducer = (initialState = [], action) => {


  switch (action.type) {

    case "[TODO] Add Todo":
      return [...initialState, action.payload];

    case "[TODO] Remove Todo":
      return initialState.filter( todo => todo.id != action.payload)

    case "[TODO] Toggle Todo":
      return initialState.map( todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            done: !todo.done
          }
        }
        return todo // siempre debemos retornar un todo
      } )

    default:
      return initialState;
  }
};

// Cuando sabemos que tenemos que hacer algo en el 'return initialState' pero no lo hemos terminado esto por defecto podria dar la impresion de que esta funcionando. Cuando estamos pendientes de implementar algo lo ideal es lanzar un nuevo Error
