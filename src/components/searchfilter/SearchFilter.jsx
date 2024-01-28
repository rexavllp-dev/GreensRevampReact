import React, { useEffect } from 'react'
import './SearchFilter.scss'
import CustomSlider from '../customslider/CustomSlider'
import CustomCheckbox from '@/library/checkbox/CustomCheckbox'
import { Accordion, AccordionItem } from '@nextui-org/react'
import CustomTypography from '@/library/typography/CustomTypography'
import { GoArrowLeft } from "react-icons/go";
import CustomRadioBox from '@/library/radiobox/CustomRadioBox'

const SearchFilter = ({ onClose, filters, setFilters, sortBy, setSortBy }) => {

  const [formData, setFormData] = React.useState({
    chocolate: false,
    dgf: false,
    dynamic: false,
  })

  const [sort, setSort] = React.useState('')
  const [priceRange, setPriceRange] = React.useState([10, 300]);

  const [filterTypes, setFilterTypes] = React.useState([
    // {
    //   id: 0,
    //   title: 'Sort By',
    //   filter: [{
    //     id: 1,
    //     title: 'Price low to high',
    //     checked: false
    //   },
    //   {
    //     id: 2,
    //     title: 'Price high to low',
    //     checked: false
    //   },
    //   {
    //     id: 3,
    //     title: 'Newest',
    //     checked: false
    //   },
    //   {
    //     id: 4,
    //     title: 'Oldest',
    //     checked: false
    //   },
    //   {
    //     id: 5,
    //     title: 'Featured',
    //     checked: false
    //   }
    //   ]
    // },
    {
      id: 1,
      title: 'Brand',
      filter: [{
        id: 1,
        title: 'Chocolate',
        checked: false
      },
      {
        id: 2,
        title: 'DGF',
        checked: false
      },
      {
        id: 3,
        title: 'Dynamic',
        checked: false
      }]
    },
    {
      id: 2,
      title: 'Availability',
      filter: [{
        id: 1,
        title: 'In Stock',
        checked: false
      },
      {
        id: 2,
        title: 'Out of Stock',
        checked: false
      }
      ]
    },
    {
      id: 3,
      title: 'Product Category',
      filter: [
        {
          id: 1,
          title: 'Food Colours',
          checked: false
        },
        {
          id: 2,
          title: 'Ingredients',
          checked: false
        }
      ]
    },
    {
      id: 4,
      title: 'Rating',
      filter: [
        { id: 5, title: '5★ & above', checked: false },
        { id: 4, title: '4★ & above', checked: false },
        { id: 3, title: '3★ & above', checked: false },
        { id: 2, title: '2★ & above', checked: false },
        { id: 1, title: '1★ & above', checked: false }
      ]
    },
    // {
    //   id: 5,
    //   title: 'Season',
    //   filter: [
    //     { id: 1, title: 'Winter', checked: false },
    //     { id: 2, title: 'Summer', checked: false },
    //   ]
    // },
    {
      id: 6,
      title: 'Price'
    }
  ])

  useEffect(() => {
    console.log(sort)
  }, [sort])

  const handleResetFilter = () => {
    setFilters([])
    setSortBy('')
  }

  const handleApplyFilter = () => {

    setFilters([
      {

      }
    ])

    setSortBy(sort)

  }

  return (
    <div className='searchfilter-wrapper'>
      <div className="title" onClick={() => onClose()}>
        <GoArrowLeft size={22} />
        <CustomTypography content="Filters" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-SMALL" />
      </div>

      <Accordion
        itemClasses={{ title: 'accordion-title' }}
        isCompact
        selectionMode='multiple'
        defaultExpandedKeys={['0', '1']}>
        <AccordionItem key={0} aria-label={'Sort By'} title={'Sort By'}>
          <CustomRadioBox
            value={sort}
            onChange={(value) => setSort(value)}
            items={
              [{
                id: 1,
                title: 'Price low to high',
                value: 'price_asc'
              },
              {
                id: 2,
                title: 'Price high to low',
                value: 'price_desc'
              },
              {
                id: 3,
                title: 'Newest',
                value: 'newest'
              },
              {
                id: 4,
                title: 'Oldest',
                value: 'oldest'
              },
              {
                id: 5,
                title: 'Featured',
                value: 'featured'
              }
              ]
            } />
        </AccordionItem>
        {
          filterTypes.map((filterType) => (
            <AccordionItem key={filterType.id} aria-label={filterType.title} title={filterType.title}>
              {filterType.filter?.map((filter) => (
                <CustomCheckbox
                  isRequired={false}
                  label={<p>{filter.title}</p>}
                  rounded={true}
                  name='checkbox'
                  value={filter.checked}
                  onChange={(value) => {
                    setFilterTypes((prev) => prev.map((type) => type.id === filterType.id ?
                      {
                        ...type, filter: type.filter.map((f) => f.id === filter.id ?
                          { ...f, checked: value } : f)
                      } : type))
                  }}
                />
              ))}
            </AccordionItem>
          ))
        }
      </Accordion>
      <div className="slider">
        <CustomSlider value={priceRange} onChange={setPriceRange} />
      </div>

      <div className="footer">
        <button className='teritarybtn' onClick={() => {
          handleResetFilter()
        }}>
          Reset
        </button >
        <button className='secondarybtn' onClick={() => {
          handleApplyFilter()
          onClose()
        }
        }>
          Apply
        </button >
      </div>
    </div>
  )
}

export default SearchFilter