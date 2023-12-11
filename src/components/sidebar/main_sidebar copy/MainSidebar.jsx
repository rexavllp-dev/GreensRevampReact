'use client';
import React, { useState } from 'react'
import './MainSidebar.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from '@/components/customicons'
import { GemIcon, GiftCardIcon, HelpingHandIcon, KeyArrowRight, MenuSquare, SignoutIcon, WishListBlack, userIconBlack } from '@/assets/icons'
import ImgThumb from '@/components/customicons/ImgThumb';

const MainSidebar = ({ open, onClose }) => {

  const menuItems = [
    {
      id: 1,
      title: 'Categories',
      icon: MenuSquare,
      isIcon: true,
      link: '/categories',
      isActive: false,
      isMainMenu: true,
      children: [
        {
          id: 1,
          title: 'Ingredients',
          icon: 'https://s3-alpha-sig.figma.com/img/137a/775b/777a8774e348bd416fa7510b311fff15?Expires=1700438400&Signature=cs0hap2anh7lN-IIOWtr85SnvzgzQlKfPSXpbyOtPmNij0AbbxwpCQr~21LQqRqhN-Im~MZ4ambi7ifRupu5~JdGBq1yYlahPAflYBCo2bEmbnAknpQmi36O3LCFB8iwXSrmOOuuMJmTwSaAN0i3GScFJTT-SKYtxPcKxGCw4LrBjwkdjr9TlcEtM2h6Gv2Sg0WUi2QkMmTSo5rJqR43JsxJPBFbrKPTRJGpYpwX3CEn-RPprUEaoN71MxMM0h-VZS-j~dQzALS8zGzmavuuRdZ8PUkdasEliKtEpKx4If8lvqSAFaIJqpOYRDuz1CrX~L0yC4T-QrYpVneITPUNhg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
          isIcon: false,
          link: '/ingredients',
          isActive: false,

          children: [
            {
              id: 1,
              title: 'Toppings & Fillings',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: "Ingredients"
            },
            {
              id: 2,
              title: 'Basic Ingredients',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: "Ingredients"
            },
            {
              id: 3,
              title: 'Food Colours',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: "Ingredients"
            },
            {
              id: 4,
              title: 'Flavours',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: "Ingredients"
            },
            {
              id: 5,
              title: 'Mixes',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: "Ingredients"
            },
            {
              id: 6,
              title: 'Edible Gold & Silver',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: "Ingredients"
            },
          ]
        },
        {
          id: 2,
          title: 'Cake Decorations',
          icon: 'https://s3-alpha-sig.figma.com/img/df9b/4262/0e28abcf819505edbfaeaf0c18b1749d?Expires=1701043200&Signature=mQE9vOaVoIkMk1TDVVbfh08hOFeUqOnA12eEJFPFJMNayQBBTlej9TUwWY~Vu3hKYAD7dveccF-N2Ks-sfZ236uqvFk8lE0yM1iz1AiBCDj5N49CZDpJl71AooMnKrAckt3wsiT6Ei0vxPc5xQzxmk8cCWa7AgzrW9EWgH7xadGfJtgK8YPnFL5qEii79YNgTGqWMZhURhsZiqr~SYMN~beV9a6Y5zD-L~cK7VqwxMXe7JTDQWcN5eG4uQGtjGxxKqqPbE0GPu5nODyw5eRqpN~xt9RngfLXWLhEJH59vIAsF7irKrNUaA36b7Ss4UPuBJkR8AvcmUNSbTivUH1JAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
          isIcon: false,
          isActive: false,
          link: '/ingredients',

          children: [
            {
              id: 1,
              title: 'Edible Prints',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: 'Cake Decorations',
              children: [
                {
                  id: 1,
                  title: 'Edible Ink',
                  icon: '',
                  isIcon: false,
                  isActive: false,
                  link: '/ingredients',
                  parentMenu: 'Edible Prints'
                },
                {
                  id: 2,
                  title: 'Wafer Sheets',
                  icon: '',
                  isIcon: false,
                  isActive: false,
                  link: '/ingredients',
                  parentMenu: 'Edible Prints'
                },
                {
                  id: 3,
                  title: 'Frosting Sheets',
                  icon: '',
                  isIcon: false,
                  isActive: false,
                  link: '/ingredients',
                  parentMenu: 'Edible Prints'
                },
              ]
            },
            {
              id: 2,
              title: 'Air Brush',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/ingredients',
              parentMenu: 'Cake Decorations'
            },
            {
              id: 3,
              title: 'Tools & Accessories',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/tools',
              parentMenu: "Cake Decorations"
            },
            {
              id: 4,
              title: 'Essentials',
              icon: '',
              isIcon: false,
              isActive: false,
              link: '/essentials',
              parentMenu: "Cake Decorations"
            }
          ]
        },
        {
          id: 3,
          title: 'Baking Supplies',
          icon: 'https://s3-alpha-sig.figma.com/img/a4e5/e54f/f1795cdab0ce8028d39f79f9091c6cdb?Expires=1701043200&Signature=OtI6DNLmYC0L3oF7XQ-VlNrb8KEMpBRM5BS8Sexh0TpiA2Absk5Mk05H5zSYNcR4wqLcRgVIdOBk1wzLRM5Y8DgoKLWBIXlYj~nDwY8XhHx9irChjeFYU0-HiiXPbohEkyJah422wZymTH4La4kq7Vw1gevUBcTPwxrD6zyYl6dUkQOsaitc-yA5XkfTKvEzT9catG08mq9aBO0TSG8Bz33OJt46tn9~MxvlVU65yWoAqeZPNPUsBd9vI580DefwEYc11J-oKkr4~7m2Uhh0TaZ1YO~RWTM2Gq8xUHLbqWpD-ObxUonjqaZfPIiYYcuPf~NV-piiNiRt4rmk4iT3OQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
          isIcon: false,
          isActive: false,
          link: '/ingredients',

        },
        {
          id: 4,
          title: 'Chocolate',
          icon: 'https://s3-alpha-sig.figma.com/img/0474/f434/779226091751879828869811544041ec?Expires=1701043200&Signature=MBn92QGMivdDMxPSKn5adffJ0R3SxKwLbOsc7j8RtTD~~apXD-p3QEYAFROD2eVUdHHtnJdZxudYbWcIgtT8Sqn1sgvyx1hoNKoUtXLQP-udoveXNKOEziG6rzyzfULRhwrvuaSgKPImMRzljvA51J8sZromQM3n9AXCcrrdTRuDvQfhRCDA0PuIrNs6T~uSAJBZtkKDlZQJr2BrO8aFL-H9~HxnlAS~5ODzVfIT3c97h1lhNuaKEwVWTQhkqvRcu~W~X8D2AWgNcqcCdx6M5h94BhDi3r7aZaoICVKmH5NUExKXPgfPDJ~Sj7PPzW90x3U80zmCdEKNb5pgjH-8Pg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
          isIcon: false,
          isActive: false,
          link: '/ingredients',

        },
        {
          id: 5,
          title: 'Ho. Re. Ca.',
          icon: 'https://s3-alpha-sig.figma.com/img/bfc0/600f/5ef2606650c3e7784352071a5341f0f2?Expires=1701043200&Signature=EHkT5ZDP4Su6QB2cIzH0bkIRKomwKmp71BbL8UIpx8HyR4LAgQs0rGVWzD66-z11fOI7LFV6Z6GJo9lQ~jJC~e57qn2BBMSyiOsFeVsn-chmmqth2sf3uCojdiRqmEVvuFeKggMxXPayolxu6C7zkPqeeL~ad~mVWOS~p-bsCrWAyaT3ZlGHW6Usu5MRM4AYUndZpV~LNz0TdL8gGgotTkqWsPci5gNOehQdxrC2EKhHwfFsK2uL~qXE3fqUdANpwMrqp-7ua1wCMWMmSZDOtxknRV~RvT0Xvp9ShBSONFthX~vBsxHt9Dc4qyOTmJHAcjOJwLkHEAcDUXAa8BClaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
          isIcon: false,
          isActive: false,
          link: '/ingredients',

        },
        {
          id: 6,
          title: 'Seasonal',
          icon: 'https://s3-alpha-sig.figma.com/img/139f/6d24/d8553615ed9b7676f7e6949951cbc290?Expires=1701043200&Signature=Xuoh8BWz1mOuZLPdjifFtYM17iB-UVgnfZpwTn2MS3SNom-Bm1LInsLQyvMuWlhXpmLDrBSoGHU9d0gIkmnPgTizlC0r5HV2JoIpmdCYIPstWOnXLSWStPffVv8MBsCuWERdFxnKWEvF4OLosgc0eynznYw9EtGvR0YciWFh8uJT38xNtS8qU9d9AIcOJ77cIWLmMDXRBtWID8EL9kckBzdSrAYnhHq3~laiUfX2n7yq9iyy-v~MIYQWRQDrQnuXqwr72dBC2GNM1TjfbXvh8fhgXJs4ANI~khUVbyCD4ADEP8fU4V~USNu9QEDkObLYMnw961GlhLInjxcsRBT22Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
          isIcon: false,
          isActive: false,
          link: '/ingredients',
        }
      ]
    },
    {
      id: 2,
      title: 'My Account',
      icon: userIconBlack,
      isIcon: true,
      isActive: false,
      link: '/account',
      isMainMenu: true,
    },
    {
      id: 3,
      title: 'Wishlist',
      icon: WishListBlack,
      isIcon: true,
      isActive: false,
      link: '/wishlist',
      isMainMenu: true,
    },
    {
      id: 4,
      title: 'Gift Cards',
      icon: GiftCardIcon,
      isIcon: true,
      isActive: false,
      link: '/giftcards',
      isMainMenu: true,
    },
    {
      id: 5,
      title: 'Member Rewards',
      icon: GemIcon,
      isIcon: true,
      isActive: false,
      link: '/memberrewards',
      isMainMenu: true,
    },
    {
      id: 6,
      title: 'Help & Contact',
      icon: HelpingHandIcon,
      isIcon: true,
      isActive: false,
      link: '/help',
      isMainMenu: true,
    },
    {
      id: 7,
      title: 'Sign out',
      icon: SignoutIcon,
      isIcon: true,
      isActive: false,
      link: '/signout',
      isMainMenu: true,
    }
  ]

  const [navItems, setNavItems] = useState(menuItems);
  const [parentMenu, setParentMenu] = useState(null);
  const [isMainMenu, setIsMainMenu] = useState(true)
  const [previousScreenName, setPreviousScreenName] = useState(null);
  const [currentMenuTitle, setCurrentMenuTitle] = useState('Main Menu');
  const [menuTitles, setMenuTitles] = useState(['Main Menu']);


  const handleItemClick = (item, parent) => {

    // Update the current menu to the clicked item's children
    if (item.children) {
      if (parent[0]?.isMainMenu) {
        setParentMenu(null)
        setCurrentMenuTitle("Main Menu");
        setPreviousScreenName(item.title);
      } else {
        setParentMenu(parent)
        setCurrentMenuTitle(previousScreenName);
        setPreviousScreenName(item.title);
      }
      setMenuTitles((prev => ([...prev, item.title])))
      setNavItems(item.children);
      setIsMainMenu(false)
    }

    // You can also store the clicked item in a separate state if needed
    // setClickedItem(item);
  };

  // const handleBackClick = () => {
  //   if (parentMenu && parentMenu?.length > 0) {
  //     setNavItems(parentMenu)
  //     setParentMenu(null)
  //     // setParentMenu(menuItems)
  //   } else {
  //     setNavItems(menuItems)
  //     setIsMainMenu(true)
  //   }
  // };

  const handleBackClick = () => {
    if (parentMenu && parentMenu?.length > 0) {
      setNavItems(parentMenu);
      setParentMenu(null);
      setCurrentMenuTitle(previousScreenName);
      setPreviousScreenName(menuItems.find(item => item.children === parentMenu)?.title || 'Main Menu');
    } else {
      setNavItems(menuItems);
      setIsMainMenu(true);
      setCurrentMenuTitle('Main Menu');
      setPreviousScreenName(null);
    }
    setMenuTitles((prev) => prev.slice(0, -1));
  };

  const handleClose = () => {
    setNavItems(menuItems);
    setParentMenu(null);
    setIsMainMenu(true)
    setPreviousScreenName(null);
    setCurrentMenuTitle('Main Menu');
    setMenuTitles(['Main Menu']);
    onClose()
  }


  if (!open) return null;

  return (
    <div className="sidebar_background" >

      <div className="outerarea" onClick={handleClose} />

      <div className='main-sidebar-wrapper' onBlur={handleClose} tabIndex={1}>
        <div className="header">
          {isMainMenu ?
            <div className="backbtn" >
              {/* <CustomTypography content={parentMenu?.length > 0 ? parentMenu[0].title : 'Main Menu'} color='BLACK' size='MEDIUM' weight='MEDIUM' /> */}
              <CustomTypography content={'Main Menu'} color='BLACK' size='MEDIUM' weight='MEDIUM' />
            </div>
            :
            <div className="backbtn" onClick={handleBackClick}>
              <ArrowLeft />
              {/* <CustomTypography content={parentMenu?.length > 0 ? parentMenu[0].title : 'Main Menu'} color='BLACK' size='MEDIUM' weight='MEDIUM' /> */}
              {/* <CustomTypography content={"Back"} color='BLACK' size='MEDIUM' weight='MEDIUM' /> */}
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
            navItems?.map((item, index) => (
              <div className="item" key={index} onClick={() => handleItemClick(item, navItems)}>
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

                  <CustomTypography content={item.title} color='BLACK' size='MEDIUM' weight='MEDIUM' />
                </div>

                <Image src={KeyArrowRight} alt='arrow' width={24} height={24} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MainSidebar