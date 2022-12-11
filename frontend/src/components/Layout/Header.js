import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons' 
import '../../Styles/Header.css' 
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import logo from '../../assets/logo.png'
import axios from 'axios'
import { ChangeToSlug } from '../../Func.js'
import Search from './Search'
import Bar from './Bar'
import Menu from './Menu'

function Header(props) {

    const [openSearch, setOpenSearch] = useState(false)
    const [openBar, setOpenBar] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [isDown, setIsDown] = useState(false) 
    const [introduceList, setIntroduceList] = useState([])
    const [archiveList, setArchiveList] = useState([])
    const [libraryGroupList, setLibraryGroupList] = useState([])

    const location = props.location.pathname.split("/")[1]
    const locationSub = props.location.pathname.split("/")[2]
    const [hoverOnFirstJoin, setHoverOnFirstJoin] = useState(false)

    useEffect(()=> { 
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/introduce`)
        .then((res)=>{
            setIntroduceList(res.data)
        })
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/archive`)
        .then((res)=>{
            setArchiveList(res.data)
        })
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/library`)
        .then((res)=>{
            const libGroupArr = []
            for (let i in res.data) {
                libGroupArr.push(res.data[i].libraryGroup)
            }
            var unique = libGroupArr.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            })
            setLibraryGroupList(unique)
        })
        function onScroll() { 
            if(window.pageYOffset < 200) { // top  
                setIsDown(false)
            } else {
                setIsDown(true) 
            }
            this.prev = window.pageYOffset;
        }
        window.addEventListener("scroll", onScroll);
        return() => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []) 

    const linkTo = (link) => {
        if (props.location.pathname === `/${link}`) {
            window.scrollTo(0,0)
        } else {
            props.history.push(`/${link}`)
        }
    }  

    return (
        <div 
            className={isDown ? "HeaderWhite Header flex" : "Header flex"}
            onMouseMove={()=>{
                setHoverOnFirstJoin(true) 
            }}>
            <Search
                setOpenSearch={setOpenSearch}
                openSearch={openSearch}
            />
            <Bar
                setOpenBar={setOpenBar}
                openBar={openBar}
            />
            <Menu
                setOpenMenu={setOpenMenu}
                openMenu={openMenu}
            />
            <div 
                className={!hoverOnFirstJoin ? "header-left flex nohover" : "header-left flex"} 
            >
                <div 
                    className="logo flex-center"
                    onClick={()=>{
                        linkTo("home")
                    }}
                >
                    <img src={logo} alt=""></img> 
                </div>
                <div className="navbar flex"> 
                    <div 
                        className={location === "" || location === "home" ? "navbar-item flex-center navbar-active" : "navbar-item flex-center"}
                        onClick={()=>{
                            linkTo("home")
                        }} 
                    >trang chủ</div>
                    <div className={location === "gioi-thieu" ? "navbar-item flex-center navbar-active" : "navbar-item flex-center"}>
                        giới thiệu
                        <div className="navbar-item-sub">
                            { introduceList &&
                                introduceList.map((item, index)=>{
                                    return ( 
                                        <div 
                                            key={index}
                                            className={locationSub === item.introduceUrl ? "navbar-item-sub-item navbar-item-sub-item-active" : "navbar-item-sub-item"}
                                            onClick={()=>{
                                                linkTo(`gioi-thieu/${item.introduceUrl}`)
                                            }}
                                        >
                                            <p>{item.introduceName}</p>
                                        </div> 
                                    )
                                }) 
                            } 
                        </div>
                    </div>
                    <div 
                        className={location === "ban-tin" ? "navbar-item flex-center navbar-active" : "navbar-item flex-center"}
                        onClick={()=>{
                            linkTo("ban-tin")
                        }}
                    >bản tin</div>
                    <div 
                        className={location === "thu-vien" ? "navbar-item flex-center navbar-active" : "navbar-item flex-center"}
                        >
                        thư viện
                        <div className="navbar-item-sub"> 
                            { libraryGroupList &&
                                libraryGroupList.map((item, index) => {
                                    const slugText = ChangeToSlug(item)
                                    return (
                                        <div 
                                            key={index}
                                            className={locationSub === slugText ? "navbar-item-sub-item navbar-item-sub-item-active" : "navbar-item-sub-item"}
                                            onClick={()=>{
                                                linkTo(`thu-vien/${slugText}`)
                                            }}
                                        >
                                            <p>{item}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> 
                    <div 
                        className={location === "luu-tru" ? "navbar-item flex-center navbar-active" : "navbar-item flex-center"}
                        >
                        lưu trữ
                        <div className="navbar-item-sub"> 
                            { archiveList &&
                                archiveList.map((item, index) => {
                                    return (
                                        <div 
                                            key={index} 
                                            className="navbar-item-sub-item"
                                            onClick={(event)=>{   
                                                axios.put(`${process.env.REACT_APP_API_ENDPOINT}/archive`, {
                                                    id: item._id,
                                                    archiveView: 1
                                                })
                                                window.open(`${item.archiveLink}`,'_blank')
                                            }}
                                        >
                                            <p style={{pointerEvents: 'none'}}>{item.archiveName}</p>
                                        </div>
                                    )
                                }) 
                            } 
                        </div>
                    </div>
                    <div 
                        className={location === "nha-tai-tro" ? "navbar-item flex-center navbar-active" : "navbar-item flex-center"}
                        onClick={()=>{
                            linkTo("nha-tai-tro")
                        }}
                    >nhà tài trợ</div>
                    <div 
                        className={location === "lien-he" ? "navbar-item flex-center navbar-active" : "navbar-item flex-center"}
                        onClick={()=>{
                            linkTo("lien-he")
                        }}
                    >liên hệ</div>
                </div>
            </div>
            <div className="header-right">
                <div 
                    className="header-right-item flex-center btn-search"
                    onClick={()=>{
                        document.body.style.overflow = 'hidden'
                        setOpenSearch(true)
                    }}
                >  
                    <FontAwesomeIcon icon={faSearch} className="icon"/>
                </div>
                <div 
                    className="header-right-item flex-center btn-sidebar"
                    onClick={()=>{
                        document.body.style.overflow = 'hidden'
                        setOpenBar(true)
                    }}
                >
                    <FontAwesomeIcon icon={faBars} className="icon"/>
                </div>
                <div 
                    className="mobile_icon header-right-item flex-center btn-sidebar"
                    onClick={()=>{
                        document.body.style.overflow = 'hidden'
                        setOpenMenu(true) 
                    }}
                >
                    <FontAwesomeIcon icon={faBars} className="icon"/>
                </div>
                <div 
                    className="mobile_icon header-right-item flex-center btn-sidebar"
                    onClick={()=>{
                        document.body.style.overflow = 'hidden'
                        setOpenBar(true)
                    }}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="icon"/>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Header)