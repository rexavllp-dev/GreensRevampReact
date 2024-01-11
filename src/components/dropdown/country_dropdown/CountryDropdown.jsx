"use client";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, image } from "@nextui-org/react";
import Image from "next/image.js";
import { bahrainFlag, indiaFlag, kuwaitFlag, omanFlag, qatarFlag, saudiFlag, uaeFlag } from "../../../../public/icons/index.js";
import { ArrowDown } from "../../customicons";
import appConfig from "@/config/appConfig.js";

export default function CountryDropdown() {
    const imageUrl = appConfig.server.imageUrl;

    const countries = [
        //Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, and the United Arab Emirates, India
        {
            id: 1,
            name: 'United Arab Emirates',
            flag: imageUrl + '/icons/uae.png'
        },
        {
            id: 2,
            name: 'Kuwait',
            flag: imageUrl + '/icons/kuwait.png'
        },
        {
            id: 3,
            name: 'Oman',
            flag: imageUrl + '/icons/oman.png'
        },
        {
            id: 4,
            name: 'Qatar',
            flag: imageUrl + '/icons/qatar.png'
        },
        {
            id: 5,
            name: 'Saudi Arabia',
            flag: imageUrl + '/icons/qatar.png'
        },
        {
            id: 6,
            name: 'Bahrain',
            flag: imageUrl + '/icons/bahrain.png'
        },
        {
            id: 7,
            name: 'India',
            flag: imageUrl + '/icons/india.png'
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
