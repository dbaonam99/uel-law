import { faCheckCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'  
import DashboardEditor from '../DashboardEditor'

export default function DashboardAboutUs(props) {  

    const [border, setBorder] = useState(false)
    const createForm = useRef(null)  
    const [id, setId] = useState("")
    const [aboutUsTitle, setAboutUsTitle] = useState("")
    const [aboutUsImg, setAboutUsImg] = useState("")
    const [aboutUsContent, setAboutUsContent] = useState("") 
    const [file, setFile] = useState(null)
    const [toast, setToast] = useState(false)
    const [boxLoading, setBoxLoading] = useState(false)

    const home = props.home
    
    useEffect(()=>{
        if (home) {
            setId(home._id) 
            setAboutUsImg(home.homeAboutUsImg)
            setAboutUsTitle(home.homeAboutUsTitle)
            setAboutUsContent(home.homeAboutUsContent)
        } 
    }, [home])


    const onSubmit = (event) => {
        event.preventDefault() 
        setBoxLoading(true)
        if (file) {
            let formData = new FormData(); 
            formData.append("file", file); 
            formData.append("upload_preset", "dbaonam");
            axios.post("https://api.cloudinary.com/v1_1/dzoxlskiz/image/upload", formData)
            .then((res) => {  
                axios.post('https://uel-law.herokuapp.com/home', {
                    id: id,
                    homeAboutUsImg: res.data.url,
                    homeAboutUsTitle: aboutUsTitle,
                    homeAboutUsContent: aboutUsContent
                })
                .then(()=>{ 
                    setToast(true)
                    setTimeout(()=>{
                        setToast(false)
                    }, 2000) 
                    setBoxLoading(false)
                })  
            }) 
        } else {
            axios.post('https://uel-law.herokuapp.com/home', {
                id: id,
                homeAboutUsImg: aboutUsImg,
                homeAboutUsTitle: aboutUsTitle,
                homeAboutUsContent: aboutUsContent
            })
            .then(()=>{ 
                setToast(true)
                setTimeout(()=>{
                    setToast(false)
                }, 2000) 
                setBoxLoading(false)
            })  
        } 
    } 

    return (
        <div className="topfive flex-col" style={{width: '100%'}}>
            <div className={`headerbox flex-center orange`}>
                <FontAwesomeIcon icon={faUserFriends} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Về chúng tôi</p>
                </div>
                <div className="topfive-content topfive-content-banner flex"> 
                    <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                        Sửa ảnh bìa thành công
                    </div>
                    <form 
                        onSubmit={onSubmit} encType="multipart/form-data" 
                        ref={createForm} 
                        className="change-banner-left flex-col"
                        style={{width: '55%'}}
                    >
                        <input
                            type="file"
                            className="input-file"  
                            onChange={(event) => { 
                                setAboutUsImg(URL.createObjectURL(event.target.files[0]))
                                setFile(event.target.files[0]) 
                            }}  
                        ></input> 
                        <div style={{width: '100%'}}>
                            <div className="change-banner-item flex"> 
                                <div 
                                    className="change-banner-text-left flex-col"
                                    onClick={()=>{
                                        setBorder(false)
                                    }}
                                >
                                    <p>Tiêu đề</p> 
                                </div>
                                <div className="change-banner-text-right flex-col">
                                    <input 
                                        onClick={()=>{
                                            setBorder(false)
                                        }}
                                        onChange={(event)=>{
                                            setAboutUsTitle(event.target.value)
                                        }}
                                        className="input"
                                        value={aboutUsTitle || ""}
                                    ></input> 
                                </div> 
                            </div>  
                            <div className="change-banner-item flex"> 
                                <div 
                                    className="change-banner-text-left flex-col"
                                    onClick={()=>{
                                        setBorder(false)
                                    }}
                                >
                                    <p>Nội dung</p> 
                                </div>
                                <div 
                                    className={border ? "border_editor change-banner-text-right flex-col" : "change-banner-text-right flex-col"} 
                                    onClick={()=>{
                                        setBorder(true)
                                    }}
                                >
                                    {/* <textarea 
                                        onChange={(event)=>{
                                            setAboutUsContent(event.target.value)
                                        }}
                                        className="input"
                                        value={aboutUsContent || ""}
                                        // dangerouslySetInnerHTML={{__html: home.homeAboutUsContent}}
                                    ></textarea>  */}
                                    <DashboardEditor
                                        content={home.homeAboutUsContent}
                                        setAboutUsContent={setAboutUsContent}
                                    />
                                </div> 
                            </div>   
                        </div> 
                        <div 
                            className="admin-btn"
                            onClick={()=>{
                                setBorder(false)
                            }}
                        >
                            <button className="admin-btn-box">
                                { !boxLoading && <p>Lưu</p> }
                                { boxLoading && <div className="action-loading-icon"></div> }
                            </button>
                        </div>
                    </form>
                    <div 
                        className="change-banner-right"
                        style={{width: '45%', height: '450px'}}
                    >
                        <img src={aboutUsImg} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}