import { Textarea } from '@nextui-org/react';
import React from 'react';
import './CustomTextarea.scss';

const CustomTextarea = ({label, placeholder}) => {
  return (
    <Textarea
      variant="bordered"
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      classNames={{
        label: "custominput-label",
        inputWrapper: ["rounded", 'input-wrapper'],
        input: [
          "custom-input"
        ]
      }}
    />
  )
}

export default CustomTextarea  