"use client";
import React from 'react'
import './Footer.scss'
import Image from 'next/image'
import { companyLogoLight } from '../../../public/images'
import CustomTypography from '@/library/typography/CustomTypography'
import { ApplePayIcon, GooglePayIcon, MasterCardIcon, TikTokIcon, VisaIcon, facebookIcon, instagramIcon, linkedinIcon, youtubeIcon } from '../../../public/icons'
import Link from 'next/link'
import { Input } from '@nextui-org/react'
import CustomButton from '@/library/buttons/CustomButton'
import IconInput from '@/library/input/iconinput/IconInput'
import CustomInput from '@/library/input/custominput/CustomInput';
import appConfig from '@/config/appConfig';

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className="footer">
        <div className="top">
          <div className="left">
            <div className="logo">
              <Link href="/">
                <Image src={appConfig.server.imageUrl + '/images/company_logo_light.png'} width={280} height={80} alt="logo" />
              </Link>
            </div>

            <div className="socialmedia">
              <div className="title">
                <CustomTypography content='Follow us' color='QUATERNARY' size='REGULAR' weight='SEMI-BOLD' />
              </div>
              <div className="icons">
                <Image src={instagramIcon} alt="instagram" />
                <Image src={linkedinIcon} alt="linkedin" />
                <Image src={youtubeIcon} alt="youtube" />
                <Image src={facebookIcon} alt="facebook" />
                <Image src={TikTokIcon} alt="tiktok" />
              </div>
            </div>
          </div>

          <div className="navsections">
            <section>
              <div className="title">
                <CustomTypography content='Customer Support' color='QUATERNARY' size='REGULAR' weight='SEMI-BOLD' />
              </div>
              <div className="subsections">
                <CustomTypography content='Contact us' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                <CustomTypography content='Help Centre' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                <CustomTypography content='Returns & Exchanges' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                <CustomTypography content='Gift Cards' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                <CustomTypography content='Greens Rewards' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
              </div>
            </section>

            <section>
              <div className="title">
                <CustomTypography content='Our Company' color='QUATERNARY' size='REGULAR' weight='SEMI-BOLD' />
              </div>
              <div className="subsections">
                <CustomTypography content='About us' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                <CustomTypography content='Careers' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
              </div>
            </section>
            <section>
              <div className="title">
                <CustomTypography content='Account' color='QUATERNARY' size='REGULAR' weight='SEMI-BOLD' />
              </div>
              <div className="subsections">
                <CustomTypography content='Manage Account' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                <CustomTypography content='Order Status' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                {/* <CustomTypography content='Email Preferences' color='QUATERNARY' size='REGULAR' weight='REGULAR' /> */}
              </div>
            </section>
          </div>


        </div>

        <div className="bottom">

          <div className="subscribe">
            <div className="title">
              <CustomTypography content='Subscribe to our Newsletter' color='QUATERNARY' size='REGULAR' weight='SEMI-BOLD' />
            </div>
            <CustomTypography content='Sign up to stay in the loop about the hottest deals,
             coolest new products, and exclusive sales events. Subscribers will get AED15 Discount coupon.'
              color='QUATERNARY' size='REGULAR' weight='REGULAR' />
            <div className="inputsection">
              <IconInput />
            </div>

          </div>


          <div className="right">
            <div className="payment">
              <CustomTypography content='*VAT applicable on all products' color='QUATERNARY' size='SMALL-REGULAR' weight='THIN' />
              <div className="icons">
                <Image src={GooglePayIcon} alt="googlepay" />
                <Image src={ApplePayIcon}  />
                <Image src={MasterCardIcon} />
                <Image src={VisaIcon} />
              </div>
            </div>
            <div className="terms">
              <div className="rights">
                {/* <CustomTypography content='© 2023 Greens International. All Rights Reserved.' color='QUATERNARY' size='REGULAR' weight='REGULAR' /> */}
                <CustomTypography content='© 2023 Greens International. All Rights Reserved.' color='QUATERNARY' size='SMALL-REGULAR' weight='THIN' />
              </div>
              <div className="links-container">
                <div className="links">
                  <Link href="/">
                    <CustomTypography content='Terms and Conditions' color='QUATERNARY' size='SMALL' weight='REGULAR' style={{ textDecoration: 'underline' }} />
                  </Link>
                </div>
                <div className="links">
                  <Link href="/">
                    <CustomTypography content='Privacy Policy' color='QUATERNARY' size='SMALL' weight='REGULAR' style={{ textDecoration: 'underline' }} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer