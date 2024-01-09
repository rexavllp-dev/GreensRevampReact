"use client";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Image from "next/image.js";
import { bahrainFlag, indiaFlag, kuwaitFlag, omanFlag, qatarFlag, saudiFlag, uaeFlag } from "../../../../public/icons/index.js";
import { ArrowDown } from "../../customicons";

export default function CountryDropdown() {

    const countries = [
        //Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, and the United Arab Emirates, India
        {
            id: 1,
            name: 'United Arab Emirates',
            flag: '/icons/uae.png'
        },
        {
            id: 2,
            name: 'Kuwait',
            flag: '/icons/kuwait.png'
        },
        {
            id: 3,
            name: 'Oman',
            flag: '/icons/oman.png'
        },
        {
            id: 4,
            name: 'Qatar',
            flag: '/icons/qatar.png'
        },
        {
            id: 5,
            name: 'Saudi Arabia',
            flag: '/icons/qatar.png'
        },
        {
            id: 6,
            name: 'Bahrain',
            flag: '/icons/bahrain.png'
        },
        {
            id: 7,
            name: 'India',
            flag: '/icons/india.png'
        }
    ]

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
    const [selectedCountry, setSelectedCountry] = React.useState(0);


    return (
        <Dropdown>
            <DropdownTrigger>
                {/* <Button
                    variant="bordered"
                >
                    Open Menu
                </Button> */}

                <div className="flex center gap-2">
                    <Image
                        src={countries[selectedCountry]?.flag}
                        alt={'country flag'}
                        width={25}
                        height={25}
                    />
                    <ArrowDown/>
                </div>

            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="faded"
            >
                {
                    countries.map((country, i) => (
                        <DropdownItem
                            onClick={() => setSelectedCountry(i)}
                            key={country.id}
                            startContent={
                                <Image
                                    src={country.flag}
                                    alt={country.name}
                                    width={20}
                                    height={20}
                                />
                            }
                        > {country.name}
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </Dropdown >
    );
}
