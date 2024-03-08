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
import { addProductToWishlist, removeWishlist } from '@/services/features/wishlistSlice';
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

const ProductCard = ({ img, title, specialPrice, normalPrice, rating, id, data, haveRemoveBtn, handleRemove }) => {

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

  const isOutStock = () => {
    if (data?.stock_availability === 'Out of stock') {
      return true
    } else if (data?.inventory_management === 'true' || data?.inventory_management === true) {
      if (parseInt(data?.product_quantity) === 0) {
        return true;
      }
      return false
    }
    else if (data?.product_inventory_id === null || data?.product_inventory_id === undefined) {
      return true;
    } else {
      return false
    }
  }

  const handleAddToWishlist = (id) => {
    dispatch(addProductToWishlist({ data: { product_id: id } })).then((res) => {
      if (res.payload?.success) {
        toast.success(res.payload?.message)
      } else {
        toast.error(res.payload?.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const handleRemoveFromWishlist = (id) => {
    dispatch(removeWishlist({ id })).then((res) => {
      if (res.payload?.success) {
        toast.success(res.payload?.message)
      } else {
        toast.error(res.payload?.message)
      }
    }).catch(err => console.error(err))
  }
  return (
    <div className='productcard'>
      {
        data?.wishlist_id == null ?
          <div className="icon cursor-pointer" onClick={() => handleAddToWishlist(id)}>
            {/* <Image src={heartIconBlack} width={16} height={16} alt='icon' /> */}
            <CiHeart size={16} />
          </div>
          :
          <div className="icon cursor-pointer" onClick={() => handleRemoveFromWishlist(id)}>
            {/* <Image src={heartIconBlack} width={16} height={16} alt='icon' /> */}
            <IoMdHeart size={16} color={'red'} />
          </div>
      }
      <div className="cardimg_wrapper cursor-pointer" onClick={() => {
        router.push('/products/' + id)
      }}>
        <div className="cardimage ">
          {/* <Image src={productImage} /> */}
          <Image src={img}
            fill objectFit='cover'
            alt='img'
          //  width={173} height={173} 
          />

        </div>
        <div className="topbadgecontainer">
          {
            // isOutStock() ?
            //   <Badge color={'out-of-stock'}
            //     label={'Out of Stock'}
            //   />
            //   :
            (data?.best_seller ?
              <Badge color={'best-seller'}
                label={'Best Seller'}
              />
              :
              <></>
            )
          }

          {/* <Badge color={'sale'} label={'Sale'} /> */}
        </div>
        <div className="badgecontainer">
          {
            isOutStock() ?
              <Badge color={'out-of-stock'}
                label={'Out of Stock'}
              />
              // :
              // (data?.best_seller ?
              //   <Badge color={'best-seller'}
              //     label={'Best Seller'}
              //   />
              :
              <></>
          }

          {/* <Badge color={'sale'} label={'Sale'} /> */}
        </div>
      </div>
      <div className="productdetails">

        <div className="topsection">
          <div className="left cursor-pointer" onClick={() => router.push('/products/' + id)}>
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
        <div className='cursor-pointer' onClick={() => router.push('/products/' + id)}>
          <CustomTypography content={title} weight='REGULAR' color='BLACK' size='MEDIUM' />
        </div>


        <div className='cursor-pointer flex  items-center gap-3' onClick={() => router.push('/products/' + id)}>
          {
            data?.sku ?
              <div>
                <CustomTypography content={"SKU Code "} weight='REGULAR' color='BLACK' size='SMALLER' />
                <CustomTypography content={data?.sku} weight='REGULAR' color='GRAY' size='SMALL' />
              </div>
              :
              <></>
          }
          {
            (data?.sku && data?.item_code) ?
              <span className='divider-vertical'></span>
              :
              <></>
          }
          {
            data?.item_code ?
              <div>
                <CustomTypography content={"Item Code "} weight='REGULAR' color='BLACK' size='SMALLER' />
                <CustomTypography content={data?.item_code} weight='REGULAR' color='GRAY' size='SMALL' />
              </div>
              :
              <></>
          }
        </div>
        {/* <div className='cursor-pointer flex justify-between items-center' onClick={() => router.push('/products/' + id)}>
          {
            data?.sku ?
              <CustomTypography content={"SKU Code: " + data?.sku} weight='REGULAR' color='GREY' size='SMALL' />
              :
              <></>
          }
          {
            (data?.sku && data?.item_code) ?
              <span className='divider-vertical'></span>
              :
              <></>
          }
          {
            data?.item_code ?
              <CustomTypography content={"Item Code: " + data?.item_code} weight='REGULAR' color='GREY' size='SMALL' />
              :
              <></>
          }
        </div> */}
        {
          haveRemoveBtn ?
            <div className="flex justify-between items-center">
              {
                isOutStock() ?
                  <button className={'productbtn'} onClick={() => {
                    // handleAddToCart()
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
              <div className='flex items-center cursor-pointer' onClick={() => handleRemove()}>
                <CustomTypography content={"Remove"} weight='BOLD' color='GRAY' size='REGULAR' />
              </div>
            </div>
            :
            <div className="flex justify-center">
              {
                isOutStock() ?
                  <button className={'productbtn'} onClick={() => {
                    // handleAddToCart()
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
        }
      </div>

    </div>
  )
}

export default ProductCard