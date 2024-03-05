
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomButton from '@/library/buttons/CustomButton'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import './GeneralTab.scss'
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import { Card, Tab, Tabs, useDisclosure } from '@nextui-org/react';
import CustomMultiSelect from '@/library/select/custom-multi-select/CustomMultiSelect';
import { createProduct, getSingleProduct, updateProduct } from '@/services/features/productSlice';
import { getAllBrands } from '@/services/features/brandSlice';
import { FaRegEdit } from 'react-icons/fa';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal';
import CustomCheckbox from '@/library/checkbox/CustomCheckbox';

const GeneralTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [languages, setLanguages] = React.useState([
        {
            name: 'English',
        },
        {
            name: 'Arabic',
        }
    ])

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [selected, setSelected] = React.useState("English");
    const [loading, setLoading] = React.useState(false);
    const [isExit, setIsExit] = React.useState(false);
    const { allBrands } = useSelector(state => state.brands);

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
        prd_return_type: '',
        categories: [],
        // prd_status: false,
        prd_dashboard_status: false,
        show_expiry_on_dashboard: false,
        dimensions_and_more_info: '',
        use_and_care: '',
        shipping_and_returns: ''
    })


    useEffect(() => {
        if (data?.data) {
            setFormData((prev) => ({
                prd_name: data?.data?.product?.prd_name,
                prd_description: data?.data?.product?.prd_description,
                prd_tax_class: data?.data?.product?.prd_tax_class,
                prd_storage_type: data?.data?.product?.prd_storage_type,
                prd_tags: data?.data?.product?.prd_tags,
                prd_expiry_date: new Date(data?.data?.product?.prd_expiry_date),
                prd_brand_id: JSON.stringify(data?.data?.product?.prd_brand_id),
                prd_sales_unit: data?.data?.product?.prd_sales_unit,
                prd_return_type: data?.data?.product?.prd_return_type,
                categories: [],
                // prd_status: data?.data?.product?.prd_status,
                prd_dashboard_status: data?.data?.product?.prd_dashboard_status,
                show_expiry_on_dashboard: data?.data?.product?.show_expiry_on_dashboard,
                dimensions_and_more_info: data?.data?.product?.dimensions_and_more_info,
                use_and_care: data?.data?.product?.use_and_care,
                shipping_and_returns: data?.data?.product?.shipping_and_returns
            }))
        }
    }, [data, allBrands])

    useEffect(() => {
        dispatch(getAllBrands())
    }, [])

    useEffect(() => {
        if (id) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [id])




    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }




    const handleSubmit = () => {
        setConfirmationOpen(false);
        onClose(); // Close the main modal
        setLoading(true);
        let data = { ...formData, prd_expiry_date: new Date(formData.prd_expiry_date) }
        if (id) {
            dispatch(updateProduct({ data: data, id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                    if (isExit) {
                        router.push('/admin/catalogue')
                    }
                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            dispatch(createProduct({ data: data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                    let id = res.payload?.data[0]?.id;
                    router.push('/admin/catalogue/manage/?id=' + id, { scroll: true });
                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div className='generaltab'>
            {
                id ?
                    <div className="editbtn ">
                        <div className="btn" onClick={() => { setIsDisabled(!isDisabled) }}>
                            <FaRegEdit size={20} />
                        </div>
                    </div>
                    : <></>


            }

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
                                            disabled={isDisabled}
                                        />
                                        <CustomTextarea label={'Description'}
                                            placeholder={'Description'}
                                            name={'prd_description'} value={formData.prd_description}
                                            onChange={(e) => { handleInputChange({ e }) }}
                                            disabled={isDisabled}
                                        />
                                    </Tab>
                                ))
                            }

                        </Tabs>
                    </Card>

                    <CustomSelect label={'Tax Class'} value={formData.prd_tax_class}
                        data={taxClasses} name={'prd_tax_class'} onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />
                    <CustomSelect label={'Storage Type'} value={formData.prd_storage_type}
                        data={storageTypes} name={'prd_storage_type'} onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />
                    <CustomTextarea label={'Dimensions & More Info'}
                        placeholder={'Dimensions & More Info'}
                        name={'dimensions_and_more_info'} value={formData.dimensions_and_more_info}
                        onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />
                    <CustomTextarea label={'Shipping & Returns'}
                        placeholder={'Shipping & Returns'}
                        name={'shipping_and_returns'} value={formData.shipping_and_returns}
                        onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />

                </div>

                <div className="stack">
                    <CustomMultiSelect label={'Tags'} value={formData.prd_tags} data={tags}
                        name={'prd_tags'} onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />
                    <CustomCalendar
                        name={'expiry_date'}
                        label='Expiry Date'
                        value={formData.prd_expiry_date}
                        // isInvalid={errors.trade_license_expiry.error}
                        // errMsg={errors.trade_license_expiry.message}
                        onChange={(date) => {
                            setFormData((prevData) => ({ ...prevData, prd_expiry_date: date }));
                            // setErrors((prevErrors) => ({ ...prevErrors, trade_license_expiry: { error: false, message: '' } }));
                        }}
                        disabled={isDisabled}
                    />
                    <CustomCheckbox
                        isRequired={false}
                        label={<p>Show expiry on dashboard</p>}
                        name='checkbox'
                        value={formData.show_expiry_on_dashboard}
                        onChange={(value) => { setFormData({ ...formData, show_expiry_on_dashboard: value }) }}
                    />
                    <CustomSelect label={'Product Return Type'} value={formData.prd_return_type} data={returnTypes}
                        name={'prd_return_type'} onChange={(e) => { handleInputChange({ e }) }} disabled={isDisabled} />

                    <CustomMultiSelect label={'Categories'} value={formData.categories} data={categories}
                        name={'prd_categories'} onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />

                    <CustomSelect label={'Brand'} value={formData.prd_brand_id} data={allBrands?.data}
                        optionValue={'id'} optionLabel={'brd_name'}
                        name={'prd_brand_id'} onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />

                    <CustomSelect label={'Sales Unit'} value={formData.prd_sales_unit} data={saleUnits}
                        name={'prd_sales_unit'} onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />


                    <CustomTextarea label={'Use & Care'}
                        placeholder={'Use & Care'}
                        name={'use_and_care'} value={formData.use_and_care}
                        onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />


                    {/* <CustomToggleButton label='Dashboard Status' value={formData.prd_dashboard_status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, prd_dashboard_status: value })) }}
                    /> */}

                    {/* <CustomToggleButton label='Product Status' value={formData.prd_status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, prd_status: value })) }}
                    /> */}
                </div>
            </div>

            <div className="savebtn gap-3">
                <CustomButton variant="transparent" label="Save and Exit" loading={loading} onClick={() => {
                    setIsExit(true);
                    setConfirmationOpen(true)
                }} />
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={() => {
                    setIsExit(false);
                    setConfirmationOpen(true)
                }}
                />
            </div>

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={handleSubmit}
                title="Confirmation"
                message="Are you sure you want to save changes?"
            />
        </div>
    )
}

export default GeneralTab