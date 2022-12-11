import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import {  useEffect, useRef, useState } from "react" 


export default function DashboardBannerItem(props) { 

    const createForm = useRef(null)
    const banner = props.banner
    const [bannerImg, setBannerImg] = useState("")
    const [bannerSmall, setBannerSmall] = useState("")
    const [bannerBig, setBannerBig] = useState("")
    const [bannerLink, setBannerLink] = useState("") 
    const [file, setFile] = useState(null)
    const [toast, setToast] = useState(false)
    const [boxLoading, setBoxLoading] = useState(false)

    useEffect(()=>{
        setBannerImg(banner.bannerImg)
        setBannerSmall(banner.bannerSmall)
        setBannerBig(banner.bannerBig)
        setBannerLink(banner.bannerLink)
    }, [banner])

    const onSubmit = (event) => {
        event.preventDefault()    
        setBoxLoading(true)
        if (file) {
            let imageForm = new FormData(); 
            imageForm.append("file", file); 
            imageForm.append("upload_preset", "dbaonam");
    
            axios.post("https://api.cloudinary.com/v1_1/dzoxlskiz/image/upload", imageForm)
            .then((res) => {  
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}/banner`, {
                    id: banner._id,
                    bannerImg: res.data.url,
                    bannerSmall: bannerSmall,
                    bannerBig: bannerBig,
                    bannerLink: bannerLink
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
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/banner`, {
                id: banner._id,
                bannerImg: bannerImg,
                bannerSmall: bannerSmall,
                bannerBig: bannerBig,
                bannerLink: bannerLink
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
        <div className="change-banner flex"> 
            <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                Sửa ảnh bìa thành công
            </div>
            <form 
                onSubmit={onSubmit} encType="multipart/form-data" 
                ref={createForm} 
                className="change-banner-left flex-col"
            >
                <input
                    type="file"
                    className="input-file"  
                    onChange={(event) => { 
                        setBannerImg(URL.createObjectURL(event.target.files[0]))
                        setFile(event.target.files[0]) 
                    }} 
                    name="productImg" 
                ></input>
                { banner.bannerAtHome === true &&
                    <div style={{width: '100%'}}>
                        <div className="change-banner-item flex"> 
                            <div className="change-banner-text-left flex-col">
                                <p>Dòng 1</p> 
                            </div>
                            <div className="change-banner-text-right flex-col">
                                <input 
                                    onChange={(event)=>{
                                        setBannerSmall(event.target.value)
                                    }}
                                    className="input"
                                    value={bannerSmall || ""}
                                ></input> 
                            </div> 
                        </div>  
                        <div className="change-banner-item flex"> 
                            <div className="change-banner-text-left flex-col">
                                <p>Dòng 2</p> 
                            </div>
                            <div className="change-banner-text-right flex-col">
                                <input 
                                    onChange={(event)=>{
                                        setBannerBig(event.target.value)
                                    }}
                                    className="input"
                                    value={bannerBig || ""}
                                ></input> 
                            </div> 
                        </div>  
                        <div className="change-banner-item flex"> 
                            <div className="change-banner-text-left flex-col">
                                <p>Link</p> 
                            </div>
                            <div className="change-banner-text-right flex-col">
                                <input 
                                    onChange={(event)=>{
                                        setBannerLink(event.target.value)
                                    }}
                                    className="input"
                                    value={bannerLink || ""}
                                ></input> 
                            </div> 
                        </div>  
                    </div>
                }
                <div className="admin-btn">
                    <button className="admin-btn-box">
                        { !boxLoading && <p>Lưu</p> }
                        { boxLoading && <div className="action-loading-icon"></div> }
                    </button>
                </div>
            </form>
            <div className="change-banner-right">
                <img src={bannerImg} alt=""></img>
            </div>
        </div>
    )
}