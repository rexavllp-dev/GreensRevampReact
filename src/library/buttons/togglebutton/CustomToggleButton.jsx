import React from 'react'
import './CustomToggleButton.scss'
import { Switch, cn, select } from '@nextui-org/react'

const CustomToggleButton = ({ label }) => {
    const [isSelected, setIsSelected] = React.useState(true);

    return (
        <div className='togglebtn-wrapper'>
            <p className='togglebtn-label'>{label}</p>
            <Switch
                isSelected={isSelected} onValueChange={setIsSelected}
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
                <p className='togglebtn-label'> {isSelected ? "Active" : "Inactive"}</p>
            </Switch>
        </div>
    )
}

export default CustomToggleButton