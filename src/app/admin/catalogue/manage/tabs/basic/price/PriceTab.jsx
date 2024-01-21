
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
import './PriceTab.scss'
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import { createPrice, updatePrice } from '@/services/features/productSlice';

const PriceTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const priceTypes = [
        { label: 'Percentage', value: "percentage" },
        { label: 'Fixed', value: 'fixed' },
    ]

    const [formData, setFormData] = React.useState({
        product_price: '',
        special_price: '',
        special_price_type: '',
        special_price_start: '',
        special_price_end: '',
        product_id: id
    })

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (data?.data?.product?.product_price) {
            setFormData((prev) => ({
                product_price: data?.data?.product?.product_price,
                special_price: data?.data?.product?.special_price,
                special_price_type: data?.data?.product?.special_price_type,
                special_price_start: new Date(data?.data?.product?.special_price_start),
                special_price_end: new Date(data?.data?.product?.special_price_end),
                product_id: id
            }))

        }
    }, [data])

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = () => {
        setLoading(true);
        if (data?.data?.product?.product_price) {
            dispatch(updatePrice({ data: formData, id: id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            })
        } else {
            dispatch(createPrice({ data: formData })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            })
        }
    }

    return (
        <div className='pricetab'>

            <div className="form">
                <div className="stack">

                    <CustomInput name='product_price' type='text'
                        maxLength={100}
                        placeholder='Price' label={'Price'}
                        // isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.product_price}
                    // isInvalid={errors.product_price.error}
                    // errMsg={errors.product_price.message}
                    />
                    <CustomInput
                        name='special_price'
                        type='text'
                        maxLength={100}
                        placeholder='Special Price'
                        label={'Special Price'}
                        // isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.special_price}
                    // isInvalid={errors.special_price.error}
                    // errMsg={errors.special_price.message}
                    />

                    <CustomSelect label={'Special Price Type'} data={priceTypes} name={'special_price_type'}
                        onChange={(e) => { handleInputChange({ e }) }} />

                </div>

                <div className="stack">
                    <CustomCalendar
                        name={'special_price_start'}
                        label='Special Price Start'
                        value={formData.special_price_start}
                        // isInvalid={errors.special_price_start.error}
                        // errMsg={errors.special_price_start.message}
                        onChange={(date) => {
                            setFormData((prevData) => ({ ...prevData, special_price_start: date }));
                            // setErrors((prevErrors) => ({ ...prevErrors, special_price_start: { error: false, message: '' } }));
                        }}
                        isRequired={true}
                    />
                    <CustomCalendar
                        name={'special_price_end'}
                        label='Special Price End'
                        value={formData.special_price_end}
                        // isInvalid={errors.special_price_end.error}
                        // errMsg={errors.special_price_end.message}
                        onChange={(date) => {
                            setFormData((prevData) => ({ ...prevData, special_price_end: date }));
                            // setErrors((prevErrors) => ({ ...prevErrors, special_price_end: { error: false, message: '' } }));
                        }}
                        isRequired={true}
                    />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>

        </div>
    )
}

export default PriceTab