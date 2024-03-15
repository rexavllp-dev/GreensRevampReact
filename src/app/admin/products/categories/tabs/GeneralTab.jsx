
import React, { useEffect, useState } from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import { MdLabel } from 'react-icons/md';
function GeneralTab({ op_type, selected_cat, submit_data }) {


    const [formData, setFormData] = React.useState({
        cat_id:0,
        cat_parent_id: 0,
        op_type:op_type,
        cat_name: '',
        cat_description:'',
        category_status: true,
    })

    useEffect(() => {
        var parent = 0;
        
        if(selected_cat != 0){
            parent = selected_cat.id;
        }

        if(op_type == 'Edit'){

            setFormData((prev) => ({ ...prev, cat_id: parent }))
            setFormData((prev) => ({ ...prev, op_type: op_type }))
            setFormData((prev) => ({ ...prev, cat_name: selected_cat.name }))
            setFormData((prev) => ({ ...prev, cat_description: selected_cat.description }))
            setFormData((prev) => ({ ...prev, category_status: selected_cat.category_status }))            

        } else {

            setFormData((prev) => ({ ...prev, cat_parent_id: parent }))
            setFormData((prev) => ({ ...prev, op_type: op_type }))
            setFormData((prev) => ({ ...prev, cat_name: '' }))
            setFormData((prev) => ({ ...prev, cat_description: '' }))
        }

    }, [selected_cat, op_type]);

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
          ...prev, [e.target.name]: e.target.value
        }))
    }
    

    return (
        <div className='categorytab'>
          <div className="flex flex-col gap-2">

            <label><b>{op_type} Category</b></label>
            <CustomInput name='cat_name' type='text'
              maxLength={100}
              placeholder='Title' label={'Title'}
              isRequired={true}
              onChange={(e) => { handleInputChange({ e }) }}
              value={formData.cat_name}
            />
  
            <CustomInput name='cat_description' type='text'
              maxLength={100}
              placeholder='Description' label={'Description'}
              isRequired={true}
              onChange={(e) => { handleInputChange({ e }) }}
              value={formData.cat_description}
            />
            <CustomToggleButton label='Status' isRequired={true} value={formData.category_status}
              onChange={(value) => { setFormData((prev) => ({ ...prev, category_status: value })) }}
            />
            <div className="flex justify-end">
              <CustomButton label='Save Changes' onClick={() => submit_data(formData)} />
            </div>
          </div>
        </div>
      )
}

export default GeneralTab