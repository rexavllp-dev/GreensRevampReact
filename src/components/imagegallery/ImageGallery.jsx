import React from 'react'
import "./ImageGallery.scss"
import Image from 'next/image'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const ImageGallery = () => {
    return (
        <div className="image_gallery">
            <Image src={'https://s3-alpha-sig.figma.com/img/33b5/2ebc/e2dea62ee876772bfa29bcbb879e9ca6?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kop2CYw862Gp0-phHF6gQXE56PaBtcHHsC9X6JRXeAkj8PUzFS8KI7Ec3gT~9xgEbNnqQcUK6v6C1LGt5iN7UyfkgUlBXIBIEfbi7SEzcdHQ3LapM766OnM-r7HHfE9IjyiU7hOnFctrGM0yVsYqU4YQi2lprRerh4JMvFzYIb7SK44s4BhEtcXZ0YUrm0dUE4vJB4r4r~c~flGlIyIDeXjuoRncEjk22DacHZOFvvmLimj4inAx8~SxOh3KEKF~EVeyvAGhOLx5uSY85-q9g4pp130YdW~DA3M0-qlhuBcXHd2yhMXmKZXi4OJ4nJ6cc5u-ECpuPRDh0ySMOe~41w__'}
                width={400}
                height={400}
                alt="product"
            />
            <div className='bottomcontrollers'>
                <div className="navbtn">
                    <MdKeyboardArrowLeft size={24} />
                </div>
                <div className="navlist">
                    <Image src={'https://s3-alpha-sig.figma.com/img/33b5/2ebc/e2dea62ee876772bfa29bcbb879e9ca6?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kop2CYw862Gp0-phHF6gQXE56PaBtcHHsC9X6JRXeAkj8PUzFS8KI7Ec3gT~9xgEbNnqQcUK6v6C1LGt5iN7UyfkgUlBXIBIEfbi7SEzcdHQ3LapM766OnM-r7HHfE9IjyiU7hOnFctrGM0yVsYqU4YQi2lprRerh4JMvFzYIb7SK44s4BhEtcXZ0YUrm0dUE4vJB4r4r~c~flGlIyIDeXjuoRncEjk22DacHZOFvvmLimj4inAx8~SxOh3KEKF~EVeyvAGhOLx5uSY85-q9g4pp130YdW~DA3M0-qlhuBcXHd2yhMXmKZXi4OJ4nJ6cc5u-ECpuPRDh0ySMOe~41w__'}
                        width={100}
                        height={100}
                        alt="product"
                    />
                    <Image src={'https://s3-alpha-sig.figma.com/img/33b5/2ebc/e2dea62ee876772bfa29bcbb879e9ca6?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kop2CYw862Gp0-phHF6gQXE56PaBtcHHsC9X6JRXeAkj8PUzFS8KI7Ec3gT~9xgEbNnqQcUK6v6C1LGt5iN7UyfkgUlBXIBIEfbi7SEzcdHQ3LapM766OnM-r7HHfE9IjyiU7hOnFctrGM0yVsYqU4YQi2lprRerh4JMvFzYIb7SK44s4BhEtcXZ0YUrm0dUE4vJB4r4r~c~flGlIyIDeXjuoRncEjk22DacHZOFvvmLimj4inAx8~SxOh3KEKF~EVeyvAGhOLx5uSY85-q9g4pp130YdW~DA3M0-qlhuBcXHd2yhMXmKZXi4OJ4nJ6cc5u-ECpuPRDh0ySMOe~41w__'}
                        width={100}
                        height={100}
                        alt="product"
                    />
                    <Image src={'https://s3-alpha-sig.figma.com/img/33b5/2ebc/e2dea62ee876772bfa29bcbb879e9ca6?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kop2CYw862Gp0-phHF6gQXE56PaBtcHHsC9X6JRXeAkj8PUzFS8KI7Ec3gT~9xgEbNnqQcUK6v6C1LGt5iN7UyfkgUlBXIBIEfbi7SEzcdHQ3LapM766OnM-r7HHfE9IjyiU7hOnFctrGM0yVsYqU4YQi2lprRerh4JMvFzYIb7SK44s4BhEtcXZ0YUrm0dUE4vJB4r4r~c~flGlIyIDeXjuoRncEjk22DacHZOFvvmLimj4inAx8~SxOh3KEKF~EVeyvAGhOLx5uSY85-q9g4pp130YdW~DA3M0-qlhuBcXHd2yhMXmKZXi4OJ4nJ6cc5u-ECpuPRDh0ySMOe~41w__'}
                        width={100}
                        height={100}
                        alt="product"
                    />
                </div>

                <div className="navbtn">
                    <MdKeyboardArrowRight size={24} />
                </div>

            </div>
        </div>
    )
}

export default ImageGallery