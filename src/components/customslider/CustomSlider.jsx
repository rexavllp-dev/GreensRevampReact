import React from "react";
import { Slider } from "@nextui-org/react";
import CustomTypography from "@/library/typography/CustomTypography";
import "./CustomSlider.scss";

export default function CustomSlider({ value, onChange }) {

    return (
        <div className="slider-wrapper">
            <div className="pricebadge-wrapper">
                <div className="pricebadge">
                    <CustomTypography content={"AED " + value[0]} color="BLACK" size="SMALL" weight="MEDIUM" />
                </div>
                <span>-</span>
                <div className="pricebadge">
                    <CustomTypography content={"AED " + value[1]} color="BLACK" size="SMALL" weight="MEDIUM" />
                </div>
            </div>
            {/* <Slider
                // label="Select a budget"
                // formatOptions={{ style: "currency", currency: "USD" }}
                classNames={{
                    filler: 'sliderfill',
                }}
                size="sm"
                step={10}
                maxValue={1000}
                minValue={0}
                value={value}
                onChange={onChange}
                className="max-w-md"
                renderThumb={(props) => (
                    <div
                        {...props}
                        className="custom-thumb-wrapper"
                    >
                        <span className="custom-thumb"></span>
                    </div>
                )}
            /> */}
            <Slider
                size="md"
                step={10}
                maxValue={1000}
                minValue={0}
                value={value}
                onChangeEnd={onChange}
                color="foreground"
                showOutline={true}
                aria-label="Temperature"
                className="max-w-md"
            />
        </div>
    );
}
