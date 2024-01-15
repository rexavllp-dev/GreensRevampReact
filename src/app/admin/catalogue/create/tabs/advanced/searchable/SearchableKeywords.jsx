import CustomButton from '@/library/buttons/CustomButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import React from 'react'
import "./SearchableKeywords.scss"

function SearchableKeywords() {

    const [formData, setFormData] = React.useState({
        product_desc: '',
    })
    return (
        <div className='searchablesection flex'>
            <div className="section">
                <CustomTextarea label={'Description'}
                    placeholder={'Description'}
                    name={'product_desc'} value={formData.product_desc}
                    onChange={(e) => { handleInputChange({ e }) }} />
                <div className="flex justify-end mt-3">
                    <CustomButton label='Save' variant='primary' />
                </div>
            </div>
        </div>
    )
}

export default SearchableKeywords