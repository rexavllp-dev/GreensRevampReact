import React from 'react'
import "./ImageGallery.scss"
import Image from 'next/image'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import ReactImageMagnify from 'react-image-magnify'

const ImageGallery = ({ data }) => {
    const images = data?.data?.product?.product_img;

    return (
        <div className="image_gallery flex flex-col items-center">

            <Image src={images?.find((img) => img.is_baseimage === true)?.url ?
                images?.find((img) => img.is_baseimage === true)?.url :
                'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
            }
                width={400}
                height={400}
                alt="product"
            />

            {/* <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Product',
                    isFluidWidth: true,
                    src: images?.find((img) => img.is_baseimage === true)?.url
                },
                largeImage: {
                    src: images?.find((img) => img.is_baseimage === true)?.url,
                    width: 1700,
                    height: 1500
                }
            }} /> */}
            {/* <Image src={'https://s3-alpha-sig.figma.com/img/33b5/2ebc/e2dea62ee876772bfa29bcbb879e9ca6?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kop2CYw862Gp0-phHF6gQXE56PaBtcHHsC9X6JRXeAkj8PUzFS8KI7Ec3gT~9xgEbNnqQcUK6v6C1LGt5iN7UyfkgUlBXIBIEfbi7SEzcdHQ3LapM766OnM-r7HHfE9IjyiU7hOnFctrGM0yVsYqU4YQi2lprRerh4JMvFzYIb7SK44s4BhEtcXZ0YUrm0dUE4vJB4r4r~c~flGlIyIDeXjuoRncEjk22DacHZOFvvmLimj4inAx8~SxOh3KEKF~EVeyvAGhOLx5uSY85-q9g4pp130YdW~DA3M0-qlhuBcXHd2yhMXmKZXi4OJ4nJ6cc5u-ECpuPRDh0ySMOe~41w__'}
                width={400}
                height={400}
                alt="product"
            /> */}
            <div className='bottomcontrollers'>
                <div className="navbtn mr-2">
                    <MdKeyboardArrowLeft size={24} />
                </div>
                <div className="navlist flex gap-2">
                    {
                        images?.map((img, imagesIndex) => {
                            if (img.url) {
                                return (
                                    <Image src={img.url}
                                        width={100}
                                        height={100}
                                        alt="product"
                                    />
                                )
                            }
                        })
                    }
                </div>

                <div className="navbtn ml-2 ">
                    <MdKeyboardArrowRight size={24} />
                </div>

            </div>
        </div>
    )
}

export default ImageGallery