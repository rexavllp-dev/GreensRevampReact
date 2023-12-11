'use client';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.scss';
import { ArrowDown } from '@/components/customicons';

export const CustomCalendar = ({ label, isRequired, maxDate, isInvalid, errMsg, value, onChange }) => {
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
            <input className={isInvalid ? 'react_custom_time invalid-custom-time' : 'react_custom_time'} type='text' placeholder='Select Date'
                value={value ? value?.toLocaleDateString('en-GB') : ''}
                onClick={handleInputClick}
                readOnly
            />
            {showCalendar &&
                <Calendar minDate={new Date()} onChange={handleCalendarChange} maxDate={maxDate} value={value} />
            }
            <p className="errmsg">{isInvalid ? errMsg : ''}</p>
        </div>
    )
}
