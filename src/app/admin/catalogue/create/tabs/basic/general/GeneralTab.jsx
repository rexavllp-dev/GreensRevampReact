
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomButton from '@/library/buttons/CustomButton'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './GeneralTab.scss'
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import { Card, Tab, Tabs } from '@nextui-org/react';
import CustomMultiSelect from '@/library/select/custom-multi-select/CustomMultiSelect';

const GeneralTab = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [selected, setSelected] = React.useState("English");

    const roles = [
        { label: 'Customer', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Delivery', value: 3 }
    ]

    const categories = [
        { label: 'category1', value: 1 },
        { label: 'category2', value: 2 },
    ]

    const tags = [
        { label: 'tag1', value: 1 },
        { label: 'tag2', value: 2 },
    ]

    const storageTypes = [
        { label: 'Frozen', value: 'Frozen' },
        { label: 'Dry', value: 'Dry' },
        { label: 'Chilled', value: 'Chilled' }
    ]

    const returnTypes = [
        { label: 'Returnable', value: 'Returnable' },
        { label: 'Non Returnable', value: 'Non Returnable' }
    ]

    const saleUnits = [
        { label: 'Packet', value: 'Packet' },
        { label: 'Piece', value: 'Piece' }
    ]

    const taxClasses = [
        {
            label: 'vat5%',
            value: 'vat5%'
        }
    ]

    const [formData, setFormData] = React.useState({
        prd_name: '',
        prd_description: '',
        prd_tax_class: '',
        prd_storage_type: '',
        prd_tags: '',
        prd_expiry_date: '',
        prd_brand_id: '',
        prd_sales_unit: '',
        categories: [],

        status: true,
    })


    useEffect(() => {
        console.table(formData)
    }, [formData])

    const [loading, setLoading] = React.useState(false);

    const handleInputChange = ({ e }) => {

        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }




    const handleSubmit = () => {

    }

    const [languages, setLanguages] = React.useState([
        {
            name: 'English',
        },
        {
            name: 'Arabic',
        }
    ])

    return (
        <div className='generaltab'>

            <div className="form">

                <div className="stack">
                    <Card className='p-3'>
                        <Tabs aria-label="Options"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            {
                                languages.map((l, i) => (
                                    <Tab key={l.name} title={l.name} className='flex flex-col gap-3'>
                                        <CustomInput name='prd_name' type='text'
                                            maxLength={100}
                                            placeholder='Product Name' label={'Product Name'}
                                            onChange={(e) => { handleInputChange({ e }) }}
                                            value={formData.prd_name}
                                        />
                                        <CustomTextarea label={'Description'}
                                            placeholder={'Description'}
                                            name={'prd_description'} value={formData.prd_description}
                                            onChange={(e) => { handleInputChange({ e }) }} />
                                    </Tab>
                                ))
                            }

                        </Tabs>
                    </Card>

                    <CustomSelect label={'Tax Class'} data={taxClasses} name={'prd_tax_class'} onChange={(e) => { handleInputChange({ e }) }} />
                    <CustomSelect label={'Storage Type'} data={storageTypes} name={'prd_storage_type'} onChange={(e) => { handleInputChange({ e }) }} />
                    <CustomMultiSelect label={'Tags'} data={tags} name={'prd_tags'} onChange={(e) => { handleInputChange({ e }) }} />
                    <CustomCalendar
                        name={'expiry_date'}
                        label='Expiry Date'
                        value={formData.expiry_date}
                        // isInvalid={errors.trade_license_expiry.error}
                        // errMsg={errors.trade_license_expiry.message}
                        onChange={(date) => {
                            setFormData((prevData) => ({ ...prevData, expiry_date: date }));
                            // setErrors((prevErrors) => ({ ...prevErrors, trade_license_expiry: { error: false, message: '' } }));
                        }}
                    />
                </div>

                <div className="stack">
                    <CustomSelect label={'Product Return Type'} data={returnTypes}
                        name={'prd_brand_id'} onChange={(e) => { handleInputChange({ e }) }} />

                    <CustomMultiSelect label={'Categories'} data={categories} name={'prd_categories'} onChange={(e) => { handleInputChange({ e }) }} />

                    <CustomSelect label={'Product Return Type'} data={returnTypes}
                        name={'prd_return_type'} onChange={(e) => { handleInputChange({ e }) }} />
                    <CustomSelect label={'Sales Unit'} data={saleUnits}
                        name={'prd_sales_unit'} onChange={(e) => { handleInputChange({ e }) }} />

                    <CustomToggleButton label='Dashboard Status' value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />

                    <CustomToggleButton label='Product Status' value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>


        </div>
    )
}

export default GeneralTab