import Image from 'next/image';
import React from 'react';
import './ProductCard.scss';
import CustomTypography from '@/library/typography/CustomTypography';
import { StarIcon, heartIconBlack } from '../../../../public/icons';
import { useLanguage } from '@/providers/LanguageProvider';
import { useRouter } from 'next/navigation';

const ProductCard = ({ img, title, specialPrice, normalPrice, rating, id, data }) => {

  const { getTranslation } = useLanguage();
  const router = useRouter()

  const Badge = () => {
    return (
      <div className="productbadge">
        <CustomTypography content='Sale' weight='SEMI-BOLD' color='BLACK' size='MEDIUM' />
      </div>
    )
  }
  return (
    <div className='productcard'>
      <div className="icon">
        <Image src={heartIconBlack} width={16} height={16} alt='icon' />
      </div>
      <div className="cardimg_wrapper" onClick={() => {
        router.push('/products/' + id)
      }}>
        <div className="cardimage">
          {/* <Image src={productImage} /> */}
          <Image src={img}
            fill objectFit='cover'
            alt='img'
          //  width={173} height={173} 
          />

        </div>
      </div>
      <div className="productdetails">
        <div className="badgecontainer">
          {/* <Badge /> */}
        </div>
        <div className="topsection">
          <div className="left">
            {
              specialPrice !== null ?
                <>
                  <CustomTypography content={`AED ${specialPrice}`} weight='SEMI-BOLD' color='BLACK' size='MEDIUM' />
                  <CustomTypography content={`AED ${normalPrice}`} style={{ textDecoration: 'line-through' }}
                    weight='SEMI-BOLD' color='GRAY-LIGHT' size='MEDIUM-SMALL' />
                </>
                :
                <CustomTypography content={`AED ${normalPrice}`} weight='SEMI-BOLD' color='BLACK' size='MEDIUM' />
            }
          </div>
          <div className="right">
            <CustomTypography content={rating} weight='MEDIUM' color='BLACK' size='REGULAR' />
            <div className="staricon">
              <Image src={StarIcon} width={16} height={16} alt='icon' />
            </div>
          </div>

        </div>
        <div >
          <CustomTypography content={title} weight='REGULAR' color='BLACK' size='REGULAR' />
        </div>
        <div className="bottomsection">
          <button className={'productbtn'}>
            <div className='productbtn_text' >
              {getTranslation('add_to_cart')}
            </div >
          </button >
        </div>
      </div>

    </div>
  )
}

export default ProductCard