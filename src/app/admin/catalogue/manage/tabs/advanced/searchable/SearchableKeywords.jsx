import CustomButton from '@/library/buttons/CustomButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import React from 'react'
import "./SearchableKeywords.scss"
import { useDispatch } from 'react-redux'
import { updateProduct } from '@/services/features/productSlice'
import { toast } from 'react-toastify'

function SearchableKeywords({ id, data }) {

    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        search_keywords: '',
    })
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (data?.data) {
            setFormData((prev) => ({
                search_keywords: data?.data?.product?.search_keywords,
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
        let data = { search_keywords: formData?.search_keywords }

        dispatch(updateProduct({ data: data, id })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message)
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        })

    }

    return (
        <div className='searchablesection flex'>
            <div className="section">
                <CustomTextarea label={'Enter Keywords'}
                    placeholder={'Enter Keywords'}
                    name={'search_keywords'} value={formData.search_keywords}
                    onChange={(e) => { handleInputChange({ e }) }} />
                <div className="flex justify-end mt-3">
                    <CustomButton label='Save' onClick={handleSubmit} loading={loading} variant='primary' />
                </div>
            </div>
        </div>
    )
}

export default SearchableKeywords