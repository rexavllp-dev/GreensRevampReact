"use client";
import React, { useEffect, useRef } from 'react'
import {
  Brand1,
  Brand2,
  Brand3,
  Brand4,
  Brand5,
  Brand6,
  CataloueImg,
  Feed1,
  Feed2,
  Feed3,
  Feed4,
  ProductImg,
  RecipesImg,
  Season1,
  Season2,
  Season3,
  Season4,
  categoryImg1, categoryImg2,
  categoryImg3, categoryImg4,
  eventImg1,
  giftCardTile,
} from '../../../public/images'
import './HomePage.scss'
import CategoryCard from '@/components/cards/categorycard/CategoryCard'
import ImageCard from '@/components/cards/imagecard/ImageCard'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import { InstaIconGreen } from '../../../public/icons';
import Image from 'next/image';
import ProductCard from '@/components/cards/productcard/ProductCard';
import Chatbot from '@/components/chatbot/Chatbot';
import HeroSectionTiles from './components/HeroSectionTiles';
import useWindowSize from '@/hooks/useWindowSize';
import ImageSlider from '@/components/slider/ImageSlider';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '@/providers/LanguageProvider';
import appConfig from '@/config/appConfig';
import { listHomeCategory, listHomeBrand, listHomeSeason, listHomeAds } from "@/services/features/adminSlice";
import { topTrendingProducts, recentViews } from "@/services/features/productSlice";


// import { useWindowWidth } from '@react-hook/window-size';

