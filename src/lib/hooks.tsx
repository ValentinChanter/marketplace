import {useEffect, useRef } from 'react'

export const useOuterClick = (callback: (ev:any) => void) => {
    const callbackRef = useRef<(ev:any) => void>(); // init mutable ref, store callback
    const innerRef = useRef<any>(); // returned to client, marks border element
    // update callback on each render, the second got access to current value
    useEffect(()=> { callbackRef.current = callback;});
    
    useEffect(()=>{
        document.addEventListener("click", handleClick);
        return() => document.removeEventListener("click", handleClick);
        function handleClick(e:any){
            if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.trager)
            ) callbackRef.current(e);
        }
    }, []);
    return innerRef;
}