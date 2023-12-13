import AdminCard from '@/components/cards/admincard/AdminCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import './AdvancedSettings.scss'

export default function AdvancedSettings() {

    const advancedRoutes = [
        {
            id: 1,
            name: 'Pages',
            url: '/admin/pages',
        },
        // Media
        {
            id: 2,
            name: 'Media',
            url: '/admin/media',
        },
        {
            id: 3,
            name: 'Menu',
            url: '/admin/menu',
        },
        // Users
        {
            id: 4,
            name: 'Users',
            url: '/admin/advanced/users',
        },
        // Facebook Feed
        {
            id: 5,
            name: 'Facebook Feed',
            url: '/admin/facebook-feed',
        },
        // Localization
        {
            id: 6,
            name: 'Localization',
            url: '/admin/localization',
        },
        // Tools
        {
            id: 7,
            name: 'Tools',
            url: '/admin/tools',
        },
        // Reports
        {
            id: 8,
            name: 'Reports',
            url: '/admin/reports',
        },
        // Purchase Report
        {
            id: 9,
            name: 'Purchase Report',
            url: '/admin/reports/purchase',
        },
        // Payment Report
        {
            id: 10,
            name: 'Payment Report',
            url: '/admin/reports/payment',
        },
        // Brand Report
        {
            id: 11,
            name: 'Brand Report',
            url: '/admin/reports/brand',
        },
        // Settings
        {
            id: 12,
            name: 'Settings',
            url: '/admin/settings',
        },
        // Appearance
        {
            id: 13,
            name: 'Appearance',
            url: '/admin/appearance',
        },
    ];

    return (
        <div className="advanced-settings-wrapper">
            <BreadCrumbs />
            <div className="title">
                <CustomTypography content={"Advanced Settings"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>
            <div className="advanced-settings">
                {
                    advancedRoutes.map((route) => {
                        return (
                            <AdminCard title={route.name} url={route.url} key={route.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}