const HomePage = () => {

  const dispatch = useDispatch();

  const imageUrl = appConfig.server.imageUrl;

  const { width, height } = useWindowSize();
  const isMobileView = width < 767;

  const { getTranslation } = useLanguage()

  const categoryRef = useRef();
  const seasonRef = useRef();
  const brandRef = useRef();
  const instagramRef = useRef();
  const recentProductsRef = useRef();
  const trendingProductsRef = useRef();
  const professionalsRef = useRef();

  const [homecategories, setHomeCategories]               = React.useState([]);
  const [homebrands, setHomeBrands]                       = React.useState([]);
  const [homeseason, setHomeseasons]                      = React.useState([]);
  const [homeads, setHomeAds]                             = React.useState([]);
  const [toptrendingproducts, setToptrendingproducts]     = React.useState([]);
  

  useEffect(() => {

    dispatch(listHomeCategory({})).then((response) => {
      if (response.payload?.success) {
        setHomeCategories(response.payload.result);

      }
    }).catch((err) => {
        console.log(err);
    })


    dispatch(listHomeBrand({})).then((response) => {
      if (response.payload?.success) {
        setHomeBrands(response.payload.result);
      }
    }).catch((err) => {
        console.log(err);
    })


    dispatch(listHomeSeason({})).then((response) => {
      if (response.payload?.success) {
          setHomeseasons(response.payload.result);
          //console.log(response.payload.result);
      }
    }).catch((err) => {
          console.log(err);
    })


    dispatch(listHomeAds({})).then((response) => {
      if (response.payload?.success) {
        setHomeAds(response.payload.result);
      }
    }).catch((err) => {
        console.log(err);
    })

    dispatch(listHomeAds({})).then((response) => {
      if (response.payload?.success) {
        setHomeAds(response.payload.result);
      }
    }).catch((err) => {
        console.log(err);
    })

    dispatch(topTrendingProducts({})).then((response) => {
      if (response.payload?.success) {
        setToptrendingproducts(response.payload.result);
      }
    }).catch((err) => {
        console.log(err);
    })


    dispatch(recentViews({})).then((response) => {
      if (response.payload?.success) {
        recentViews(response.payload.result);
      }
    }).catch((err) => {
        console.log(err);
    })


    
    


  }, [])


  /** Decrements or increments scollLeft property to scroll left or right respectively */
  const handleNav = (ref, direction) => {
    if (ref === "categoryRef") {
      if (direction === 'left') {
        categoryRef ? categoryRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
      } else {
        categoryRef ? categoryRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
      }
    } else if (ref === "seasonRef") {
      if (direction === 'left') {
        seasonRef ? seasonRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
      } else {
        seasonRef ? seasonRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
      }
    } else if (ref === "brandRef") {
      if (direction === 'left') {
        brandRef ? brandRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
      } else {
        brandRef ? brandRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
      }
    } else if (ref === "instagramRef") {
      if (direction === 'left') {
        instagramRef ? instagramRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
      } else {
        instagramRef ? instagramRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
      }
    }
    else if (ref === "recentProductsRef") {
      if (direction === 'left') {
        recentProductsRef ? recentProductsRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
      } else {
        recentProductsRef ? recentProductsRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
      }
    }
    else if (ref === "trendingProductsRef") {
      if (direction === 'left') {
        trendingProductsRef ? trendingProductsRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
      } else {
        trendingProductsRef ? trendingProductsRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
      }
    }
    else if (ref === "professionalsRef") {
      if (direction === 'left') {
        professionalsRef ? professionalsRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
      } else {
        professionalsRef ? professionalsRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
      }
    }
  }



  const seasons = [
    {
      id: 1,
      title: 'Easter',
      img: Season4
    },
    {
      id: 2,
      title: 'EID',
      img: Season3
    },
    {
      id: 3,
      title: 'Halloween',
      img: Season2
    },
    {
      id: 4,
      title: 'Valentines Day',
      img: Season1
    },
    {
      id: 5,
      title: 'New Year',
      img: Season3
    },
    {
      id: 6,
      title: 'New Year',
      img: Season2
    },
  ]



  const brands = [
    {
      id: 1,
      img: Brand1
    },
    {
      id: 2,

      img: Brand2
    },
    {
      id: 3,
      img: Brand3
    },
    {
      id: 4,
      img: Brand4
    },
    {
      id: 5,
      img: Brand5
    },
    {
      id: 6,
      img: Brand6
    },
    {
      id: 7,
      img: Brand2
    },

    {
      id: 1,
      img: Brand1
    },
    {
      id: 2,

      img: Brand2
    },
    {
      id: 3,
      img: Brand3
    },
    {
      id: 4,
      img: Brand4
    },
    {
      id: 5,
      img: Brand5
    },
    {
      id: 6,
      img: Brand6
    },
    {
      id: 7,
      img: Brand2
    },
    {
      id: 4,
      img: Brand4
    },
    {
      id: 5,
      img: Brand5
    },
    {
      id: 6,
      img: Brand6
    },
    {
      id: 7,
      img: Brand2
    },

  ]

  const instagramFeeds = [
    {
      id: 1,
      img: Feed1
    },
    {
      id: 2,

      img: Feed2
    },
    {
      id: 3,
      img: Feed3
    },
    {
      id: 4,
      img: Feed4
    },
    {
      id: 5,
      img: Feed1
    },

    {
      id: 2,

      img: Feed2
    },
    {
      id: 3,
      img: Feed3
    },
    {
      id: 4,
      img: Feed4
    },
    {
      id: 5,
      img: Feed1
    },

    {
      id: 2,
      img: Feed2
    },
    {
      id: 3,
      img: Feed3
    },
    {
      id: 4,
      img: Feed4
    },
    {
      id: 5,
      img: Feed1
    },

  ]

  const featuresList = [
    {
      id: 1,
      title: 'Extra 10% off* ',
      description: 'For new users. Shop with Code : WELCOME10'
    },
    {
      id: 2,
      title: 'HACCP & GHP',
      description: 'Certified Company'
    },
    // {
    //   id: 3,
    //   title: 'Gift Cards',
    //   description: 'Gifting the baker in your Life made easy'
    // },
    // {
    //   id: 4,
    //   title: 'Greens Rewards',
    //   description: 'Save on purchases using Loyalty points'
    // },
    {
      id: 5,
      title: 'Free Delivery within UAE',
      description: 'For orders above AED 100'
    },
    {
      id: 6,
      title: 'Secured Payment',
      description: '100% Secured'
    },
  ]

  const products = [
    {
      id: 1,
      title: 'CDA Wafer Happy New Year 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },
    {
      id: 2,
      title: 'CDA Wafer Graduation Cap 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },
    {
      id: 3,
      title: 'CDA Wafer Happy New Year 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },
    {
      id: 4,
      title: 'CDA Wafer Happy New Year 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },
    {
      id: 5,
      title: 'CDA Wafer Happy New Year 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },
    {
      id: 6,
      title: 'CDA Wafer Happy New Year 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },
    {
      id: 7,
      title: 'CDA Wafer Happy New Year 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },
    {
      id: 8,
      title: 'CDA Wafer Happy New Year 1x12 Pcs',
      price: 'AED 20',
      previous_price: 'AED 22',
      rating: '4.5',
    },

  ]

  // Split brands array into two rows
  const brandsMiddleIndex = Math.ceil(brands?.length / 2);
  const firstBrandRow = brands?.slice(0, brandsMiddleIndex);
  const secondBrandRow = brands?.slice(brandsMiddleIndex);

  //Split instagramfeeds array into two rows
  const instaFeedMidIndex = Math.ceil(instagramFeeds.length / 2);
  const firstInstaFeedRow = instagramFeeds?.slice(0, instaFeedMidIndex);
  const secondInstaFeedRow = instagramFeeds?.slice(instaFeedMidIndex);

  return (
    <div className='homepage-wrapper'>
      <div className="homepage">

        {/* Homepage Tiles section started */}
        <HeroSectionTiles />
        {/* Homepage Tiles section ended */}

        {/* <ImageSlider/> */}



        {/* Category section started */}
        <div className="categories-wrapper">
          <div className="header">
            <div className="leftsection"></div>
            <CustomTypography content={getTranslation('shop_by_category')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />
            <div className="scrollbuttons">
              <CustomIconButton variant={'secondary'} iconColor={'#32893B'} icon={"ArrowLeft"} onClick={() => handleNav('categoryRef', 'left')} />
              <CustomIconButton variant={'primary'} iconColor={'#ffffff'} backgroundColor={'#32893B'} icon={"ArrowRight"} onClick={() => handleNav('categoryRef', 'right')} />
            </div>
          </div>
          <div className="categories" ref={categoryRef}>
            {
              homecategories.map((category) => (
                <CategoryCard key={category.id} cardWidth={isMobileView ? 123 : 266} cardHeight={isMobileView ? 123 : 266}
                  title={category.cat_name} haveTitle={true} img={category.cat_logo? category.cat_logo : ''} />
              ))
            }
          </div>
        </div>
        {/* Category section ended */}

        {/* Brands section started */}
        <div className="brands-wrapper">
          <div className="header">
            <div className="leftsection"></div>
            <CustomTypography content={getTranslation('shop_by_brands')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />
            <div className="scrollbuttons">
              <CustomIconButton variant={'secondary'} iconColor={'#32893B'} icon={"ArrowLeft"} onClick={() => handleNav('brandRef', 'left')} />
              <CustomIconButton variant={'primary'} iconColor={'#ffffff'} backgroundColor={'#32893B'} icon={"ArrowRight"} onClick={() => handleNav('brandRef', 'right')} />
            </div>
          </div>

          <div className="brands" ref={brandRef}>
            {
              isMobileView ?
                firstBrandRow?.map((category) => (

                  <CategoryCard key={category.id}
                    img={category.img}
                    cardWidth={isMobileView ? 94 : 140} cardHeight={isMobileView ? 94 : 140}
                    haveTitle={false}
                  // imgPadding={30}
                  />
                ))
                :
                homebrands?.map((brand) => (
                  <CategoryCard key={brand.brd_name}
                    img={brand.brd_logo? brand.brd_logo : ''}
                    cardWidth={isMobileView ? 94 : 140} cardHeight={isMobileView ? 94 : 140}
                    haveTitle={false}
                  // imgPadding={30}
                  />
                ))
            }
          </div>
          {
            isMobileView &&
            <div className="brands" ref={brandRef}>
              {
                secondBrandRow?.map((category) => (
                  <CategoryCard key={category.id}
                    img={category.img}
                    cardWidth={isMobileView ? 94 : 140} cardHeight={isMobileView ? 94 : 140}
                    haveTitle={false}
                  // imgPadding={30}
                  />
                ))
              }
            </div>
          }

        </div>
        {/* Brands section ended */}



        {/* Season section started */}
        <div className="categories-wrapper">
          <div className="header">
            <div className="leftsection"></div>
            <CustomTypography content={getTranslation('shop_by_season')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />
            <div className="scrollbuttons">
              <CustomIconButton variant={'secondary'} iconColor={'#32893B'} icon={"ArrowLeft"} onClick={() => handleNav('seasonRef', 'left')} />
              <CustomIconButton variant={'primary'} iconColor={'#ffffff'} backgroundColor={'#32893B'} icon={"ArrowRight"} onClick={() => handleNav('seasonRef', 'right')} />
            </div>
          </div>
          <div className="categories" ref={seasonRef}>
            {
              homeseason.map((obj) => (
                <CategoryCard key={obj.id} cardWidth={isMobileView ? 123 : 266} cardHeight={isMobileView ? 123 : 266}
                  title={obj.season_name} haveTitle={true} img={obj.season_image? obj.season_image : ''} />
              ))
            }
          </div>
        </div>
        {/* Season section ended */}


        {/* Gift Cards section started  */}
        <div className="giftsection">
          <ImageCard title={'Buy Gift Cards for any occasion'} img={giftCardTile} buttonText={'Shop Now'}
            buttonBottom={true} cardHeight={isMobileView ? "190px" : "335px"} cardWidth={"100%"} />
        </div>
        {/* Gift Cards section ended  */}


        {/* Events section started  */}

        { homeads.map((val) => {
          return <div className="events">
            <ImageCard
              img={val.ads_image}
              haveButton={false}
              haveTitle={false}
              objectFit={'cover'}
              // cardHeight={"auto"}
              cardHeight={isMobileView ? "190px" : "335px"}
              cardWidth={"100%"}
            />
          </div>

          })
        }

        
        {/* Events section ended  */}

        {/* Recently viewed section started  */}
        <div className="categories-wrapper ">
          <div className="header">
            <div className="leftsection"></div>
            <CustomTypography content={getTranslation('recently_viewed')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />

            <div className="scrollbuttons">
              <CustomIconButton variant={'secondary'}
                iconColor={'#32893B'} icon={"ArrowLeft"}
                onClick={() => handleNav('recentProductsRef', 'left')}
              />
              <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                backgroundColor={'#32893B'} icon={"ArrowRight"}
                onClick={() => handleNav('recentProductsRef', 'right')}
              />
            </div>   

          </div> 
          <div className="categories" ref={recentProductsRef}>
            {
              products.map(product => (
                <ProductCard key={product.id} title={product.title} price={product.price}
                  previous_price={product.previous_price} rating={product.rating} img={"https://greensecombucket.s3.ap-south-1.amazonaws.com/images/image%204%20%281%29.png"} />
              ))
            }
          </div>
        </div>
        {/* Recently viewed section ended  */}


        {/* Top treding products section started  */}
        <div className="categories-wrapper">
          <div className="header">
            <div className="leftsection"></div>
            <CustomTypography content={getTranslation('top_trending_products')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />

            <div className="scrollbuttons">
              <CustomIconButton variant={'secondary'}
                iconColor={'#32893B'} icon={"ArrowLeft"}
                onClick={() => handleNav('trendingProductsRef', 'left')}
              />
              <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                backgroundColor={'#32893B'} icon={"ArrowRight"}
                onClick={() => handleNav('trendingProductsRef', 'right')}
              />
            </div>

          </div>
          <div className="categories" ref={trendingProductsRef}>
            {
              toptrendingproducts.map(product => (
                <ProductCard key={product.id} title={product.title} price={product.price}
                  previous_price={product.previous_price} rating={product.rating} img={"https://greensecombucket.s3.ap-south-1.amazonaws.com/images/image%204%20%281%29.png"} />
              ))
            }
          </div>
        </div>
        {/* Top trending products section ended  */}


        {/* Made for Professionals section started  */}
        {/* <div className="categories-wrapper mb-5">
          <div className="header">
            <div className="leftsection"></div>
            <CustomTypography content={getTranslation('made_for_professionals')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />

            <div className="scrollbuttons">
              <CustomIconButton variant={'secondary'}
                iconColor={'#32893B'} icon={"ArrowLeft"}
                onClick={() => handleNav('professionalsRef', 'left')}
              />
              <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                backgroundColor={'#32893B'} icon={"ArrowRight"}
                onClick={() => handleNav('professionalsRef', 'right')}
              />
            </div>

          </div>
          <div className="categories" ref={professionalsRef}>
            {
              products.map(product => (
                <ProductCard key={product.id} title={product.title} price={product.price}
                  previous_price={product.previous_price} rating={product.rating} img={"https://greensecombucket.s3.ap-south-1.amazonaws.com/images/image%204%20%281%29.png"} />
              ))
            }
          </div>
        </div> */}
        {/* Made for Professionals section ended  */}


        {/* Recipes section started  */}
        <div className="recipes-section">
          <div className="left">
            <ImageCard img={RecipesImg}
              title='Recipes'
              buttonBottom={true}
              buttonText={'Browse'}
              cardHeight={"100%"}
              cardWidth={"100%"}
            />
          </div>
          <div className="right">
            <ImageCard
              title='Catalouge'
              img={CataloueImg}
              buttonBottom={true}
              buttonText={'Browse'}
              cardHeight={"100%"}
              cardWidth={"100%"}
            />
          </div>
        </div>
        {/* Recipes section ended  */}



        {/* Instagram section started  */}
        <div className="categories-wrapper instagram-section">
          <div className="header">
            <div className="leftsection"></div>
            <CustomTypography content={getTranslation('more_from_the_feed')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />

            <div className="scrollbuttons">
              <CustomIconButton variant={'secondary'}
                iconColor={'#32893B'} icon={"ArrowLeft"}
                onClick={() => handleNav('instagramRef', 'left')}
              />
              <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                backgroundColor={'#32893B'} icon={"ArrowRight"}
                onClick={() => handleNav('instagramRef', 'right')}
              />
            </div>

          </div>
          <div className="instagramfeeds" ref={instagramRef}>
            {
              isMobileView ?
                firstInstaFeedRow?.map((obj) => (
                  <ImageCard key={obj.id}
                    noRadius={true}
                    haveTitle={false} haveButton={false}
                    cardWidth={isMobileView ? '164px' : '335px'} cardHeight={isMobileView ? '164px' : '335px'}
                    img={obj.img} haveIcon={true} />
                ))
                :
                instagramFeeds?.map((obj) => (
                  <ImageCard key={obj.id}
                    haveTitle={false} haveButton={false}
                    cardWidth={isMobileView ? '164px' : '335px'} cardHeight={isMobileView ? '164px' : '335px'}
                    img={obj.img} haveIcon={true} />
                ))
            }
          </div>
          {
            isMobileView &&
            <div className="instagramfeeds" ref={instagramRef}>
              {
                secondInstaFeedRow?.map((obj) => (
                  <ImageCard key={obj.id}
                    noRadius={true}
                    haveTitle={false} haveButton={false}
                    cardWidth={isMobileView ? '164px' : '335px'} cardHeight={isMobileView ? '164px' : '335px'}
                    img={obj.img} haveIcon={true} />
                ))
              }
            </div>
          }

        </div>
        {/* Instagram section ended  */}
      </div>

      {/* Features section started */}
      <div className="features_offers_wrapper">
        {
          isMobileView ?
            <div className="header">
              <div className="badge">
                <CustomTypography content="More on our Instagram page" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-SMALL" />
              </div>
            </div>
            :
            <div className="header">
              <CustomTypography content={getTranslation('follow_us')} weight="SEMI-BOLD" color="BLACK" size="MEDIUM-LARGE" />
              <Image src={InstaIconGreen} height={31} width={31} />
            </div>
        }

        <div className="features_offers" >
          {
            featuresList?.map((obj, i) => (
              <>
                <div className="offer" key={obj.id}>
                  <CustomTypography content={obj.title} weight="SEMI-BOLD" color="SECONDARY" size="MEDIUM" />
                  <CustomTypography content={obj.description} weight="MEDIUM" color="GRAY" size="MEDIUM" />
                </div>
                {featuresList?.length - 1 !== i && <span className='divider'></span>}
              </>
            ))
          }
        </div>
      </div>
      {/* Features section ended */}
      <Chatbot />

    </div >
  )
}

export default HomePage