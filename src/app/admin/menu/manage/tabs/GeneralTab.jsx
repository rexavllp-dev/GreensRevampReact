import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import { createMenu, updateMenu } from '@/services/features/menuSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const GeneralTab = ({ id, data }) => {


    const [formData, setFormData] = React.useState({
        menu_name: '',
        menu_status: true,
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
        if (data?.result?.menu_id) {
            setFormData((prev) => ({
                menu_name: data?.result?.menu_name,
                menu_url: data?.result?.menu_url,
                menu_status: data?.result?.menu_status
            }))
        }
    }, [data])

    const handleSubmit = () => {
        const data = {
            menu_name: formData.menu_name,
            menu_url: formData.menu_url,
            menu_status: formData.menu_status
        }
        if (id) {
            dispatch(updateMenu({ data: data, id: id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                    let id = res.payload?.data[0]?.id;
                    router.push('/admin/menu/manage/?id=' + id, { scroll: true });
                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            dispatch(createMenu({ data: data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                    let id = res.payload?.data[0]?.id;
                    router.push('/admin/menu/manage/?id=' + id, { scroll: true });
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
        <div className='menustab'>
            <div className="flex flex-col gap-2 max-w-[500px]">
                <CustomInput name='menu_name' type='text'
                    maxLength={100}
                    placeholder='Title' label={'Title'}
                    isRequired={true}
                    onChange={(e) => { handleInputChange({ e }) }}
                    value={formData.menu_name}
                />
                 <CustomInput name='menu_url' type='text'
                    maxLength={100}
                    placeholder='URL' label={'Link'}
                    isRequired={true}
                    onChange={(e) => { handleInputChange({ e }) }}
                    value={formData.menu_url}
                />
                <CustomToggleButton label='Status' isRequired={true} value={formData.menu_status}
                    onChange={(value) => { setFormData((prev) => ({ ...prev, menu_status: value })) }}
                />
                <div className="flex justify-end">
                    <CustomButton label='Save Changes' onClick={() => handleSubmit()} />
                </div>
            </div>
        </div>
    )
}

export default GeneralTab