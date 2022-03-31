import React from 'react'
import '../../App.css'
import '../../Styles/Dashboard.css'
import { faEllipsisV, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 

export default function DashboardHeader(props) { 

    const openMenuOnClick = () => {
        props.setOpenMenuOnClick()
    }
    
    return (
        <div className="dashboard-header flex">
            <div className="flex-center">
                <div className="menu-opt flex-center"
                    onClick={openMenuOnClick}> 
                    { props.openMenu && <FontAwesomeIcon icon={faEllipsisV} className="icon"/>}
                    { props.openMenu === false && <FontAwesomeIcon icon={faListUl} className="icon"/>}
                </div>
                <p>{props.itemName}</p>
            </div>  
        </div>
    )
}