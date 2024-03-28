"use client";

import React, { useEffect } from 'react'
import './Toolbar.scss'
import MainSidebar from '@/components/sidebar/main_sidebar/MainSidebar'
import { getAllMenus } from "@/services/features/menuSlice";
import { useDispatch } from 'react-redux';

const Toolbar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [routeModule, setRouteModule] = React.useState('');
    const dispatch = useDispatch();
    const [allmenu, setAllmenus] = React.useState();

    useEffect(() => {
        dispatch(getAllMenus({})).then((response) => {
            if (response.payload?.success) {
                setAllmenus(response.payload.result);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        <>
            <div className='toolbar'>
                {
                    allmenu?.map((value) => {

                        return (<p className='itemlabel' onClick={() => {
                            //setIsSidebarOpen(true);
                            //setRouteModule(''+value.menu_url+'');
                        }}>{value.menu_name}</p>)

                    })
                }
            </div>
            <MainSidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} routeModule={routeModule} />
        </>
    )
}

export default Toolbar