import React from 'react'
import "./HeroSectionTiles.scss"
import {
    Tile1, Tile2, Tile3, Tile4,
    Tile5, Tile6, Tile7, Tile8,
    Tile9,
    homewallImg1, homewallImg2
} from '@/assets/images'
import ImageCard from '@/components/cards/imagecard/ImageCard'
import { useLanguage } from '@/providers/LanguageProvider'

const HeroSectionTiles = () => {
    const { getTranslation } = useLanguage();
    return (
        <div className="homepage-tile-container">

            <div className="homepage-tile-webview">
                <div className="section-one">
                    <ImageCard title={'Cake Toppers'} img={Tile1} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                    <ImageCard title={'Edibles'} img={homewallImg2} buttonText={getTranslation('shop_now_btn')} cardHeight={"612px"} cardWidth={"100%"} />
                    <ImageCard title={'Feves'} img={Tile7} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                </div>
                <div className="section-two">
                    <ImageCard title={'Hello Christmas'} img={homewallImg1} buttonText={getTranslation('explore_btn')} cardHeight={"394px"} cardWidth={'100%'} />
                    <div className="subsection-one">
                        <div className="leftsection">
                            <ImageCard title={'Cellphane Cookie Bags'} img={Tile4} buttonText={getTranslation('explore_btn')} cardHeight={"250px"} cardWidth={'100%'} />
                        </div>
                        <div className="rightsection">
                            <ImageCard title={'Cake Mixes'} img={Tile5} buttonText={getTranslation('explore_btn')} cardHeight={"250px"} cardWidth={'100%'} />
                        </div>
                    </div>
                    <div className="subsection-two">
                        <ImageCard title={'Loyalty points on every purchase *'} img={Tile6} buttonText={getTranslation('signup')} cardHeight={"250px"} cardWidth={'100%'} />
                        <ImageCard title={'Christmas Panettone'} img={Tile8} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                    </div>

                </div>
                <div className="section-three">
                    <ImageCard title={'Decoration Stamps'} img={Tile2} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                    <ImageCard title={'Wrap your Gifts'} img={Tile3} buttonText={getTranslation('shop_now_btn')} cardHeight={"612px"} cardWidth={"100%"} />
                    <ImageCard title={'Silicone Moulds'} img={Tile9} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                </div>
            </div>



            <div className="homepage-tile-mobileview">
                <div className="top">
                    <ImageCard title={'Hello Christmas'} img={homewallImg1} buttonText={getTranslation('explore_btn')} cardHeight={"190px"} cardWidth={'100%'} />
                    <ImageCard title={'Cake Toppers'} img={Tile1} buttonText={getTranslation('shop_now_btn')} cardHeight={"190px"} cardWidth={"100%"} />

                    <div className="rightsplit">
                        <div className="leftsection">
                            <ImageCard title={'Wrap your Gifts'} img={Tile3} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                        </div>
                        <div className="rightsection">
                            <ImageCard title={'Decoration Stamps'} img={Tile2} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />
                            <ImageCard title={'Cellphane Cookie Bags'} img={Tile4} buttonText={getTranslation('explore_btn')} cardHeight={"142px"} cardWidth={'100%'} />
                        </div>
                    </div>
                    <ImageCard title={'Cake Mixes'} img={Tile5} buttonText={getTranslation('explore_btn')} cardHeight={"190px"} cardWidth={'100%'} />

                    <div className="leftsplit">
                        <div className="leftsection">
                            <ImageCard title={'Silicone Moulds'} img={Tile9} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />
                            <ImageCard title={'Feves'} img={Tile7} buttonText={getTranslation('shop_now_btn')} cardHeight={"142px"} cardWidth={"100%"} />

                        </div>
                        <div className="rightsection">
                            <ImageCard title={'Edibles'} img={homewallImg2} buttonText={getTranslation('shop_now_btn')} cardHeight={"300px"} cardWidth={"100%"} />
                        </div>
                    </div>
                    <ImageCard title={'Christmas Panettone'} img={Tile8} buttonText={getTranslation('shop_now_btn')} cardHeight={"190px"} cardWidth={"100%"} />
                    <ImageCard title={'Loyalty points on every purchase *'} img={Tile6} buttonText={'Signup'} cardHeight={"190px"} cardWidth={'100%'} />

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