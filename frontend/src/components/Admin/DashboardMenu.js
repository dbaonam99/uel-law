import React, { useEffect, useState } from 'react'
import '../../App.css'
import '../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

export default function DashboardMenu(props) {

    const [openUserOpt, setOpenUserOpt] = useState(100)
    const [hideText, setHideText] = useState(false)  

    const clickToShowChildMenu = (child) => { 
        if (openUserOpt === child) {
            setOpenUserOpt(100)
        } else {
            setOpenUserOpt(child)
        }
    } 

    const menuItems = props.menuItems;
    const openMenu = props.openMenu;
    const openMenuMobile = props.openMenuMobile;

    useEffect(()=> { 
        if (openMenu === false) setHideText(true)
        if (openMenu === true) setHideText(false)
    }, [setHideText, openMenu])  
 
    return (
        <div 
            className={classNames("DashboardMenu flex", {
                DashboardMenu_small: !openMenu,
                DashboardMenu_mobile: !openMenuMobile
            })}>
            <div className="db-menu-overlay"></div>
            <div className="db-menu">
                <div className="db-menu-logo flex-center">
                    <div className="db-menu-logo-img flex-center">
                        <img 
                            alt="" 
                            src="https://res.cloudinary.com/dzoxlskiz/image/upload/v1611930344/law/logo_n9rzix.png"   
                            style={{height: '100%', width: '100%'}}
                        ></img> 
                    </div>
                </div>   
                <div className={hideText ? "opa hidden logo-text-box flex-center" : "logo-text-box flex-center"}>
                    <p className="logo-text">Young Lawyers Journal</p>
                </div>     
                <div className="menu-line"></div>
                <div 
                    className="db-menu-user"
                >
                    <div 
                        className="flex-center"
                        style={{paddingRight: '10px'}}
                        onClick={()=>{
                            clickToShowChildMenu(99)
                        }}
                        >
                        <div className="db-menu-avt flex-center">
                            <img alt="" src="https://uel-law.herokuapp.com/images/230dd66fba72ccf5926f7221c3b20973"></img>
                        </div>
                        { hideText === false &&  
                            <p className="db-menu-name" style={{marginLeft: '20px'}}> 
                                Admin
                            </p> 
                        }
                        { hideText === false && openUserOpt === 99 && <FontAwesomeIcon icon={faAngleUp} style={{fontSize: '18px'}}/>}
                        { hideText === false && openUserOpt !== 99 && <FontAwesomeIcon icon={faAngleDown} style={{fontSize: '18px'}}/>}
                    </div>
                    <div className={openUserOpt === 99 ? "db-menu-user-opt closeOpt" : "db-menu-user-opt"}> 
                        <div 
                            className="db-menu-top flex-center" 
                            onClick={()=> {
                                localStorage.removeItem('user-id')
                                localStorage.removeItem('token');
                                sessionStorage.removeItem('chat-id')
                                window.location.reload(false);
                            }}
                        >
                            <div className="db-menu-top-icon flex-center">
                                <p>ĐX</p>
                            </div>
                            <p className="db-menu-name">đăng xuất</p>
                        </div>
                    </div>
                </div>
                <div className="menu-line"></div>
                <div className="db-menu-listitem">
                    {
                        menuItems.map((item, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="db-menu-item"
                                    onClick={() => {
                                        if (!item.child) { 
                                            props.setTabIdOnClick(item.id);
                                            props.setCloseCreateFunc(false);
                                            props.setCloseEditFunc(false);
                                            if (window.innerWidth <= 1110) {
                                                props.setOpenMenuOnClick()
                                            }
                                        }
                                    }}
                                >
                                    <div 
                                        className={classNames("db-menu-top flex", {
                                            db_menu_active: props.tabId === item.id,
                                            db_menu_active_blur: item.child && props.tabId.split(".")[0] === item.id,
                                            db_menu_top_parent: item.child
                                        })}
                                        onClick={()=>{
                                            clickToShowChildMenu(index)
                                        }}
                                    >
                                        <div className="db-menu-top-icon flex-center">
                                            <FontAwesomeIcon icon={item.icon} style={{fontSize: '22px'}} className="icon"/>
                                        </div>
                                        {   
                                            hideText === false &&
                                            <p className="db-menu-name">{item.name}</p>
                                        }
                                        { item.child && hideText === false && openUserOpt === index && <FontAwesomeIcon icon={faAngleUp} style={{fontSize: '18px'}}/>}
                                        { item.child && hideText === false && openUserOpt !== index && <FontAwesomeIcon icon={faAngleDown} style={{fontSize: '18px'}}/>}
                                    </div>
                                    { item.child &&
                                        <div 
                                            key={index}
                                            className={openUserOpt === index ? "db-menu-user-opt closeOpt" : "db-menu-user-opt"}
                                            style={{height: `${openUserOpt === index ? item.child.length * 40 + item.child.length * 10 : 0}px`}}
                                        >
                                            {
                                                item.child.map((item2, index) => {
                                                    let textArr = item2.name.split(" ")
                                                    let text = ""
                                                    for (let i in textArr) {
                                                        text += textArr[i].substr(0,1)
                                                    } 
                                                    return (
                                                        <div 
                                                            onClick={()=>{ 
                                                                props.setTabIdOnClick(item.child[index].id);
                                                                props.setCloseCreateFunc(false);
                                                                props.setCloseEditFunc(false);
                                                                if (window.innerWidth <= 1110) {
                                                                    props.setOpenMenuOnClick()
                                                                } 
                                                            }}
                                                            key={index}
                                                            className={props.tabId === item2.id ?"db_menu_active db-menu-top flex-center" : "db-menu-top flex-center"}>
                                                            <div className="db-menu-top-icon flex-center">
                                                                <p>{text}</p>
                                                            </div>
                                                            <p className="db-menu-name">{item2.name}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}