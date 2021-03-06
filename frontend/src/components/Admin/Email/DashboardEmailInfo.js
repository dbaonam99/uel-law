import { faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'   
import DashboardEmailEditor from './DashboardEmailEdtitor';
import DashboardEmailNewsEditor from './DashboardEmailNewsEdtitor';

export default function DashboardHomeTitle(props) {  

    const [toast, setToast] = useState(false) 
    const [emailUser, setEmailUser] = useState("")
    const [emailPassword, setEmailPassword] = useState("")
    const [emailSubject, setEmailSubject] = useState("")
    const [emailText, setEmailText] = useState("")
    const [emailSubjectNews, setEmailSubjectNews] = useState("")
    const [emailTextNews, setEmailTextNews] = useState("")
    const [id, setId] = useState("")
    const home = props.home
    const [boxLoading, setBoxLoading] = useState(false)

    useEffect(()=>{ 
        if (home) { 
            setId(home._id)
            setEmailUser(home.emailUser)
            setEmailPassword(home.emailPassword)
            setEmailSubject(home.emailSubject)
            setEmailText(home.emailText)
            setEmailSubjectNews(home.emailSubjectNews)
            setEmailTextNews(home.emailTextNews)
        }
    }, [home])

    const onSubmit = (event) => {
        event.preventDefault() 
        setBoxLoading(true) 
        axios.put(`https://uel-law.herokuapp.com/home/${id}`, { 
            emailUser: emailUser,
            emailPassword: emailPassword,
            emailSubject: emailSubject,
            emailText: emailText,
            emailSubjectNews: emailSubjectNews,
            emailTextNews: emailTextNews,
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
            <div className={`headerbox flex-center orange`}>
                <FontAwesomeIcon icon={faUser} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Th??ng tin t??i kho???n email Admin</p>
                </div>
                <div className="topfive-content flex"> 
                    <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                        S???a th??nh c??ng
                    </div> 
                    {
                        home &&
                        <form className="title-list" onSubmit={onSubmit}> 
                            <div className="info-title">
                                <p>Khi c?? b??i ????ng m???i, website s??? d??ng t??i kho???n Email n??y ????? g???i tin cho c??c Email ????ng k?? nh???n tin</p> 
                            </div>   
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Email</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setEmailUser(event.target.value)
                                                }}
                                                type="text"
                                                className="input"
                                                value={emailUser || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Password</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setEmailPassword(event.target.value)
                                                }}
                                                type="password"
                                                className="input"
                                                value={emailPassword || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"  style={{marginTop: '50px'}}> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left" style={{width: '100%'}}>
                                            <p>N???i dung Email khi ng?????i d??ng v???a ????ng k?? nh???n tin</p> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Subject</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setEmailSubject(event.target.value)
                                                }}
                                                type="text"
                                                className="input"
                                                value={emailSubject || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>N???i dung</p> 
                                        </div>
                                        <div className="change-banner-text-right change-banner-text-right-email flex-col">
                                            <DashboardEmailEditor
                                                content={home.emailText}
                                                setAboutUsContent={setEmailText}
                                            />
                                        </div> 
                                    </div>  
                                </div>
                            </div><div className="title-item"  style={{marginTop: '50px'}}> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left" style={{width: '100%'}}>
                                            <p>N???i dung Email khi c?? b??i ????ng m???i</p> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>Subject</p> 
                                        </div>
                                        <div className="change-banner-text-right flex-col">
                                            <input 
                                                onChange={(event)=>{
                                                    setEmailSubjectNews(event.target.value)
                                                }}
                                                type="text"
                                                className="input"
                                                value={emailSubjectNews || ""}
                                            ></input> 
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                            <div className="title-item"> 
                                <div style={{width: '100%'}}>
                                    <div className="change-banner-item flex"> 
                                        <div className="change-banner-text-left flex-col">
                                            <p>N???i dung</p> 
                                        </div>
                                        <div className="change-banner-text-right change-banner-text-right-email flex-col">
                                            <DashboardEmailNewsEditor
                                                content={home.emailTextNews}
                                                setAboutUsContent={setEmailTextNews}
                                            />
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="admin-btn">
                                <button className="admin-btn-box">
                                    { !boxLoading && <p>L??u</p> }
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