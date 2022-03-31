import { useEffect, useState } from 'react'
import '../../Styles/Banner.css' 
import '../../Styles/Animation.css' 
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function Banner() {

    const [tab, setTab] = useState(0)
    const [bannerList, setBannerList] = useState([]) 
    
    useEffect(()=>{ 
        const slide = setInterval(()=>{
            setTab(tab => tab+1)
        }, 7000)
        return (() => {
            clearInterval(slide)
        })
    },[tab])

    useEffect(()=>{
        axios.get(`https://uel-law.herokuapp.com/banner`)
        .then((res)=>{
            setBannerList(res.data)
        })
    },[]) 

    if (tab >= 3) {
        setTab(0)
    }   
    
    let bg = ""
    if (bannerList.length > 0) { 
        if (tab === 0) {
            bg = bannerList[0].bannerImg
        }
        if (tab === 1) {
            bg = bannerList[1].bannerImg
        } 
        if (tab === 2) {
            bg = bannerList[2].bannerImg
        }
    }

    return (
        <div className="Banner" style={{backgroundImage: `url(${bg})`}}>  
            {
                bannerList.map((item, index) => {
                    return (
                        <div 
                            style={{backgroundImage: `url(${item.bannerImg})`}}
                            key={index} 
                            className={classNames('banner-item flex-col flex-center', {
                                banner_item_active: tab === index,
                                banner_item2: tab === 1,
                                banner_item3: tab === 2,
                            })}
                        >
                            <div className="overlay">
                                <div 
                                    className="banner-btn left flex-center"
                                    onClick={()=>{
                                        if (tab > 0) setTab(tab=>tab-1)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className="icon"/>
                                </div>
                                <div 
                                    className="banner-btn right flex-center"
                                    onClick={()=>{
                                        if (tab < 3) setTab(tab=>tab+1)
                                    }}>
                                    <FontAwesomeIcon icon={faChevronRight} className="icon"/>
                                </div>
                            </div>
                            <div  
                                className={classNames('banner-item-small', {  
                                    banner_item_small_active: tab === index,
                                    fadeInDown: tab === index
                                })}
                            >{item.bannerSmall}</div>
                            <div    
                                className={classNames('banner-item-big', { 
                                    banner_item_big_active: tab === index,
                                    fadeInUp: tab === index, 
                                    banner_item_big1: tab === 0,
                                    banner_item_big2: tab === 1,
                                    banner_item_big3: tab === 2,
                                })}
                            >{item.bannerBig}</div>
                            <div   
                                className={classNames('banner-item-btn lib-transform flex-center', { 
                                    fadeInUp: tab === 0,
                                    fadeInLeft: tab === 1,
                                    fadeInRight: tab === 2,
                                    banner_item_btn2: tab === 1,
                                    banner_item_btn3: tab === 2,
                                })}
                            >
                                <div className="lib-readmore flex-center">
                                    <p>Đọc thêm</p>
                                </div>
                            </div>
                        </div>  
                    )
                })
            } 
        </div> 
    )
}