import { useEffect } from "react";
import { useState } from "react";

// Como estamos dentro del mismo scope y lo siguiente no se esta exportando se mantiene de esa forma en una variable en memoria que solo este hook va a tener acceso a ella.
const localCache = {};

// Podriamos purgar la data si crece mucho, o solo almacenar las ultimas 10, o invalidarlo, etc
// Tansact query hace lo anterior: es muy potente para peticiones http

export const useFetch = (url) => {


  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  // Cuando la url cambie vuelve a hacer la peticion HTTP
  // Cuando este haciendo nuevamente la peticion seria bueno poner el custom hook en un estado de loading

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  // Con la funcion anterior, cada vez que la url cambie, se establece la data en null para que aparezca el loading

  const getFetch = async () => {

    // Yo ya tengo data, como hago para servirla si ya la habia pedido previamente
    // Verificamos si el localCache tiene un valor y no es undefined
    if (localCache[url]) {

        setState({
          data: localCache[url],
          isLoading: false,
          hasError: false,
          error: null,
        });
        return
    }

    // Si hay algo en cache, no ejecuta ninguna de las lineas siguientes

    setLoadingState();

    const resp = await fetch(url);

    // sleep
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return; // No queremos que siga ejecutando nada mas
    }

    const data = await resp.json();

    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    // Manejo del cache
    localCache[url] = data;
    console.log(localCache);
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};

// Para poder retornar la data hay que actualizar nuestro estado

// No hacer la peticion si la URL es la misma que la anterior

// localCache[url]: Utiliza la notación de corchetes para establecer una propiedad del objeto localCache.

// La notación localCache[url] = data usa url como una clave dinámica en el objeto localCache para asignar data a esa clave.
