import AdminCard from '@/components/cards/admincard/AdminCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import './UserDashboard.scss'
import UserCard from '@/components/cards/usercard/UserCard';

export default function UserDashboard() {

  const dashboardItems = [
    {
      id: 1,
      name: 'Catalog',
      url: '/admin/catalogue',
    },
    {
      id: 2,
      name: 'Stock',
      url: '/admin/stock',
    },
    {
      id: 3,
      name: 'Categories',
      url: '/admin/products/categories',
    },
    {
      id: 4,
      name: 'Attributes',
      url: '/admin/attributes',
    },
    {
      id: 5,
      name: 'Attribute Sets',
      url: '/admin/attribute-sets',
    },
    {
      id: 6,
      name: 'Brands',
      url: '/admin/products/brands',
    },
    {
      id: 7,
      name: 'Tags',
      url: '/admin/products/tags',
    },
    {
      id: 8,
      name: 'Options',
      url: '/admin/options',
    },
    {
      id:9,
      name: 'Reviews',
      url: '/admin/reviews',
    },
    {
      id:10,
      name: 'Bulk',
      url: '/admin/bulk',
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