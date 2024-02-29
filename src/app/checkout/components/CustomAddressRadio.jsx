"use client";
import React from "react";
import { RadioGroup, Radio, useRadio, VisuallyHidden, cn, Card, CardBody } from "@nextui-org/react";
import { MdEdit } from "react-icons/md";
import CustomTypography from "@/library/typography/CustomTypography";
import './CustomAddressRadio.scss';
import CustomCheckbox from "@/library/checkbox/CustomCheckbox";
import GoogleMap from '@/components/maps/GoogleMap';
import CustomTextarea from "@/library/textarea/CustomTextarea";
import CustomInput from "@/library/input/custominput/CustomInput";
import CustomPhoneInput from "@/library/input/phoneinput/CustomPhoneInput";
import { updateUserAddress } from "@/services/features/userSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const CustomRadio = (props) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "w-100 cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-black",
      )}
    >

      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">{description}</span>
        )}
      </div>
    </Component>
  );
};

export default function CustomAddressRadio({ data, value, onChange }) {

  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    address_title: "",
    full_name: "",
    address_email: "",
    mobile_country_code: "",
    mobile_number: "",
    flat_villa: "",
    zip_code: "",
    delivery_remark: "",
    is_default: false,
    // is_new_address: false,
    address_line_1: "",
    address_line_2: "",
    // country_code: "",
    // place: "",
    latitude: "",
    longitude: ""
  })

  const [editItem, setEditItem] = React.useState(null);
  const [editItemData, setEditItemData] = React.useState({});

  React.useEffect(() => {
    if (editItem) {
      setFormData((prev) => ({
        address_title: editItemData?.address_title,
        full_name: editItemData?.full_name,
        address_email: editItemData?.address_email,
        mobile_country_code: editItemData?.mobile_country_code,
        mobile_number: editItemData?.mobile_number,
        flat_villa: editItemData?.flat_villa,
        zip_code: editItemData?.zip_code,
        delivery_remark: editItemData?.delivery_remark,
        is_default: editItemData?.is_default || false,
        // is_new_address: false,
        address_line_1: editItemData?.address_line_1,
        address_line_2: editItemData?.address_line_2,
        // country_code: editItemData?.country_code,
        // place: editItemData?.place,
        latitude: editItemData?.latitude,
        longitude: editItemData?.longitude
      }))
    }
  }, [editItem])


  const handlePhoneChange = (name, value, countryCode) => {
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex
    if (value === '' || re.test(value)) {
      setFormData((prev) => ({
        ...prev, [name]: value, customer_phone_country_code: countryCode
      }))
    }
  }

  const handleInputChange = ({ e, country }) => {

    if (e.target.name === 'fullname') {
      const re = /^[A-Za-z\s'.-]+$/;
      // if value is not blank, then test the regex
      if (e.target?.value === '' || re.test(e.target?.value)) {
        setFormData((prev) => ({
          ...prev, [e.target.name]: e.target.value
        }))
      }
      // }

    } else {
      setFormData((prev) => ({
        ...prev, [e.target.name]: e.target.value
      }))
    }
  }


  const handleUpdateAddress = () => {
      dispatch(updateUserAddress({ data: formData, id: editItem })).then((res) => {
        if (res.payload?.success) {
          setEditItem(null);
          setEditItemData({});
          toast.success('Address updated successfully');
        } else {
          toast.error(res.payload?.message);
        }
      }).catch((err) => {
        console.log(err);
      })
  }


  return (
    <div className="custom_address_card_wrapper">
      {
        data?.map((item, i) => (
          <div className="custom_address_card" key={i}>
            <label>
              <input type="radio"
                checked={value == item?.id}
                value={item?.id}
                name="product"
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                className="card-input-element" />

              <div className="panel panel-default card-input">
                <CustomTypography content={item?.address_title} color="BLACK" size="REGULAR" weight="MEDIUM" />
                <CustomTypography content={item.address_line_1 + '...'} color="BLACK" size="REGULAR" weight="MEDIUM" />

                {
                  editItem === item?.id ?
                    <div className="address_form">
                      <CustomInput name='address_title' type='text'
                        maxLength={100}
                        placeholder='Address Title' label={'Address Title'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.address_title}
                      />

                      <CustomInput name='full_name' type='text'
                        maxLength={100}
                        placeholder='Full Name' label={'Full Name'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.full_name}
                      />
                      <CustomInput name='address_email' type='email'
                        maxLength={100}
                        placeholder='Email Address' label={'Email Address'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.address_email}
                      />
                      <CustomPhoneInput
                        isRequired={true}
                        name={'mobile'}
                        value={formData.mobile_number}
                        country={formData.mobile_country_code}
                        placeholder='Mobile Number'
                        label='Mobile Number'
                        onChange={(value, country) => {
                          handlePhoneChange('mobile_number', value, country)
                        }}
                      />

                      <GoogleMap formData={formData} setFormData={setFormData}
                        handleInputChange={handleInputChange} />
                      <CustomInput name='address_line_2' type='text'
                        maxLength={100}
                        placeholder='Address Line 2' label={'Address Line 2'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.address_line_2}
                      />
                      <CustomInput name='flat_villa' type='text'
                        maxLength={100}
                        placeholder='Flat/ Villa Number' label={'Flat/ Villa Number'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.flat_villa}
                      />
                      <CustomInput name='zip_code' type='text'
                        maxLength={100}
                        placeholder='Zip Code' label={'Zip Code'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.zip_code}
                      />
                      <CustomTextarea label={'Delivery Remarks'}
                        placeholder={'Delivery Remarks'}
                        name={'delivery_remark'} value={formData.delivery_remark}
                        onChange={(e) => { handleInputChange({ e }) }}
                      />

                      <CustomCheckbox
                        label={<p>Default Delivery Address</p>}
                        name='checkbox'
                        value={formData.is_default} onChange={(value) => { setFormData({ ...formData, is_default: value }) }}
                      />

                      <div className="flex gap-3 items-center">
                        <button className='savebtn' onClick={() => { handleUpdateAddress() }}>
                          Save
                        </button>
                        <button className='cancelbtn' onClick={() => { setEditItem(null); setEditItemData(null); }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                    : null
                }
              </div>
            </label>

            <p className="card-edit-icon" onClick={() => {
              setEditItem(item?.id)
              setEditItemData(item)
            }}>
              EDIT
            </p>



          </div>
        )
        )}
      {/* <div className="custom_address_card">
        <label>
          <input type="radio" name="product" className="card-input-element" />

          <div className="panel panel-default card-input">
            <div className="panel-heading">Product A</div>
            <div className="panel-body">
              Product specific content
            </div>
          </div>
        </label>

      </div> */}
    </div>

    // <RadioGroup label="" orientation="horizontal"
    //   value={value} onValueChange={onChange}
    // >
    //   {
    //     data?.map((item) => (
    //       <div key={item.id} style={{ position: "relative" }}>
    //         <div style={{ position: 'absolute', right: '5px', top: '5px', cursor: 'pointer', borderRadius: '50%', padding: '2px' }}>
    //           <MdEdit size={20} color='#555' />
    //         </div>
    //         <CustomRadio style={{
    //           width: '200px'
    //         }} description={item.address_line_1 + '...'} value={item.id}>
    //           {item.address_title}
    //         </CustomRadio>
    //       </div>
    //     ))
    //   }
    //   {/* <CustomRadio description="" value="free">
    //     Home
    //   </CustomRadio>
    //   <CustomRadio description="Unlimited items. $10 per month." value="pro">
    //     Work
    //   </CustomRadio> */}
    // </RadioGroup>
  );
}
