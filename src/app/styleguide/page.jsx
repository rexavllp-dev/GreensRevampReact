"use client";
import React from 'react'
import { categoryImg1, homewallImg1, homewallImg2 } from '@/assets/images'
import CategoryCard from '@/components/cards/categorycard/CategoryCard'
import HomeWallCard from '@/components/cards/imagecard/ImageCard'
import CustomButton from '@/library/buttons/CustomButton'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomCheckbox from '@/library/checkbox/CustomCheckbox'
import CustomIconButton from '@/library/iconbutton/CustomIconButton';

const StyleGuide = () => {
  return (
    <div >
      <div className="customcards">
        <CategoryCard title={'Ingredients'} img={categoryImg1} />

        <HomeWallCard title={'Ingredients'} img={homewallImg1} buttonText={'Shop Now'} cardHeight={393} cardWidth={690} />
        <HomeWallCard title={'Edibles'} img={homewallImg2} buttonText={'Shop Now'} cardHeight={612} cardWidth={335} />
      </div>
      <div className='styleguides'>
        <CustomButton label='Shop Now' variant='secondary' />
        <CustomButton label='Explore' variant='primary' />
      </div>

      <div>
        <h2>Typography Style Guide</h2>

        <section>
          <h3>Size Variations</h3>
          <CustomTypography content="Text1" weight="BOLD" color="BLACK" size="EXTRA-LARGE" />
          <CustomTypography content="Text2" weight="BOLD" color="BLACK" size="LARGE" />
          <CustomTypography content="Text3" weight="BOLD" color="BLACK" size="MEDIUM" />
          <CustomTypography content="Text4" weight="BOLD" color="BLACK" size="REGULAR" />
          <CustomTypography content="Text5" weight="BOLD" color="BLACK" size="SMALL" />
          <CustomTypography content="Text6" weight="BOLD" color="BLACK" size="EXTRA-SMALL" />
        </section>

        <section>
          <h3>Weight Variations</h3>
          <CustomTypography content="Text7" weight="EXTRA-BOLD" color="BLACK" size="LARGE" />
          <CustomTypography content="Text8" weight="SEMI-BOLD" color="BLACK" size="LARGE" />
          <CustomTypography content="Text9" weight="REGULAR" color="BLACK" size="LARGE" />
          <CustomTypography content="Text10" weight="THIN" color="BLACK" size="LARGE" />
        </section>

        <section>
          <h3>Color Variations</h3>
          <CustomTypography content="Text11" weight="BOLD" color="PRIMARY" size="LARGE" />
          <CustomTypography content="Text12" weight="BOLD" color="SECONDARY" size="LARGE" />
          {/* 
          <CustomTypography content="Text13" weight="BOLD" color="TERITARY" size="LARGE" />
          <CustomTypography content="Text14" weight="BOLD" color="WHITE" size="LARGE" />
          */}
        </section>
      </div>

      <div style={{ marginTop: "50px", width: '500px' }}>
        <CustomInput type='text' />
      </div>
      <div style={{ marginTop: "50px", width: '500px' }}>
        <CustomInput type='password' />
      </div>
      <div style={{ marginTop: "50px", width: '500px' }}>
        <CustomSelect />
      </div>
      <div style={{ marginTop: "50px", width: '500px' }}>
        <CustomCheckbox label='Checkbox 1' name='checkbox'
          value={2} onChange={(e) => { }}
        />
      </div>
      <div style={{ marginTop: "50px", width: '500px' }}>
        <CustomButton variant='teritary' label='Teritary' fullWidth />
      </div>
      <div style={{ marginTop: "50px", width: '500px' }}>
        {/* <CustomPhoneInput/> */}
        <CustomIconButton variant={'primary'} iconColor={'#ffffff'} backgroundColor={'#32893B'} icon={"ArrowRight"} />
        <CustomIconButton variant={'secondary'} iconColor={'#32893B'} icon={"ArrowLeft"} />
      </div>
    </div>
  )
}

export default StyleGuide