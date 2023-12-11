"use client";

import React from 'react'
import './Toolbar.scss'
import MainSidebar from '@/components/sidebar/main_sidebar/MainSidebar'

const Toolbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [routeModule, setRouteModule] = React.useState('');
    return (
        <>
            <div className='toolbar'>
                <p className='itemlabel' onClick={() => {
                    setIsSidebarOpen(true);
                    setRouteModule('ingredients');
                }}>Ingredients</p>
                <p className='itemlabel' onClick={() => {
                    setIsSidebarOpen(true);
                    setRouteModule('cakes');
                }}>Cake Decorations</p>
                <p className='itemlabel'>Baking Supplies</p>
                <p className='itemlabel'>Chocolate</p>
                <p className='itemlabel'>Ho. Re. Ca.</p>
                <p className='itemlabel'>Seasonal</p>
                <p className='itemlabel'>New</p>
                <p className='itemlabel bold' style={{ color: "#C92B2D" }}>Sale</p>
                <p className='itemlabel'>Catalogue</p>
                <p className='itemlabel'>Recipes</p>
                <p className='itemlabel'>Gift Cards</p>
            </div>
            <MainSidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} routeModule={routeModule} />
        </>
    )
}

export default Toolbar