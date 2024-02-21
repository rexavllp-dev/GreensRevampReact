import React from "react";
import { RadioGroup, Radio, useRadio, VisuallyHidden, cn } from "@nextui-org/react";
import { MdEdit } from "react-icons/md";

export const CustomRadio = (props) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-black",
      )}
    >

      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">{description}</span>
        )}
      </div>
    </Component>
  );
};

export default function CustomShippingMethodRadio({ data, value, onChange, orientation, width }) {
  return (
    <RadioGroup  style={{ width: width ? width : "auto" }} label="" orientation={orientation ? orientation : "horizontal"} value={value} onValueChange={onChange}>
      {
        data?.map((item) => (
          <div key={item.id}>
            <CustomRadio isDisabled={item.disabled} style={{
            }} description={''} value={item.title}>
              {item.title}
            </CustomRadio>
          </div>
        ))
      }
    </RadioGroup>
  );
}
