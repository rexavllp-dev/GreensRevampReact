import React from 'react'
import './CustomToggleButton.scss'
import { Switch, cn, select } from '@nextui-org/react'

const CustomToggleButton = ({ label, value, onChange }) => {
    // const [isSelected, setIsSelected] = React.useState(true);

    return (
        <div className='togglebtn-wrapper'>
            <p className='togglebtn-label'>{label}</p>
            <Switch
                isSelected={value} onValueChange={onChange}
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
                <p className='togglebtn-label'> {value ? "Active" : "Inactive"}</p>
            </Switch>
        </div>
    )
}

export default CustomToggleButton