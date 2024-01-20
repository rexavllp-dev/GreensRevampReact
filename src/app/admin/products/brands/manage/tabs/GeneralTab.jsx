import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import { createBrand } from '@/services/features/brandSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const GeneralTab = ({id, data}) => {


    const [formData, setFormData] = React.useState({
        brd_name: '',
        brand_status: true,
    })
    const [loading, setLoading] = React.useState(false)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    
    useEffect(() => {
        if (id) {
            console.log(data)
            setFormData((prev) => ({
                brd_name: data?.result?.brd_name,
                brand_status: data?.result?.brand_status
            }))
        }
    }, [data])

    const handleSubmit = () => {
        const data = {
            brd_name: formData.brd_name,
            brand_status: formData.brand_status
        }
        dispatch(createBrand({ data: data })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
                let id = res.payload?.data[0]?.id;
                router.push('/admin/products/brands/manage/?id=' + id, { scroll: true });
            } else {
                toast.error(res.payload.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <div className='brandstab'>
            <div className="flex flex-col gap-2">
                <CustomInput name='brd_name' type='text'
                    maxLength={100}
                    placeholder='Title' label={'Title'}
                    isRequired={true}
                    onChange={(e) => { handleInputChange({ e }) }}
                    value={formData.brd_name}
                />
                <CustomToggleButton label='Status' isRequired={true} value={formData.brand_status}
                    onChange={(value) => { setFormData((prev) => ({ ...prev, brand_status: value })) }}
                />
                <div className="flex justify-end">
                    <CustomButton label='Save Changes' onClick={() => handleSubmit()} />
                </div>
            </div>
        </div>
    )
}

export default GeneralTab