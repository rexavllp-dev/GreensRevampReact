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

export default function CustomAddressRadio({ data }) {
  return (
    <RadioGroup label="" orientation="horizontal">
      {
        data?.map((item) => (
          <div key={item.id} style={{ position: "relative" }}>
            <div style={{ position: 'absolute', right: '5px', top: '5px', cursor:'pointer', borderRadius:'50%', padding:'2px'}}>
              <MdEdit size={20}  color='#555'/>
            </div>
            <CustomRadio style={{
              width: '200px'
            }} description={item.address} value={item.title}>
              {item.title}
            </CustomRadio>
          </div>
        ))
      }
      {/* <CustomRadio description="" value="free">
        Home
      </CustomRadio>
      <CustomRadio description="Unlimited items. $10 per month." value="pro">
        Work
      </CustomRadio> */}
    </RadioGroup>
  );
}
