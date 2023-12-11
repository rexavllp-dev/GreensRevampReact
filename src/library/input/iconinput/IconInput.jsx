"use client";
import { Input } from '@nextui-org/react'
import React from 'react'
import "./IconInput.scss"

const IconInput = () => {
    return (
        <Input
            classNames={{
                label: "iconinput-label",
                inputWrapper: ["rounded", "border-white", "pl-3","iconinput-wrapper" ],
                input: [
                    "icon-input"
                ],
            }}
            style={{ color: "#FFF", '::placeholder': '#FFF' }}
            placeholder="Enter your email"
            labelPlacement={"outside"}
            // description={"outside"}
            // size='lg'
            radius='none'
            variant='bordered'
            endContent={
                <button className='iconinput-btn'>
                    Subscribe
                </button>
            }
        />

        // <div className='iconinput-wrapper'>
        //     <div className="iconinput">

        //     </div>
        //     <button className='iconinput-btn'>
        //         Subscribe
        //     </button>
        // </div>
    )
}

export default IconInput