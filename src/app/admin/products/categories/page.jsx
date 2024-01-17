"use client"
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'
import "./Categories.scss"
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import ImageUpload from '@/components/imageupload/ImageUpload'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

function Categories() {

  const router = useRouter()

  const [formData, setFormData] = React.useState({
    title: '',
    status: true,
  })

  const GeneralTab = () => {
    return (
      <div className='categorytab'>
        <div className="flex flex-col gap-2">
          <CustomInput name='title' type='text'
            maxLength={100}
            placeholder='Title' label={'Title'}
            isRequired={true}
            onChange={(e) => { handleInputChange({ e }) }}
            value={formData.title}
          />
          <CustomToggleButton label='Status' isRequired={true} value={formData.status}
            onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
          />
          <div className="flex justify-end">
            <CustomButton label='Save Changes' />
          </div>
        </div>
      </div>
    )
  }

  const ImagesTab = () => {
    return (
      <div className='categorytab'>
        <div className="stack mb-3">

          <CustomTypography content='Logo' color="BLACK" size="MEDIUM" weight="REGULAR" />
          <ImageUpload
            name={'event_img_path'}
            handleFileUpload={handleFileUpload}
            // images={event?.images}
            handleDeleteImage={handleDeleteImage}
            haveUploadSize={true}
            uploadSize={{
              "width": '1920',
              "height": '1080'
            }}
          />

        </div>

        <div className="stack">
          <CustomTypography content='Banner Image' color="BLACK" size="MEDIUM" weight="REGULAR" />
          <ImageUpload
            name={'event_img_path'}
            handleFileUpload={handleFileUpload}
            // images={event?.images}
            handleDeleteImage={handleDeleteImage}
            haveUploadSize={true}
            uploadSize={{
              "width": '1920',
              "height": '1080'
            }}
          />
        </div>
        <div className="flex justify-end mt-3">
          <CustomButton label='Save Changes' />
        </div>
      </div>
    )
  }


  const tabs = [
    {
      id: 1,
      label: "General",
      component: <GeneralTab />
    },
    {
      id: 2,
      label: "Images",
      component: <ImagesTab />
    }
  ]

  const categories = [
    {
      id: 1,
      name: 'Ingredients',
      children: [
        {
          id: 1,
          name: "Toppings & Fillings",
          children: [
            {
              id: 1,
              name: "Item"
            },
            {
              id: 2,
              name: "Item2"
            },
          ]
        },
        {
          id: 2,
          name: "Basic Ingredients"
        },
        {
          id: 3,
          name: "Food Colours"
        },
        {
          id: 4,
          name: "Flavours"
        }
      ]
    },
    {
      id: 2,
      name: 'Chocolates'
    },
    {
      id: 3,
      name: "Ho.Re.Ca"
    },
    {
      id: 4,
      name: 'Baking supplies'
    }
  ]

  const handleInputChange = ({ e }) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleFileUpload = async (event) => {
    let files = null;

  }

  const handleDeleteImage = (imgname) => {

  }

  const CategoryTree = ({ category }) => {
    const [expanded, setExpanded] = React.useState(false);

    const toggleCategory = () => {
      setExpanded(!expanded);
    };

    return (
      <div className='flex flex-col gap-3'>
        <div className="item flex items-center gap-2 cursor-pointer" key={category.id}>
          <IoFolderOpenOutline size={30} />
          <CustomTypography content={category.name} />
        </div>
        <div className='flex flex-col gap-3 mb-3'>
          {category.children?.map((subItem, i) => {
            return (
              <div className='item flex ml-12 items-center gap-2 cursor-pointer' key={subItem.id}>
                <IoFolderOpenOutline size={30} />
                <CustomTypography content={subItem.name} />
              </div>
            )
          })}
        </div>
      </div>
    )

  }


  return (
    <div className='categories_section_wrapper'>
      <div className="breadcrumb ">
        <BreadCrumbs />
      </div>
      <div className="title flex items-center gap-3  mt-3 mb-5">
        <div className="backbtn " onClick={() => router.back()}>
          <FaArrowLeft />
        </div>
        <CustomTypography content={"Categories"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
      </div>
      <div className='categories_section'>
        <div className="categorytree">

          {
            categories?.map((item, i) => {
              return (
                <CategoryTree key={item.id} category={item} />
              )
            })
          }
        </div>
        <div className="forms">
          <CustomTabs tabs={tabs} />
        </div>
      </div>
    </div>
  )
}

export default Categories