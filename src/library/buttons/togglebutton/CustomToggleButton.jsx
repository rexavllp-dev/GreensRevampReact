import React from 'react'
import './CustomToggleButton.scss'
import { Switch, cn } from '@nextui-org/react'

const CustomToggleButton = ({ label }) => {
    return (
        <div className='togglebtn-wrapper'>
            <p className='togglebtn-label'>{label}</p>
            <Switch
                color='success'
                classNames={{
                    base: cn(
                        "",
                    ),
                    wrapper: "",
                    thumb: cn(
                        // pressed
                        // "group-data-[pressed=true]:w-7",
                        // "group-data-[selected]:group-data-[pressed]:ml-4",
                    ),
                }}
            >
            </Switch>
        </div>
    )
}

export default CustomToggleButton