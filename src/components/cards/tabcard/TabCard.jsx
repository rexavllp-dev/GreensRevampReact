import React from 'react'
import './TabCard.scss'

const TabCard = ({ id, title, count, isActive, setSelectedTab }) => {
    return (
        <div className={isActive ? "tab-card active cursor-pointer" : "tab-card pt-2 cursor-pointer"} onClick={() => setSelectedTab(id)}>
            {
                isActive &&  <div className="topborder"></div>
            }
            <div className={isActive ? "count active" : "count"}>
                <p>{count}</p>
            </div>
            <p className={isActive ? "title active" : "title "}>{title}</p>
        </div>
    )
}

export default TabCard