'use client';
import React, { useState } from 'react'
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.scss';
import { ArrowDown } from '@/components/customicons';
import "react-datepicker/dist/react-datepicker.css"
import dayjs from 'dayjs';
// import DatePicker from "react-datepicker";
import DatePicker, { DateObject } from "react-multi-date-picker"

export const CustomCalendar = ({ label, isRequired, maxDate, isInvalid, errMsg, value, onChange, disabled }) => {
    // const [date, setDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    const handleInputClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleCalendarChange = (newDate) => {
        // setDate(newDate);
        onChange(newDate);
        setShowCalendar(false); // Hide the calendar after selecting a date
    };

    const CustomDateInput = React.forwardRef(({ value, onClick, onChange }, ref) => (
        // <input className="react_custom_date" value={value} onChange={onChange} onClick={onClick} ref={ref} />

        <input style={{ width: '100%' }} className={isInvalid ? 'react_custom_time invalid-custom-time' : 'react_custom_time'} type='text'
            placeholder='Select Date'
            value={value}
            onChange={onChange}
            onClick={onClick} ref={ref}
            disabled={disabled}
        />
    ));

    return (
        <div className='custom-calendar' onBlur={(e) => {
            if (e.currentTarget.contains(e.relatedTarget)) {
                return;
            }
            setShowCalendar(false);
        }}>
            <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
                {isRequired && <span>*</span>}
            </p>

            <div className='arrowdown'>
                <ArrowDown size={22} />
            </div>

            {/* <DatePicker
                selected={value}
                onChange={(date) => {
                    onChange(dayjs(date).format());
                }
                }
                minDate={dayjs(new Date()).toDate()}
                timeInputLabel="Time:"
                locale={'en-GB'}
                // dateFormat="dd/MM/yyyy h:mm aa"
                dateFormat="dd/MM/yyyy"
                showTimeSelect={false}
                customInput={<CustomDateInput />}
                disabled={disabled}
                maxDate={maxDate != null && new Date(maxDate)}
            /> */}

            <DatePicker
                value={value}
                disabled={disabled}
                onChange={(date) => {
                    onChange(date?.toDate());
                }}
                format='DD/MM/YYYY'
                inputClass="custom-calender-input"
                minDate={new DateObject()}
                // maxDate={maxDate != null && new DateObject(maxDate)}
                currentDate={new DateObject()}
            />


            {/* <input className={isInvalid ? 'react_custom_time invalid-custom-time' : 'react_custom_time'} type='text' placeholder='Select Date'
                value={value ? value?.toLocaleDateString('en-GB') : ''}
                onClick={handleInputClick}
                disabled={disabled}
                readOnly
            />
            {showCalendar &&
                <Calendar minDate={new Date()}
                    locale="en-GB"
                    onChange={handleCalendarChange}
                    maxDate={maxDate} value={value} />
            } */}
            <p className="errmsg">{isInvalid ? errMsg : ''}</p>
        </div>
    )
}
