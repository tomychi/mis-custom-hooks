import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {
    // manejar si el url no se envia

    //**** 

    // si el componente esta montado
    const isMounted = useRef(true);

    const [state, setState] = useState({ 
        data: null, 
        loading: true, 
        error: null, 
    });

    useEffect( () => {
        return () => {
            isMounted.current = false;
        }// cuando se desmonta
    }, []) // la primera vez


    useEffect(() => {

        setState({data:null, loading:true, error: null});

        fetch( url )
            .then( resp => resp.json())
            .then( data => {

                if (isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch( ()=> {
                setState({
                    data:null,
                    loading: false,
                    error: 'no se pudo cargar la informacion'
                })
            });

        
    }, [url])
    
    return state;

}
