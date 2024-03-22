'use client';
import React, { useEffect, useState } from 'react'
import './MainSidebar.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from '@/components/customicons'
import { BookIcon, CatelogueIcon, ChatIcon, ChatIconBlack, CloseIcon, DashboardIcon, GemIcon, GiftCardIcon, HelpingHandIcon, HomeIcon, KeyArrowRight, LockIcon, MenuSquare, RecipieIcon, SignoutIcon, WishListBlack, userIconBlack } from '../../../../public/icons'
import ImgThumb from '@/components/customicons/ImgThumb';
import { CataloueImg, Category1, Category2, Category3, Category4, Category5, Category6, companyLogo } from '../../../../public/images';
import CustomButton from '@/library/buttons/CustomButton';
import useWindowSize from '@/hooks/useWindowSize';
import CountryDropdown from '@/components/dropdown/country_dropdown/CountryDropdown';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { logout } from '@/services/features/authSlice';
import { getMainTree } from "@/services/features/categorySlice";


const cookies = new Cookies();

const MainSidebar = ({ open, onClose, routeModule }) => {

  const { width, height } = useWindowSize();
  const isMobileView = width < 767;
  const [lang, setLang] = React.useState('ar');

  const router = useRouter()
  const dispatch = useDispatch();

  const [user, setUser] = React.useState(typeof window !== "undefined" && window.localStorage.getItem('user') && (window.localStorage.getItem('user') !== 'undefined') && JSON.parse(window.localStorage.getItem('user')))
  const { isLoggedIn, authCount} = useSelector(state => state.auth);
  const { maincategories, isMainCategoryTreeLoaded} = useSelector(state => state.categories)
  const [categoryTreeData, setCategoryTreeData] = useState([]);
  

  useEffect(() => {
    setUser(typeof window !== "undefined" && window.localStorage.getItem('user') && (window.localStorage.getItem('user') !== 'undefined') && JSON.parse(window.localStorage.getItem('user')));
  }, [isLoggedIn, authCount]);

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  }


  useEffect(() => {
    dispatch(getMainTree())
  }, [])

  useEffect(() => {
    if(isMainCategoryTreeLoaded){

      setCategoryTreeData(maincategories.data);
      console.log(categoryTreeData);

    }
  }, [maincategories])
  
  


  const menuItems = [
    {
      id: 1,
      title: 'Categories',
      icon: MenuSquare,
      isIcon: true,
      link: '/categories',
      isActive: false,
      isMobile: false,
      isMainMenu: true,
      children:categoryTreeData
    },
    {
      id: 2,
      title: 'My Account',
      icon: userIconBlack,
      isIcon: true,
      isActive: false,
      link: '/account',
      isMainMenu: true,
      isMobile: false,
    },
    {
      id: 3,
      title: 'Dashboard',
      icon: DashboardIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 4,
      title: 'Wishlist',
      icon: WishListBlack,
      isIcon: true,
      isActive: false,
      link: '/wishlist',
      isMainMenu: true,
      isMobile: false,
    },
    {
      id: 5,
      title: 'Gift Cards',
      icon: GiftCardIcon,
      isIcon: true,
      isActive: false,
      link: '/giftcards',
      isMainMenu: true,
      isMobile: false,
    },
    {
      id: 6,
      title: 'Member Rewards',
      icon: GemIcon,
      isIcon: true,
      isActive: false,
      link: '/memberrewards',
      isMainMenu: true,
      isMobile: false,
    },
    {
      id: 7,
      title: 'Help & Contact',
      icon: HelpingHandIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: false,
    },
    {
      id: 8,
      title: 'Purchase History',
      icon: BookIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 9,
      title: 'Addresses',
      icon: HomeIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 10,
      title: 'Recipes',
      icon: RecipieIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 11,
      title: 'Catalog',
      icon: CatelogueIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 12,
      title: 'Account Settings',
      icon: userIconBlack,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 13,
      title: 'Communication & Privacy',
      icon: ChatIconBlack,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 14,
      title: 'Terms of Use',
      icon: LockIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    // {
    //   id: 15,
    //   title: 'Sign out',
    //   icon: SignoutIcon,
    //   isIcon: true,
    //   isActive: false,
    //   link: '/help',
    //   isMainMenu: true,
    //   isMobile: true,
    // },
  ]

  // const mainMenuItems = [
  //   {
  //     id: 1,
  //     title: 'Categories',
  //     icon: HelpingHandIcon,
  //     isIcon: true,
  //     isActive: false,
  //     link: '/help',
  //     isMainMenu: true,
  //   },
  //   {
  //     id: 1,
  //     title: 'Categories',
  //     icon: HelpingHandIcon,
  //     isIcon: true,
  //     isActive: false,
  //     link: '/help',
  //     isMainMenu: true,
  //   },
  //   {
  //     id: 6,
  //     title: 'Help & Contact',
  //     icon: HelpingHandIcon,
  //     isIcon: true,
  //     isActive: false,
  //     link: '/help',
  //     isMainMenu: true,
  //   },
  // ]
  const mainMenuItems = [
    {
      id: 1,
      title: 'Categories',
      icon: HelpingHandIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
    },
    {
      id: 2,
      title: 'Dashboard',
      icon: DashboardIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 3,
      title: 'Purchase History',
      icon: BookIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 4,
      title: 'Wishlist',
      icon: WishListBlack,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 5,
      title: 'Gift Cards',
      icon: GiftCardIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 6,
      title: 'Addresses',
      icon: HomeIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 7,
      title: 'Recipes',
      icon: RecipieIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 8,
      title: 'Catalog',
      icon: CatelogueIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 9,
      title: 'Account Settings',
      icon: userIconBlack,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 9,
      title: 'Communication & Privacy',
      icon: ChatIconBlack,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 10,
      title: 'Help & Contact',
      icon: HelpingHandIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 11,
      title: 'Terms of Use',
      icon: LockIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
    {
      id: 12,
      title: 'Sign out',
      icon: SignoutIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
      isMobile: true,
    },
  ]

  const [navItems, setNavItems] = useState([]);
  const [parentMenu, setParentMenu] = useState([]);
  const [isMainMenu, setIsMainMenu] = useState(true)
  const [menuTitles, setMenuTitles] = useState(['Main Menu']);

  useEffect(() => {

      setNavItems(menuItems);
      
  }, [categoryTreeData])

  useEffect(() => {
    
    switch (routeModule) {
      case 'categories':
        setParentMenu([])
        setNavItems(menuItems[0]?.children)
        setMenuTitles((prev => ([...prev, "Main Menu", "Categories"])))
        setIsMainMenu(false)
        break

      case 'ingredients':
        setParentMenu([menuItems[0]?.children])
        setNavItems(menuItems[0]?.children[0]?.children)
        setMenuTitles((prev => ([...prev, "Main Menu", "Categories", "Ingredients"])))
        setIsMainMenu(false)
        break

      case 'cakes':
        setParentMenu([menuItems[0]?.children])
        setNavItems(menuItems[0]?.children[1]?.children)
        setMenuTitles((prev => ([...prev, "Main Menu", "Categories", "Cake Decorations"])))
        setIsMainMenu(false)
        break

    }
  }, [routeModule, open, categoryTreeData])


  const handleItemClick = (item, parent) => {

    // Update the current menu to the clicked item's children
    if (item.children) {
      if (parent[0]?.isMainMenu) {
        setParentMenu([])
      } else {
        setParentMenu(prev => ([...prev, parent]))
      }
      setMenuTitles((prev => ([...prev, item.title])))
      setNavItems(item.children);
      setIsMainMenu(false)
    }else {
      router.push(item.link);
      onClose();
    }
  };

  const handleBackClick = () => {
    if (parentMenu && parentMenu?.length > 0) {
      setNavItems(parentMenu[parentMenu?.length - 1]);
      setParentMenu(prev => prev.slice(0, -1));
    } else {
      setNavItems(menuItems);
      setIsMainMenu(true);
    }
    setMenuTitles((prev) => prev.slice(0, -1));
  };

  const handleClose = () => {
    setNavItems(menuItems);
    setParentMenu([]);
    setIsMainMenu(true)
    setMenuTitles(['Main Menu']);
    onClose()
  }


  if (!open) return null;

  return (
    <div className="sidebar_background" >

      <div className="outerarea" onClick={handleClose} />

      <div className='main-sidebar-wrapper' onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
          return;
        } else if (isMobileView) {
          return;
        }
        handleClose();
      }} tabIndex={1}>

        <div className="topheader">
          <div className='left'>
            <div className="closebtn" onClick={handleClose}>
              <Image width={32} height={32} alt='close' src={CloseIcon} />
            </div>
            <div className="logo">
              <Image src={companyLogo} />
            </div>
          </div>

          <div className="contrycontainer">
            <div className="countryitem">
              <CountryDropdown />
            </div>
            <div className="countryitem">
              <div className={lang === 'ar' ? "item pb-2 lang" : "item lang"} onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
                {lang === 'ar' ?
                  <CustomTypography
                    content=" 
عربي " color="BLACK" size="LARGE" weight="BOLD" />
                  :
                  <CustomTypography
                    content="English" color="BLACK" size="MEDIUM" weight="BOLD" />
                }

              </div>
            </div>
          </div>

        </div>
        <div className="header">
          {isMainMenu ?
            <div className="backbtn" >
              {/* <CustomTypography content={parentMenu?.length > 0 ? parentMenu[0].title : 'Main Menu'} color='BLACK' size='MEDIUM' weight='MEDIUM' /> */}
              <CustomTypography content={'Main Menu'} color='BLACK' size='MEDIUM' weight='MEDIUM' />
            </div>
            :
            <div className="backbtn" onClick={handleBackClick}>
              <ArrowLeft />
              <CustomTypography content={'Back to ' + menuTitles[menuTitles.length - 2]} color='BLACK' size='MEDIUM' weight='MEDIUM' />
            </div>
          }
          <div className="closebtn" onClick={handleClose}>
            <CustomTypography content='Close' color='BLACK' size='MEDIUM' weight='MEDIUM' />
          </div>
        </div>

        <div className="sidebar">
          {navItems[0]?.parentMenu ?
            <div className="currentmenu">
              <CustomTypography content={navItems[0]?.parentMenu} color='BLACK' size='LARGE' weight='SEMI-BOLD' />
              <Image src={KeyArrowRight} alt='arrow' width={24} height={24} />
            </div>
            : <></>
          }


          {
            navItems?.map((item, index) => {
              if (isMainMenu) {
                return (
                  <div className="item" key={index} onClick={() => {
                    handleItemClick(item, navItems);
                  }}>
                    <div className="title">

                      {item.isIcon ?
                        <div className="logo">
                          <div className="img">
                            <Image src={item.icon}
                              fill objectFit='cover' alt='logo' />
                          </div>
                        </div>
                        :
                        <div className="img">
                          {
                            item.icon ?
                              <Image src={item.icon}
                                fill objectFit='cover' alt='logo' />
                              :
                              <ImgThumb />
                          }
                        </div>
                      }

                      <CustomTypography content={item.title} color={item.color ? item.color : 'BLACK'} size='MEDIUM' weight='MEDIUM' />
                    </div>
                    {
                      item.title === "Categories" ? <Image src={KeyArrowRight} alt='arrow' width={24} height={24} /> : <></>
                    }

                  </div>
                )
              }

              else {
                return (
                  <div className="item" key={index}>
                    <div className="title">

                      {item.isIcon ?
                        <div className="logo">
                          <div className="img">
                            <Image src={item.icon}
                              fill objectFit='cover' alt='logo' />
                          </div>
                        </div>
                        :
                        <div className="img">
                          {
                            item.icon ?
                              <Image src={item.icon}
                                fill objectFit='cover' alt='logo' />
                              :
                              <ImgThumb />
                          }
                        </div>
                      }

                      <CustomTypography content={item.title} color={item.color ? item.color : 'BLACK'} size='MEDIUM' weight='MEDIUM' />
                    </div>
                    {item.children.length != 0 ?
                    <Image src={KeyArrowRight} alt='arrow' width={24} height={24} onClick={() => handleItemClick(item, navItems)} />
                    : ''}
                  </div>
                )
              }

            })
          }

          {
            user ?
              (
                isMainMenu &&
                <div className="item" onClick={() => { handleLogout() }}>
                  <div className="title">

                    <div className="logo">
                      <div className="img">
                        <Image src={SignoutIcon}
                          fill objectFit='cover' alt='logo' />
                      </div>
                    </div>

                    <CustomTypography content={"Sign out"} color={'BLACK'} size='MEDIUM' weight='MEDIUM' />
                  </div>
                </div>
              )
              :
              <>
                <CustomButton label='Login' variant='transparent' onClick={() => router.push('/auth/login')} />
                <CustomButton label='Create an account' variant='primary' onClick={() => router.push('/auth/register')} />
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default MainSidebar