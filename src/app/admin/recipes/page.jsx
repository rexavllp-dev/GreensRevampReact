import AdminCard from '@/components/cards/admincard/AdminCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import './Recipes.scss'

export default function Recipes() {

    const recipeRoutes = [
        {
            id: 1,
            name: 'Category',
            url: '/admin/recipes/category',
        },
        {
            id: 4,
            name: 'Recipe List',
            url: '/admin/recipes/list',
        }
    ];

    return (
        <div className="recipe-settings-wrapper">
            <BreadCrumbs />
            <div className="title">
                <CustomTypography content={"Advanced Settings"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>
            <div className="recipe-settings">
                {
                    recipeRoutes.map((route) => {
                        return (
                            <AdminCard title={route.name} url={route.url} key={route.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}