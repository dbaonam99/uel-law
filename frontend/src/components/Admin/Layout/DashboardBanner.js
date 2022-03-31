import { faHome, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react' 
import '../../../Styles/AdminLayout.css'
import DashboardBannerItem from './DashboardBannerItem'

export default function DashboardBanner(props) { 

    const [bannerList, setBannerList] = useState([])
    
    useEffect(()=>{
        axios.get('https://uel-law.herokuapp.com/banner')
        .then((res)=>{
            setBannerList(res.data)
        })
        window.scrollTo(0,0)  
    }, [])

    return (
        <div>
            <div className="topfive flex-col" style={{width: '100%'}}>
                <div className={`headerbox flex-center ${props.color}`}>
                    <FontAwesomeIcon icon={faHome} className="icon"/>
                </div>
                <div className="top-location-container">
                    <div className="headerbox-header">
                        <p>Ảnh bìa trang home</p>
                    </div>
                    <div className="topfive-content topfive-content-banner flex-col"> 
                        {
                            bannerList.length > 0 &&
                            bannerList.map((item, index) => { 
                                if (item.bannerAtHome === true) {
                                    return (
                                        <DashboardBannerItem
                                            key={index}
                                            banner={item}
                                        />
                                    )
                                }
                                return true
                            })
                        } 
                    </div>
                </div>
            </div>
            <div className="topfive flex-col" style={{width: '100%'}}>
                <div className={`headerbox flex-center pink`}>
                    <FontAwesomeIcon icon={faImage} className="icon"/>
                </div>
                <div className="top-location-container">
                    <div className="headerbox-header">
                        <p>Ảnh bìa trang khác (giới thiệu, bản tin, thư viện,...)</p>
                    </div>
                    <div className="topfive-content topfive-content-banner flex-col"> 
                        {
                            bannerList.length > 0 &&
                            bannerList.map((item, index) => { 
                                if (item.bannerAtHome === false) {
                                    return (
                                        <DashboardBannerItem
                                            key={index}
                                            banner={item}
                                        />
                                    )
                                }
                                return true
                            })
                        } 
                    </div>
                </div>
            </div>
        </div>
    )
}