import AdminCard from '@/components/cards/admincard/AdminCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import './ProductsTab.scss'

export default function ProductsTab() {

  const productsTabRoutes = [
    
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
      id:9,
      name: 'Reviews',
      url: '/admin/products/review',
    },
    {
      id:10,
      name: 'Bulk Purchase Requests',
      url: '/admin/bulk',
    }

  ];

  return (
    <div className="products-tab-wrapper">
      <BreadCrumbs />
      <div className="title">
        <CustomTypography content={"Products"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
      </div>
      <div className="products-tab">
        {
          productsTabRoutes.map((route) => {
            return (
              <AdminCard title={route.name} url={route.url} key={route.id} />
            )
          })
        }
      </div>
    </div>
  )
}