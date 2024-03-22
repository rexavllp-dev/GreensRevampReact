import React, { useEffect } from 'react'
import "./HeroSectionTiles.scss"
import {
    Tile1, Tile2, Tile3, Tile4,
    Tile5, Tile6, Tile7, Tile8,
    Tile9,
    homewallImg1, homewallImg2
} from '../../../../public/images'
import ImageCard from '@/components/cards/imagecard/ImageCard'
import { useLanguage } from '@/providers/LanguageProvider'
import appConfig from '@/config/appConfig'
import { listBanner } from "@/services/features/adminSlice";
import { useDispatch, useSelector } from 'react-redux'

const HeroSectionTiles = () => {

    const dispatch = useDispatch();
    const { getTranslation } = useLanguage();
    const imageUrl = appConfig.server.imageUrl;
    const [homebanners, setHomeBanners] = React.useState([]);

    const {
        isHomeBannerUpdated,
    } = useSelector(state => state.admin);


    useEffect(() => {

        dispatch(listBanner({})).then((res) => {
            if (res.payload?.success) {
                var arr = [];
                res.payload?.result.map((value) => {

                    arr[value.banner_id] = value;

                });
                
                setHomeBanners(arr)
               

            } else {
                console.log(res);
            }
          });

    }, [isHomeBannerUpdated])


    return (
        <div className="homepage-tile-container">

    <div className="homepage-tile-webview">
                <div className="section-one">
                    <ImageCard  title={homebanners[1]?.banner_caption} link={homebanners[1]?.banner_link} img={homebanners[1]?.banner_image ? homebanners[1]?.banner_image : ''} buttonText={homebanners[1]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                    <ImageCard title={homebanners[2]?.banner_caption} link={homebanners[2]?.banner_link} img={homebanners[2]?.banner_image ? homebanners[2]?.banner_image : ''} buttonText={homebanners[2]?.banner_link_text}  cardHeight={"612px"} cardWidth={"100%"} />
                    <ImageCard title={homebanners[3]?.banner_caption} link={homebanners[3]?.banner_link} img={homebanners[3]?.banner_image ? homebanners[3]?.banner_image : ''} buttonText={homebanners[3]?.banner_link_text}  cardHeight={"300px"} cardWidth={"100%"} />
                </div>
                <div className="section-two">
                    <ImageCard title={homebanners[4]?.banner_caption} link={homebanners[4]?.banner_link} img={homebanners[4]?.banner_image ? homebanners[4]?.banner_image : ''} buttonText={homebanners[4]?.banner_link_text} cardHeight={"394px"} cardWidth={'100%'} />
                    <div className="subsection-one">
                        <div className="leftsection">
                            <ImageCard title={homebanners[5]?.banner_caption} link={homebanners[5]?.banner_link} img={homebanners[5]?.banner_image ? homebanners[5]?.banner_image : ''} buttonText={homebanners[5]?.banner_link_text} cardHeight={"250px"} cardWidth={'100%'} />
                        </div>
                        <div className="rightsection">
                            <ImageCard title={homebanners[6]?.banner_caption} link={homebanners[6]?.banner_link} img={homebanners[6]?.banner_image ? homebanners[6]?.banner_image : ''} buttonText={homebanners[6]?.banner_link_text} cardHeight={"250px"} cardWidth={'100%'} />
                        </div>
                    </div>
                    <div className="subsection-two">
                        <ImageCard title={homebanners[7]?.banner_caption} link={homebanners[7]?.banner_link} img={homebanners[7]?.banner_image ? homebanners[7]?.banner_image : ''} buttonText={homebanners[7]?.banner_link_text} cardHeight={"250px"} cardWidth={'100%'} />
                        <ImageCard title={homebanners[8]?.banner_caption} link={homebanners[8]?.banner_link} img={homebanners[8]?.banner_image ? homebanners[8]?.banner_image : ''} buttonText={homebanners[8]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                    </div>

                </div>
                <div className="section-three">
                    <ImageCard title={homebanners[9]?.banner_caption} link={homebanners[9]?.banner_link} img={homebanners[9]?.banner_image ? homebanners[9]?.banner_image : ''} buttonText={homebanners[9]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                    <ImageCard title={homebanners[10]?.banner_caption} link={homebanners[10]?.banner_link} img={homebanners[10]?.banner_image ? homebanners[10]?.banner_image : ''} buttonText={homebanners[10]?.banner_link_text} cardHeight={"612px"} cardWidth={"100%"} />
                    <ImageCard title={homebanners[11]?.banner_caption} link={homebanners[11]?.banner_link} img={homebanners[11]?.banner_image ? homebanners[11]?.banner_image : ''} buttonText={homebanners[11]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                </div>
            </div>



            <div className="homepage-tile-mobileview">
                <div className="top">
                    <ImageCard title={'Hello Christmas'} img={imageUrl + '/images/homewall1.png'} buttonText={getTranslation('explore_btn')} cardHeight={"190px"} cardWidth={'100%'} />
                    <ImageCard title={'Cake Toppers'} img={imageUrl + '/images/tile1.png'} buttonText={getTranslation('shop_now_btn')} cardHeight={"190px"} cardWidth={"100%"} />

                    <div className="rightsplit">
                        <div className="leftsection">
                            <ImageCard title={'Wrap your Gifts'} img={imageUrl + '/images/tile3.png'} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                        </div>
                        <div className="rightsection">
                            <ImageCard title={'Decoration Stamps'} img={imageUrl + '/images/tile2.png'} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />
                            <ImageCard title={'Cellphane Cookie Bags'} img={imageUrl + '/images/tile4.png'} buttonText={getTranslation('explore_btn')} cardHeight={"142px"} cardWidth={'100%'} />
                        </div>
                    </div>
                    <ImageCard title={'Cake Mixes'} img={imageUrl + '/images/tile5.png'} buttonText={getTranslation('explore_btn')} cardHeight={"190px"} cardWidth={'100%'} />

                    <div className="leftsplit">
                        <div className="leftsection">
                            <ImageCard title={'Silicone Moulds'} img={imageUrl + '/images/tile9.png'} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />
                            <ImageCard title={'Feves'} img={imageUrl + '/images/tile7.png'} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />

                        </div>
                        <div className="rightsection">
                            <ImageCard title={'Edibles'} img={imageUrl + '/images/homewall2.png'} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                        </div>
                    </div>
                    <ImageCard title={'Christmas Panettone'} img={imageUrl + '/images/tile8.png'} buttonText={getTranslation('shop_now_btn')} cardHeight={"190px"} cardWidth={"100%"} />
                    <ImageCard title={'Loyalty points on every purchase *'} img={imageUrl + '/images/tile6.png'} buttonText={'Signup'} cardHeight={"190px"} cardWidth={'100%'} />

                </div>
                <div className="section-two">

                    <div className="subsection-one">
                        <div className="leftsection">
                        </div>
                        <div className="rightsection">
                        </div>
                    </div>
                    <div className="subsection-two">

                    </div>

                </div>
                <div className="section-three">

                </div>
            </div>
        </div>
    )
}

export default HeroSectionTiles





// import React from 'react'
// import "./HeroSectionTiles.scss"
// import {
//     Tile1, Tile2, Tile3, Tile4,
//     Tile5, Tile6, Tile7, Tile8,
//     Tile9,
//     homewallImg1, homewallImg2
// } from '../../../../public/images'
// import ImageCard from '@/components/cards/imagecard/ImageCard'
// import { useLanguage } from '@/providers/LanguageProvider'

// const HeroSectionTiles = () => {
//     const { getTranslation } = useLanguage();
//     return (
//         <div className="homepage-tile-container">

//             <div className="homepage-tile-webview">
//                 <div className="section-one">
//                     <ImageCard title={'Cake Toppers'} img={Tile1} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
//                     <ImageCard title={'Edibles'} img={homewallImg2} buttonText={getTranslation('shop_now_btn')} cardHeight={"612px"} cardWidth={"100%"} />
//                     <ImageCard title={'Feves'} img={Tile7} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
//                 </div>
//                 <div className="section-two">
//                     <ImageCard title={'Hello Christmas'} img={homewallImg1} buttonText={getTranslation('explore_btn')} cardHeight={"394px"} cardWidth={'100%'} />
//                     <div className="subsection-one">
//                         <div className="leftsection">
//                             <ImageCard title={'Cellphane Cookie Bags'} img={Tile4} buttonText={getTranslation('explore_btn')} cardHeight={"250px"} cardWidth={'100%'} />
//                         </div>
//                         <div className="rightsection">
//                             <ImageCard title={'Cake Mixes'} img={Tile5} buttonText={getTranslation('explore_btn')} cardHeight={"250px"} cardWidth={'100%'} />
//                         </div>
//                     </div>
//                     <div className="subsection-two">
//                         <ImageCard title={'Loyalty points on every purchase *'} img={Tile6} buttonText={getTranslation('signup')} cardHeight={"250px"} cardWidth={'100%'} />
//                         <ImageCard title={'Christmas Panettone'} img={Tile8} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
//                     </div>

//                 </div>
//                 <div className="section-three">
//                     <ImageCard title={'Decoration Stamps'} img={Tile2} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
//                     <ImageCard title={'Wrap your Gifts'} img={Tile3} buttonText={getTranslation('shop_now_btn')} cardHeight={"612px"} cardWidth={"100%"} />
//                     <ImageCard title={'Silicone Moulds'} img={Tile9} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
//                 </div>
//             </div>



//             <div className="homepage-tile-mobileview">
//                 <div className="top">
//                     <ImageCard title={'Hello Christmas'} img={homewallImg1} buttonText={getTranslation('explore_btn')} cardHeight={"190px"} cardWidth={'100%'} />
//                     <ImageCard title={'Cake Toppers'} img={Tile1} buttonText={getTranslation('shop_now_btn')} cardHeight={"190px"} cardWidth={"100%"} />

//                     <div className="rightsplit">
//                         <div className="leftsection">
//                             <ImageCard title={'Wrap your Gifts'} img={Tile3} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
//                         </div>
//                         <div className="rightsection">
//                             <ImageCard title={'Decoration Stamps'} img={Tile2} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />
//                             <ImageCard title={'Cellphane Cookie Bags'} img={Tile4} buttonText={getTranslation('explore_btn')} cardHeight={"142px"} cardWidth={'100%'} />
//                         </div>
//                     </div>
//                     <ImageCard title={'Cake Mixes'} img={Tile5} buttonText={getTranslation('explore_btn')} cardHeight={"190px"} cardWidth={'100%'} />

//                     <div className="leftsplit">
//                         <div className="leftsection">
//                             <ImageCard title={'Silicone Moulds'} img={Tile9} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />
//                             <ImageCard title={'Feves'} img={Tile7} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />

//                         </div>
//                         <div className="rightsection">
//                             <ImageCard title={'Edibles'} img={homewallImg2} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
//                         </div>
//                     </div>
//                     <ImageCard title={'Christmas Panettone'} img={Tile8} buttonText={getTranslation('shop_now_btn')} cardHeight={"190px"} cardWidth={"100%"} />
//                     <ImageCard title={'Loyalty points on every purchase *'} img={Tile6} buttonText={'Signup'} cardHeight={"190px"} cardWidth={'100%'} />

//                 </div>
//                 <div className="section-two">

//                     <div className="subsection-one">
//                         <div className="leftsection">
//                         </div>
//                         <div className="rightsection">
//                         </div>
//                     </div>
//                     <div className="subsection-two">

//                     </div>

//                 </div>
//                 <div className="section-three">

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSectionTiles