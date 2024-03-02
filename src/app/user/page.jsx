import AdminCard from '@/components/cards/admincard/AdminCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import './UserDashboard.scss'
import UserCard from '@/components/cards/usercard/UserCard';
import { FaHistory, FaHeart, FaUser, FaMapMarker, FaLeaf, FaGift, FaStar, FaBell } from 'react-icons/fa';

export default function UserDashboard() {

  const dashboardItems = [
    {
      id: 1,
      name: 'Purchase History',
      url: '/user/purchase-history',
      icon: <FaHistory />,
    },
    {
      id: 2,
      name: 'Wishlist',
      url: '/wishlist',
      icon: <FaHeart />,
    },
    {
      id: 3,
      name: 'Account Information',
      url: '/user/account',
      icon: <FaUser />,
    },
    {
      id: 4,
      name: 'Your Addresses',
      url: '/user/address',
      icon: <FaMapMarker />,
    },
    {
      id: 5,
      name: 'Greens Rewards',
      url: '/greens-rewards',
      icon: <FaLeaf />,
    },
    {
      id: 6,
      name: 'Gift Cards',
      url: '/giftcards',
      icon: <FaGift />,
    },
    {
      id: 7,
      name: 'My Reviews',
      url: '/reviews',
      icon: <FaStar />,
    },
    {
      id: 8,
      name: 'Notified Products',
      url: '/user/notified-products',
      icon: <FaBell />,
    }
];

  return (
    <div className="user_dashboard">
      <div className="title">
        <CustomTypography content={"Welcome to your dashboard"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
      </div>
      <div className="user_tab">
        {
          dashboardItems.map((route) => {
            return (
              <UserCard title={route.name} url={route.url} key={route.id} icon={route.icon} />
            )
          })
        }
      </div>
    </div>
  )
}