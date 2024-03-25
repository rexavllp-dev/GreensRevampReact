// import Image from 'next/image';
"use client";
import { Image } from '@nextui-org/react';
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
import { IoMdHeart, IoMdStar } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaStar } from 'react-icons/fa';
import { addNotifyProducts } from '@/services/features/notifyProductSlice';
import Link from 'next/link';
import { removeSaveForLaterProduct } from '@/services/features/productSlice';

const ProductCard = ({ img, title, specialPrice, normalPrice, rating, id, data, haveRemoveBtn, handleRemove, hideNotifyBtn, isSaveForLater, wishlistLabel }) => {

  const { getTranslation } = useLanguage();
  const router = useRouter()
  const dispatch = useDispatch();

  // const token = cookies.get('accessToken')
  const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')
  const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

  // Add to cart
  const handleAddToCart = () => {

    const productData = {
      productId: id,
      quantity: 1,
    }

    dispatch(addProductToCart({ data: productData })).then((res) => {
      if (res.payload?.success) {
        toast.success(res.payload?.message);

        if (isSaveForLater) {
          dispatch(removeSaveForLaterProduct({ id: data?.save_for_later_id })).then((res) => {
            if (res.payload?.success) {
              // toast.success(res.payload?.message)
            } else {
              // toast.error(res.payload?.message)
            }
          }).catch(err => console.log(err));
        }
      } else {
        toast.error(res.payload?.message);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // Add notify product
  const handleAddNotify = () => {
    const productData = {
      product_id: id
    }
    dispatch(addNotifyProducts({ data: productData })).then((res) => {
      if (res.payload?.success) {
        toast.success(res.payload?.message);
      } else {
        toast.error(res.payload?.message);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const isOutStock = () => {
    if (data?.stock_availability === 'Out of stock') {
      return true;
    } else if (data?.inventory_management === 'true' || data?.inventory_management === true) {
      if (parseInt(data?.product_quantity) === 0) {
        return true;
      }
      return false;
    }
    else if (data?.product_inventory_id === null || data?.product_inventory_id === undefined) {
      return true;
    } else {
      return false;
    }
  }

  const handleAddToWishlist = (id) => {
    if (isLoggedIn) {

      dispatch(addProductToWishlist({ data: { product_id: id } })).then((res) => {
        if (res.payload?.success) {
          toast.success(res.payload?.message)
        } else {
          toast.error(res.payload?.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      router.push('/auth/login')
    }
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
        (wishlistLabel ? data[wishlistLabel] : data?.wishlist_id) == null ?
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
        <div className="cardimage">
          {/* <Image src={productImage} /> */}
          {/* <Image src={img}
            fill objectFit='cover'
            alt='img'
          //  width={173} height={173} 
          /> */}

          <Image
            isZoomed
            // width={240}
            alt="img"
            src={img}
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
              {/* <Image src={StarIcon} width={16} height={16} alt='icon' /> */}
              <IoMdStar size={12} />
            </div>
          </div>

        </div>
        <div className='cursor-pointer' onClick={() => router.push('/products/' + id)}>
          <CustomTypography content={title} weight='REGULAR' color='BLACK' size='REGULAR' />
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
        {
          haveRemoveBtn ?
            <div className="flex justify-between items-center">
              {
                isOutStock() ?
                  <>
                    {
                      !hideNotifyBtn ?
                        <button className={'productbtn'} onClick={() => {
                          handleAddNotify()
                        }}>
                          <div className='productbtn_text' >
                            Notify me
                          </div >
                        </button >
                        :
                        <></>
                    }
                  </>
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
                  <>
                    {
                      !hideNotifyBtn ?
                        <button className={'productbtn'} onClick={() => {
                          handleAddNotify()
                        }}>
                          <div className='productbtn_text' >
                            Notify me
                          </div >
                        </button >
                        :
                        <> </>
                    }
                  </>
                  :
                  <>
                    {
                      (data?.productoptions && data?.productoptions[0]?.optionId != null) ?
                        <Link href={`/products/${id}`}>
                          <button className={'productbtn'}>
                            <div className='productbtn_text' >
                              Options
                            </div >
                          </button >
                        </Link>
                        :
                        <button className={'productbtn'} onClick={() => {
                          handleAddToCart()
                        }}>
                          <div className='productbtn_text' >
                            {getTranslation('add_to_cart')}
                          </div >
                        </button >
                    }
                  </>
              }
            </div>
        }
      </div>

    </div >
  )
}

export default ProductCard