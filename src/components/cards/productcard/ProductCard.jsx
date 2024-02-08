import Image from 'next/image';
import React from 'react';
import './ProductCard.scss';
import CustomTypography from '@/library/typography/CustomTypography';
import { StarIcon, heartIconBlack } from '../../../../public/icons';
import { useLanguage } from '@/providers/LanguageProvider';
import { useRouter } from 'next/navigation';
import { addProductToCart } from '@/services/features/cartSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Badge from '@/components/badges/Badge';

const ProductCard = ({ img, title, specialPrice, normalPrice, rating, id, data }) => {

  const { getTranslation } = useLanguage();
  const router = useRouter()
  const dispatch = useDispatch();

  // Add to cart
  const handleAddToCart = () => {

    const productData = {
      productId: id,
      quantity: 1,
    }

    dispatch(addProductToCart({ data: productData })).then((res) => {
      if (res.payload?.success) {
        toast.success(res.payload?.message);
      } else {
        toast.error(res.payload?.message);
      }
    }).catch((err) => {
      console.log(err)
    })
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
          {
            (data?.stock_availability === 'Out of stock') &&
            <Badge color={'out-of-stock'}
              label={'Out of Stock'}
            />
          }

          {/* <Badge color={'sale'} label={'Sale'} /> */}
        </div>
        <div className="topsection">
          <div className="left">
            {/* {
              specialPrice !== null ?
                <>
                  <CustomTypography content={`AED ${specialPrice}`} weight='SEMI-BOLD' color='BLACK' size='MEDIUM' />
                  <CustomTypography content={`AED ${normalPrice}`} style={{ textDecoration: 'line-through' }}
                    weight='SEMI-BOLD' color='GRAY-LIGHT' size='MEDIUM-SMALL' />
                </>
                :
                <CustomTypography content={`AED ${normalPrice}`} weight='SEMI-BOLD' color='BLACK' size='MEDIUM' />
            } */}
            {
              specialPrice ?
                <>
                  <CustomTypography content={`AED ${parseFloat(specialPrice?.toFixed(2))}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                  <CustomTypography content={`AED ${parseFloat(normalPrice?.toFixed(2))}`} color="GRAY-LIGHT" size="MEDIUM-SMALL" weight="SEMI-BOLD" style={{ textDecoration: 'line-through' }} />
                </>
                :
                <CustomTypography content={`AED ${parseFloat(normalPrice?.toFixed(2))}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
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
          {
            (data?.stock_availability === 'Out of stock') ?
              <button className={'productbtn'} onClick={() => {
                handleAddToCart()
              }}>
                <div className='productbtn_text' >
                  Notify me
                </div >
              </button >
              :
              <button className={'productbtn'} onClick={() => {
                handleAddToCart()
              }}>
                <div className='productbtn_text' >
                  {getTranslation('add_to_cart')}
                </div >
              </button >
          }
        </div>
      </div>

    </div>
  )
}

export default ProductCard