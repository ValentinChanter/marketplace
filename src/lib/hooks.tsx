import {useEffect, useRef } from 'react'

export const useOuterClick = (callback: (ev:any) => void) => {
    const callbackRef = useRef<(ev:any) => void>(); // init mutable ref, store callback
    const innerRef = useRef<any>(); // returned to client, marks border element
    // update callback on each render, the second got access to current value
    useEffect(()=> { callbackRef.current = callback;});
    
    useEffect(()=>{
        function handleClick(e:any){
            if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)
            ) callbackRef.current(e);
        }
        // register a click on the document 
        document.addEventListener("click", handleClick);
        // remove the handle click
        return() => document.removeEventListener("click", handleClick);

    }, []);
    return innerRef;
}