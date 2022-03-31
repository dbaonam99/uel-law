import { faCheckCircle, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'  

export default function DashboardHomeTitle(props) {  

    const [toast, setToast] = useState(false)
    const [homeSponsor, setHomeSponsor] = useState("")
    const [homeTeamMemberTitle, setHomeTeamMemberTitle] = useState("")
    const [homeTeamMemberText, setHomeTeamMemberText] = useState("")

    const [id, setId] = useState("")
    const [homeBlog, setHomeBlog] = useState("")
    const [homeContactTitle, setHomeContactTitle] = useState("")
    const [homeContactAddress, setHomeContactAddress] = useState("")
    const [homeContactEmail, setHomeContactEmail] = useState("")
    const [homeContactPhone, setHomeContactPhone] = useState("")
    const [boxLoading, setBoxLoading] = useState(false)

    const home = props.home   

    useEffect(()=>{ 
        if (home) {
            setId(home._id)
            setHomeSponsor(home.homeSponsor)  
            setHomeTeamMemberTitle(home.homeTeamMemberTitle)
            setHomeTeamMemberText(home.homeTeamMemberText)
            setHomeBlog(home.homeBlog)
            setHomeContactTitle(home.homeContactTitle)
            setHomeContactAddress(home.homeContactAddress)
            setHomeContactEmail(home.homeContactEmail)
            setHomeContactPhone(home.homeContactPhone)
        }
    }, [home])


    const onSubmit = (event) => {
        event.preventDefault()  
        setBoxLoading(true)
        axios.put('https://uel-law.herokuapp.com/home', {
            id: id,
            homeSponsor: homeSponsor,
            homeTeamMemberTitle: homeTeamMemberTitle,
            homeTeamMemberText: homeTeamMemberText,
            homeBlog: homeBlog,
            homeContactTitle: homeContactTitle,
            homeContactAddress: homeContactAddress,
            homeContactEmail: homeContactEmail,
            homeContactPhone: homeContactPhone
        })
        .then(()=>{ 
            setBoxLoading(false)
            setToast(true)
            setTimeout(()=>{
                setToast(false)
            }, 2000) 
        }) 
    }  

    return (
        <div className="topfive flex-col" style={{width: '100%'}}>
            <div className={`headerbox flex-center green`}>
                <FontAwesomeIcon icon={faTag} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Tiêu đề các mục</p>
                </div>
                <div className="topfive-content flex"> 
                    <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                        Sửa ảnh bìa thành công
                    </div>
                    {
                        home &&
                        <form className="title-list" onSubmit={onSubmit}>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Nhà tài trợ</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeSponsor(event.target.value)
                                                }}
                                                className="input"
                                                value={homeSponsor || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Thành viên team</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeTeamMemberTitle(event.target.value)
                                                }}
                                                className="input"
                                                value={homeTeamMemberTitle || ""}
                                            ></input> 
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeTeamMemberText(event.target.value)
                                                }}
                                                className="input"
                                                value={homeTeamMemberText || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Tin tức</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeBlog(event.target.value)
                                                }}
                                                className="input"
                                                value={homeBlog || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Liên hệ</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeContactTitle(event.target.value)
                                                }}
                                                className="input"
                                                value={homeContactTitle || ""}
                                            ></input> 
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeContactAddress(event.target.value)
                                                }}
                                                className="input"
                                                value={homeContactAddress || ""}
                                            ></input> 
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeContactPhone(event.target.value)
                                                }}
                                                className="input"
                                                value={homeContactPhone || ""}
                                            ></input> 
                                            <input 
                                                onChange={(event)=>{
                                                    setHomeContactEmail(event.target.value)
                                                }}
                                                className="input"
                                                value={homeContactEmail || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div> 
                            <div className="admin-btn">
                                <button className="admin-btn-box">
                                    { !boxLoading && <p>Lưu</p> }
                                    { boxLoading && <div className="action-loading-icon"></div> }
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}