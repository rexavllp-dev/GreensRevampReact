
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import { NUMBER_REGEX, SPECIAL_CHARS_REGEX, UPPERCASE_REGEX } from '@/utils/helpers/validationRules';
import { createUserByAdmin } from '@/services/features/userSlice';
import { isEmailValid } from '@/utils/helpers/IsEmailValid';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './BadgesTab.scss'
import { CustomCalendar } from '@/library/calendar/CustomCalendar';

const GeneralTab = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const roles = [
        { label: 'Customer', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Delivery', value: 3 },
    ]

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        confirm_password: '',
        status: true,
        notes: ''
    })

    const [errors, setErrors] = React.useState({
        first_name: {
            error: false,
            message: ''
        },
        last_name: {
            error: false,
            message: ''
        },
        mobile: {
            error: false,
            message: ''
        },
        email: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: ''
        },
        confirm_password: {
            error: false,
            message: ''
        }
    })

    const [loading, setLoading] = React.useState(false);

    const handleInputChange = ({ e, country }) => {

        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }




    const handleSubmit = () => {

    }

    return (
        <div className='badgestab'>

            <div className="form">

                <div className="stack">
                <CustomSelect label={'Choose Badge'} data={[]}
                        name={'badges'} onChange={(e) => { }} />
                </div>

                {/* <div className="stack">

                </div> */}
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>


        </div>
    )
}

export default GeneralTab