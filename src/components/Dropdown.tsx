import React, {FC, useState, useEffect} from 'react'
import {useOuterClick} from '../lib/hooks'

type DropdownProps = {
    children: React.ReactNode
    isMouse?: boolean // change mouse design when hovering over event
    isButton?: boolean // show when there is a button to click
    values: string[]
    onSelect:(value:string) => void
}

export const Dropdown: FC<DropdownProps> = ({children, isMouse = false, isButton, values, onSelect}) => {
    const ref = useOuterClick(ev => { // if click outside of component        
        setActive(false)
    })
    const [active, setActive] = useState(false) // show/hide dropdown element
    const onMoveOut = () => { // if the mouse move out of the zone, it's not active anymore
        if(isMouse){            
            setActive(false)
        }
    }
    const onMoveIn = () => { // opposite of onMoveOut
        if(isMouse){
            setActive(true)
        }
    }
    const onClick = () => { 
        if(isButton){            
            setActive(old => !old)            
        }
    }
    const onSelectItem = (value:string) => {        
        setActive(false) // close dropdown
        onSelect(value) 
    }

    return(
        <div onMouseEnter={onMoveIn} onMouseLeave={onMoveOut} ref={ref}>
            <div onClick={onClick}>
                {children}
            </div>
            {active ? (
                <div className="mt-2 py-2 w-48 bg-white absolute z-10 border" >
                    {values.map((value,i) => (
                        <div key={i} onClick={() => onSelectItem(value)} className="block px-4 py-2 text-gray-500 hover:text-mkDarkOrange">{value}</div>
                    ))}
                </div>
            ): null}

        </div>
    )
}