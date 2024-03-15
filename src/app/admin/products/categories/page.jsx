"use client"
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline, IoFolderOpen, IoFolderOpenOutline, IoPencil, IoPencilOutline, IoPencilSharp, IoTime, IoTrashBin } from 'react-icons/io5'
import "./Categories.scss"
import CustomTabs from '@/components/customtabs/CustomTabs'
import GeneralTab from '../categories/tabs/GeneralTab'
import ImagesTab from '../categories/tabs/ImagesTab'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { getCategoryTree, createCategory, updateCategory, deleteCategory} from "@/services/features/categorySlice";
import { Button } from '@nextui-org/react';
import { toast } from 'react-toastify';

function Categories() {

  const router = useRouter();
  const dispatch = useDispatch();

  const { allcategories, isCategoryTreeLoaded, isCreateCategoryLoaded, isUpdateCategoryLoaded, isDeleteCategoryLoaded} = useSelector(state => state.categories)
  const [categoryTreeData, setCategoryTreeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [opType, setOpType]                     = useState('Add');
  const [tabs, setTabs]                         = useState([]);
  useEffect(() => {
      dispatch(getCategoryTree())
  }, [])

  useEffect(() => {
    dispatch(getCategoryTree())
  }, [isCreateCategoryLoaded, isUpdateCategoryLoaded, isDeleteCategoryLoaded])


  useEffect(() => {
  if(isCategoryTreeLoaded){
    setCategoryTreeData(allcategories.data);
  }
}, [allcategories])


const submitCategory = (data) => {
    
   if(data.op_type == 'Add'){

      dispatch(createCategory({ data: data })).then((res) => {

        if (res.payload?.success) {
            toast.success(res.payload.message);
        } else {
            toast.error(res.payload.message)
        }
      });

   } else if(data.op_type == 'Edit'){

      dispatch(updateCategory({ data: data, id: data.cat_id })).then((res) => {
          if (res.payload?.success) {
              toast.success(res.payload.message);
          } else {
              toast.error(res.payload.message)
          }
      });

   }
}

const deleteCat = (id) => {
  dispatch(deleteCategory({ id: id })).then((res) => {
    if (res.payload?.success) {
        toast.success(res.payload.message);
    } else {
        toast.error(res.payload.message)
    }
});

}

useEffect(() => {

  if(opType == 'Add'){
    setTabs([{
      id: 1,
      label: "General",
      component: <GeneralTab op_type={opType} selected_cat={selectedCategory} submit_data={(data) => submitCategory(data)} />
    }]);
  } else {

    setTabs([{
      id: 1,
      label: "General",
      component: <GeneralTab op_type={opType} selected_cat={selectedCategory} submit_data={(data) => submitCategory(data)} />
    },
    {
      id: 2,
      label: "Images",
      component: <ImagesTab data={selectedCategory} id={selectedCategory.id}/>
    }]);

  }

}, [selectedCategory, opType])



  const CategoryTreeNode = ({ category, level }) => {

    const [expanded, setExpanded] = React.useState(false);
    const marginLeft = level * 20;
    return (
      <div className='flex flex-col gap-3'>
        <div className={`item flex treeblock items-center gap-2 cursor-pointer ${(selectedCategory.id == category.id)? 'selectedCategory' : ''}`} style={{ marginLeft }}>
          <IoFolderOpenOutline size={30} />
          <span style={{flex:1}}>{category.name}</span>
          <IoPencilSharp size={15} onClick={() =>  { setSelectedCategory(category); setOpType('Edit'); }}  />
          <IoAddCircleOutline size={25} style={{cursor:'pointer'}}  onClick={() => { setOpType('Add'); setSelectedCategory(category)}}/>
          <IoTrashBin size={20} style={{cursor:'pointer'}}  onClick={() => deleteCat(category.id)}/>
        </div>        
          <div className='flex flex-col'>
            {category.children?.map((subItem) => (
              <CategoryTreeNode key={subItem.id} category={subItem}  level={level + 1} />
            ))}
          </div>

      </div>
    );
  };

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

        <div className='flex flex-col gap-3 mb-15'>
            <div className={`item flex items-center gap-2 cursor-pointer ${(selectedCategory == 0)? 'selectedCategory' : ''}`} onClick={() =>  {setSelectedCategory(0); setOpType('Add')}}>
              <IoFolderOpen size={30} />
              <span>Root</span>
            </div>
        </div>

          {
            categoryTreeData?.map((item, i) => {
              return (
                <CategoryTreeNode key={item.id} category={item} level={0}/>
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