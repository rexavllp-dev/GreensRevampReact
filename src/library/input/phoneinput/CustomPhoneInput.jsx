"use client";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import React, { useEffect, useState } from 'react';
import { bahrainFlag, indiaFlag, kuwaitFlag, omanFlag, qatarFlag, saudiFlag, uaeFlag } from "@/assets/icons/index.js";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import { ArrowDown } from '@/components/customicons';
import './CustomPhoneInput.scss'
import PhoneArrowDown from '@/components/customicons/PhoneArrowDown';
import CustomInput from '../custominput/CustomInput';
import PropTypes from 'prop-types';
import { getCountries } from 'react-phone-number-input';
import { getCountryCallingCode } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en'

export default function CustomPhoneInput({ label, placeholder, value, isRequired, onChange, name, getCountry, isInvalid, errMsg, ...rest }) {
    // `value` will be the parsed phone number in E.164 format.
    // Example: "+12133734253".

    const countries = [
        {
            id: 1,
            name: 'United Arab Emirates',
            code: 'AE',
            flag: uaeFlag,
            phoneCode: '+971'
        },
        {
            id: 2,
            name: 'Kuwait',
            code: 'KW',
            flag: kuwaitFlag,
            phoneCode: '+965'
        },
        {
            id: 3,
            name: 'Oman',
            code: 'OM',
            flag: omanFlag,
            phoneCode: '+968'
        },
        {
            id: 4,
            name: 'Qatar',
            code: 'QA',
            flag: qatarFlag,
            phoneCode: '+974'
        },
        {
            id: 5,
            name: 'Saudi Arabia',
            code: 'SA',
            flag: saudiFlag,
            phoneCode: '+966'
        },
        {
            id: 6,
            name: 'Bahrain',
            code: 'BH',
            flag: bahrainFlag,
            phoneCode: '+973'
        },
        {
            id: 7,
            name: 'India',
            code: 'IN',
            flag: indiaFlag,
            phoneCode: '+91'
        }
    ];

    const [selectedCountry, setSelectedCountry] = React.useState('AE');
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    const [showAllCountries, setShowAllCountries] = React.useState(false);

    const handleInputChange = (e) => {
        let countryCallingCode = '+' + getCountryCallingCode(selectedCountry)
        onChange(e, countryCallingCode)
    }

    const [phone, setphone] = useState();
    return (
        <div className='phone-input-wrapper'>
            <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
                {isRequired && <span>*</span>}</p>
            <div className="input-container">

                <div>
                    <div className="customphonecountry" onBlur={() => setIsDropdownVisible(false)} tabIndex={1}>
                        <div className={isInvalid ? 'phonecountry invalid-input' : "phonecountry"}
                            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                        >
                            <div className="icon">
                                <PhoneArrowDown />
                            </div>
                            <Image
                                src={
                                    `http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`
                                }
                                alt={selectedCountry}
                                width={25}
                                height={25}
                            />
                        </div>

                        <div className={isDropdownVisible ? "phonecountry-dropdown" : " display-none"}>

                            {
                                countries.map((country) => (
                                    <div className='phonecountry-dropdown-item'
                                        key={country.code}
                                        onClick={() => {
                                            setSelectedCountry(country.code);
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        {country.name}
                                    </div>
                                ))
                            }

                            {
                                showAllCountries &&
                                getCountries().map((country) => (
                                    <div className='phonecountry-dropdown-item'
                                        key={country}
                                        onClick={() => {
                                            setSelectedCountry(country);
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        {en[country]}
                                    </div>
                                ))
                            }
                            <div className="showmore">
                                <span style={{ cursor: 'pointer', textAlign: 'end', }} onClick={() => setShowAllCountries(!showAllCountries)}>{showAllCountries ? 'Show Less...' : 'Show More...'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="phone-input-relative">
                    <p>+ {getCountryCallingCode(selectedCountry)}</p>
                    <input
                        value={value}
                        type="text"
                        maxLength={10}
                        name={name}
                        className={isInvalid ? 'phone-input invalid-input' : 'phone-input'}
                        placeholder={placeholder ? placeholder : 'Phone Number'}
                        onChange={handleInputChange}
                    />
                </div>

            </div>
            <p className="errmsg">{isInvalid ? errMsg : ''}</p>
        </div>
        // <PhoneInput
        // international
        // defaultCountry='AE'
        // countryCallingCodeEditable={false}
        // placeholder="Enter phone number"
        // value={phone}   
        // inputComponent={CustomInput}
        // onChange={setphone}
        // />

        //     <select
        //     {...rest}
        //     value={value}
        //     onChange={event => onChange(event.target.value || undefined)}>
        //     <option value="">
        //       {en['ZZ']}
        //     </option>
        //     {getCountries().map((country) => (
        //       <option key={country} value={country}>
        //         {en[country]} +{getCountryCallingCode(country)}
        //       </option>
        //     ))}
        //   </select>
    )
}

CustomPhoneInput.propTypes = {
    getCountry: PropTypes.func,

}


CustomPhoneInput.defaultProps = {
    getCountry: () => { }
}