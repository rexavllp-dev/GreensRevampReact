import AdminCard from '@/components/cards/admincard/AdminCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import './UserDashboard.scss'
import UserCard from '@/components/cards/usercard/UserCard';

export default function UserDashboard() {

  const dashboardItems = [
    {
      id: 1,
      name: 'Purchase History',
      url: '/user/purchase-history',
    },
    {
      id: 2,
      name: 'Wishlist',
      url: '/wishlist',
    },
    {
      id: 3,
      name: 'Account Information',
      url: '/account-information',
    },
    {
      id: 4,
      name: 'Your Addresses',
      url: '/address',
    },
    {
      id: 5,
      name: 'Greens Rewards',
      url: '/greens-rewards',
    },
    {
      id: 6,
      name: 'Gift Cards',
      url: '/giftcards',
    },
    {
      id: 7,
      name: 'My Reviews',
      url: '/reviews',
    },
    {
      id: 8,
      name: 'Notified Products',
      url: '/notified-products',
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
              <UserCard title={route.name} url={route.url} key={route.id} />
            )
          })
        }
      </div>
    </div>
  )
}