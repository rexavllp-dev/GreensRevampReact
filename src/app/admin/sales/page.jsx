import AdminCard from '@/components/cards/admincard/AdminCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import './Sales.scss'

export default function Sales() {

    const salesRoutes = [
        {
            id: 1,
            name: 'Orders',
            url: '/admin/orders',
        },
        {
            id: 2,
            name: 'Transactions',
            url: '/admin/sales/transactions',
        },
        {
            id: 2,
            name: 'Discounts',
            url: '/admin/sales/discounts',
        },
    ];

    return (
        <div className="sales-wrapper">
            <BreadCrumbs />
            <div className="title">
                <CustomTypography content={"Sales"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>
            <div className="sales">
                {
                    salesRoutes.map((route) => {
                        return (
                            <AdminCard title={route.name} url={route.url} key={route.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}