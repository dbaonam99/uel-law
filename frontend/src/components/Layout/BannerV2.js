import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ChangeToSlug } from '../../Func'
import '../../Styles/Banner.css' 

function BannerV2(props) {  

    const [banner, setBanner] = useState("")
    const [title, setTitle] = useState("") 
    const [title2, setTitle2] = useState("") 

    useEffect(()=>{
        let location = props.location.pathname.split("/")[1];
        let location2 = props.location.pathname.split("/")[2];
        const headerTitle = [
            "trang chủ",
            "giới thiệu",
            "bản tin",
            "thư viện",
            "nhà tài trợ",
            "liên hệ"
        ] 
        if (location === "gioi-thieu") { 
            axios.get(`${process.env.REACT_APP_API_ENDPOINT}/introduce`)
            .then((res)=>{ 
                for (let i in res.data) {
                    if (res.data[i].introduceUrl === location2) {
                        setTitle(res.data[i].introduceName)
                    } 
                } 
            })
        } else if (location === "thu-vien") {
            setTitle("thư viện")
            axios.get(`${process.env.REACT_APP_API_ENDPOINT}/library`)
            .then((res)=>{ 
                const libGroupArr = []
                for (let i in res.data) {
                    libGroupArr.push(res.data[i].libraryGroup)
                }
                var unique = libGroupArr.filter(function(elem, index, self) {
                    return index === self.indexOf(elem);
                }) 
                for (let i in unique) {
                    if (ChangeToSlug(unique[i]) === location2) {
                        setTitle2(unique[i])
                    }
                }
            })
        } else if (location === "search") {
            setTitle("Tìm kiếm") 
            setTitle2(location2)
        } else {
            for (let i in headerTitle) { 
                if (ChangeToSlug(headerTitle[i]) === location) {
                    setTitle(headerTitle[i])
                }
            }
        }
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/banner`)
        .then((res)=>{
            for (let i in res.data) { 
                if (res.data[i].bannerAtHome === false) {
                    setBanner(res.data[i])
                }
            }
        })
    },[props.location.pathname])  

    const redirect = (url) => {   
        props.history.push(url) 
    }

    return (
        <div 
            className="Banner BannerV2 flex-center flex-col" 
            style={{backgroundImage: `url(${banner.bannerImg})`}}
            onLoad={()=>{
                alert("c")
            }}
        >   
            <div className="banner-title">
                {title}
            </div>
            <div className="banner-breadcrumb flex">
                <p onClick={()=>{redirect("/")}}>Home</p>
                <FontAwesomeIcon icon={faChevronRight} className="icon"/>
                <p className={title2 ? "" : "banner-breadcrumb-active"}>{title}</p>
                { title2 &&
                    <FontAwesomeIcon icon={faChevronRight} className="icon"/>
                }
                { title2 &&
                    <p className="banner-breadcrumb-active">{title2}</p>
                }
            </div> 
        </div> 
    )
}
export default withRouter(BannerV2)