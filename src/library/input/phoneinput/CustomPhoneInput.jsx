"use client";
import 'react-phone-number-input/style.css'
import React, { useEffect, useState } from 'react';
import { bahrainFlag, indiaFlag, kuwaitFlag, omanFlag, qatarFlag, saudiFlag, uaeFlag } from "@/assets/icons/index.js";
import Image from 'next/image';
import './CustomPhoneInput.scss'
import PhoneArrowDown from '@/components/customicons/PhoneArrowDown';
import PropTypes from 'prop-types';
import { getCountries } from 'react-phone-number-input';
import { getCountryCallingCode } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '@/services/features/countrySlice';

export default function CustomPhoneInput({ label, placeholder, value, isRequired, onChange, name, getCountry, isInvalid, errMsg, ...rest }) {
    const dispatch = useDispatch();
    // `value` will be the parsed phone number in E.164 format.
    // Example: "+12133734253".

    const { allCountries } = useSelector((state) => state.countries)

    const countries = [
        {
            id: 478,
            country_name: 'United Arab Emirates',
            country_code: 'AE',
            country_dial_code: '+971'
        },
        {
            id: 364,
            country_name: 'Kuwait',
            country_code: 'KW',
            country_dial_code: '+965'
        },
        {
            id: 412,
            country_name: 'Oman',
            country_code: 'OM',
            country_dial_code: '+968'
        },
        {
            id: 425,
            country_name: 'Qatar',
            country_code: 'QA',
            country_dial_code: '+974'
        },
        {
            id: 440,
            country_name: 'Saudi Arabia',
            country_code: 'SA',
            country_dial_code: '+966'
        },
        {
            id: 267,
            country_name: 'Bahrain',
            country_code: 'BH',
            country_dial_code: '+973'
        },
        {
            id: 347,
            country_name: 'India',
            country_code: 'IN',
            country_dial_code: '+91'
        }
    ];

    const [selectedCountry, setSelectedCountry] = React.useState({
        id: 478,
        country_name: 'United Arab Emirates',
        country_code: 'AE',
        country_dial_code: '+971'
    });
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    const [showAllCountries, setShowAllCountries] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
        let countryId = selectedCountry.id;
        onChange(e.target.value, countryId)
    }

    const handleCountryChange = (country) => {
        onChange(phoneNumber, country.id)
    }

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
                                    `http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.country_code}.svg`
                                }
                                alt={selectedCountry.country_name}
                                width={25}
                                height={25}
                            />
                        </div>

                        <div className={isDropdownVisible ? "phonecountry-dropdown" : " display-none"}>

                            {
                                countries.map((country) => (
                                    <div className='phonecountry-dropdown-item'
                                        key={country.id}
                                        onClick={() => {
                                            setSelectedCountry(country);
                                            setIsDropdownVisible(false);
                                            handleCountryChange(country);
                                        }}
                                    >
                                        {country.country_name}
                                    </div>
                                ))
                            }

                            {
                                showAllCountries &&
                                allCountries?.result?.map((country) => (
                                    <div className='phonecountry-dropdown-item'
                                        key={country.id}
                                        onClick={() => {
                                            setSelectedCountry(country);
                                            setIsDropdownVisible(false);
                                            handleCountryChange(country);
                                        }}
                                    >
                                        {country.country_name}
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
                    <p>+ {getCountryCallingCode(selectedCountry.country_code)}</p>
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
    )
}

CustomPhoneInput.propTypes = {
    getCountry: PropTypes.func,

}


CustomPhoneInput.defaultProps = {
    getCountry: () => { }
}



// "use client";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import React, { useEffect, useState } from 'react';
// import { bahrainFlag, indiaFlag, kuwaitFlag, omanFlag, qatarFlag, saudiFlag, uaeFlag } from "@/assets/icons/index.js";
// import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react';
// import Image from 'next/image';
// import { ArrowDown } from '@/components/customicons';
// import './CustomPhoneInput.scss'
// import PhoneArrowDown from '@/components/customicons/PhoneArrowDown';
// import CustomInput from '../custominput/CustomInput';
// import PropTypes from 'prop-types';
// import { getCountries } from 'react-phone-number-input';
// import { getCountryCallingCode } from 'react-phone-number-input';
// import en from 'react-phone-number-input/locale/en'

// export default function CustomPhoneInput({ label, placeholder, value, isRequired, onChange, name, getCountry, isInvalid, errMsg, ...rest }) {
//     // `value` will be the parsed phone number in E.164 format.
//     // Example: "+12133734253".

//     const countries = [
//         {
//             id: 1,
//             name: 'United Arab Emirates',
//             code: 'AE',
//             flag: uaeFlag,
//             phoneCode: '+971'
//         },
//         {
//             id: 2,
//             name: 'Kuwait',
//             code: 'KW',
//             flag: kuwaitFlag,
//             phoneCode: '+965'
//         },
//         {
//             id: 3,
//             name: 'Oman',
//             code: 'OM',
//             flag: omanFlag,
//             phoneCode: '+968'
//         },
//         {
//             id: 4,
//             name: 'Qatar',
//             code: 'QA',
//             flag: qatarFlag,
//             phoneCode: '+974'
//         },
//         {
//             id: 5,
//             name: 'Saudi Arabia',
//             code: 'SA',
//             flag: saudiFlag,
//             phoneCode: '+966'
//         },
//         {
//             id: 6,
//             name: 'Bahrain',
//             code: 'BH',
//             flag: bahrainFlag,
//             phoneCode: '+973'
//         },
//         {
//             id: 7,
//             name: 'India',
//             code: 'IN',
//             flag: indiaFlag,
//             phoneCode: '+91'
//         }
//     ];

//     const [selectedCountry, setSelectedCountry] = React.useState('AE');
//     const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
//     const [showAllCountries, setShowAllCountries] = React.useState(false);

//     const handleInputChange = (e) => {
//         let countryCallingCode = '+' + getCountryCallingCode(selectedCountry)
//         onChange(e, countryCallingCode)
//     }

//     const [phone, setphone] = useState();
//     return (
//         <div className='phone-input-wrapper'>
//             <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
//                 {isRequired && <span>*</span>}</p>
//             <div className="input-container">

//                 <div>
//                     <div className="customphonecountry" onBlur={() => setIsDropdownVisible(false)} tabIndex={1}>
//                         <div className={isInvalid ? 'phonecountry invalid-input' : "phonecountry"}
//                             onClick={() => setIsDropdownVisible(!isDropdownVisible)}
//                         >
//                             <div className="icon">
//                                 <PhoneArrowDown />
//                             </div>
//                             <Image
//                                 src={
//                                     `http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`
//                                 }
//                                 alt={selectedCountry}
//                                 width={25}
//                                 height={25}
//                             />
//                         </div>

//                         <div className={isDropdownVisible ? "phonecountry-dropdown" : " display-none"}>

//                             {
//                                 countries.map((country) => (
//                                     <div className='phonecountry-dropdown-item'
//                                         key={country.code}
//                                         onClick={() => {
//                                             setSelectedCountry(country.code);
//                                             setIsDropdownVisible(false);
//                                         }}
//                                     >
//                                         {country.name}
//                                     </div>
//                                 ))
//                             }

//                             {
//                                 showAllCountries &&
//                                 getCountries().map((country) => (
//                                     <div className='phonecountry-dropdown-item'
//                                         key={country}
//                                         onClick={() => {
//                                             setSelectedCountry(country);
//                                             setIsDropdownVisible(false);
//                                         }}
//                                     >
//                                         {en[country]}
//                                     </div>
//                                 ))
//                             }
//                             <div className="showmore">
//                                 <span style={{ cursor: 'pointer', textAlign: 'end', }} onClick={() => setShowAllCountries(!showAllCountries)}>{showAllCountries ? 'Show Less...' : 'Show More...'}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="phone-input-relative">
//                     <p>+ {getCountryCallingCode(selectedCountry)}</p>
//                     <input
//                         value={value}
//                         type="text"
//                         maxLength={10}
//                         name={name}
//                         className={isInvalid ? 'phone-input invalid-input' : 'phone-input'}
//                         placeholder={placeholder ? placeholder : 'Phone Number'}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//             </div>
//             <p className="errmsg">{isInvalid ? errMsg : ''}</p>
//         </div>
//     )
// }

// CustomPhoneInput.propTypes = {
//     getCountry: PropTypes.func,

// }


// CustomPhoneInput.defaultProps = {
//     getCountry: () => { }
// }