import { faAngleDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import '../../App.css'
import '../../Styles/Search.css' 
import classNames from 'classnames' 
import { ChangeToSlug } from '../../Func'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

function Menu(props) {  

    const [closeAnimation, setCloseAnimation] = useState(false)  
    const [searchFocus, setSearchFocus] = useState(false)  
    const location = props.location.pathname.split("/")[1]
    const locationSub = props.location.pathname.split("/")[2]
    const [introduceList, setIntroduceList] = useState([])
    const [archiveList, setArchiveList] = useState([])
    const [libraryGroupList, setLibraryGroupList] = useState([])
    const [dropDown, setDropDown] = useState("")


    const linkTo = (link) => {
        if (props.location.pathname === `/${link}`) {
            window.scrollTo(0,0)
        } else {
            props.history.push(`/${link}`)
        }
        document.body.style.overflow = 'unset'
    }  

    useEffect(()=> { 
        setDropDown(location)
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
    }, [location]) 

    const [searchValue, setSearchValue] = useState("")
    const onSubmit = (event) => {
        props.history.push(`/search/${searchValue}`)
        document.body.style.overflow = 'unset'
    }

    return (
        <div className={props.openMenu ? "menu-container show-bar flex" : "menu-container"}>
            <div className={classNames('Menu', {
                show_menu: props.openMenu, 
                close_menu: closeAnimation
            })}>   
                <div className="menu-box"> 
                    <form 
                        style={{marginBottom: '10px'}}
                        onSubmit={onSubmit} 
                        className={searchFocus ? "widget-row widget-search flex searchFocus-widget-search" : "widget-row widget-search flex"}>
                        <input 
                            className="widget-input" placeholder="Tìm kiếm..."
                            onChange={(event)=>{
                                setSearchValue(event.target.value)
                            }}
                            onFocus={() => {
                                setSearchFocus(true)
                            }}
                            onBlur={() => {
                                setSearchFocus(false)
                            }}
                        ></input>
                        <button className={searchFocus ? "widget-btn searchFocus-btn" : "widget-btn"}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </form>
                    <div className="navbar-menu flex"> 
                        <div 
                            className={location === "" ? "navbar-menu-item flex-center navbar-menu-active" : "navbar-menu-item flex-center"}
                            onClick={()=>{
                                linkTo("home")
                            }} 
                        >
                            <div className="navbar-menu-item-top flex">
                                <p className="navbar-menu-item-title">trang chủ</p> 
                            </div>
                        </div>
                        <div 
                            className="navbar-menu-item flex-center"
                            onClick={()=>{ 
                                if (dropDown !== "gioi-thieu") {
                                    setDropDown("gioi-thieu")
                                } else {
                                    setDropDown("")
                                }
                            }}
                        >
                            <div className="navbar-menu-item-top flex">
                                <p className="navbar-menu-item-title">giới thiệu</p>
                                <div className="flex-center">
                                    <FontAwesomeIcon icon={faAngleDown}/>
                                </div>
                            </div>
                            <div 
                                className="navbar-menu-item-sub"
                                style=
                                    {{
                                        height: `${dropDown === "gioi-thieu" || (location === "gioi-thieu" && dropDown === "gioi-thieu") 
                                            ? introduceList.length * 46 + introduceList.length * 10 
                                            : 0}px`
                                    }}
                            >
                                { introduceList &&
                                    introduceList.map((item, index)=>{ 
                                        return (  
                                            <div 
                                                key={index} 
                                                className={locationSub === item.introduceUrl ? "navbar-menu-item-top navbar-menu-active flex" :"navbar-menu-item-top flex"}
                                                onClick={()=>{
                                                    linkTo(`gioi-thieu/${item.introduceUrl}`)
                                                }}
                                            >
                                                <p className="navbar-menu-item-title">{item.introduceName}</p> 
                                            </div>
                                        )
                                    }) 
                                } 
                            </div>
                        </div>
                        <div 
                            className={location === "ban-tin" ? "navbar-menu-item flex-center navbar-menu-active" : "navbar-menu-item flex-center"}
                            onClick={()=>{
                                linkTo("ban-tin")
                            }}
                        >
                            <div className="navbar-menu-item-top flex">
                                <p className="navbar-menu-item-title">bản tin</p> 
                            </div>
                        </div>
                        <div 
                            className="navbar-menu-item flex-center"
                            onClick={()=>{ 
                                if (dropDown !== "thu-vien") {
                                    setDropDown("thu-vien")
                                } else {
                                    setDropDown("")
                                }
                            }}
                        >
                            <div className="navbar-menu-item-top flex">
                                <p className="navbar-menu-item-title">thư viện</p>
                                <div className="flex-center">
                                    <FontAwesomeIcon icon={faAngleDown}/>
                                </div>
                            </div>
                            <div 
                                className="navbar-menu-item-sub"
                                style=
                                    {{
                                        height: `${dropDown === "thu-vien" || (location === "thu-vien" && dropDown === "thu-vien") 
                                            ? libraryGroupList.length * 46 + libraryGroupList.length * 10 
                                            : 0}px`
                                    }}
                            >
                                { libraryGroupList &&
                                    libraryGroupList.map((item, index) => {
                                        const slugText = ChangeToSlug(item)
                                        return (
                                            <div 
                                                key={index}
                                                className={locationSub === slugText ? "navbar-menu-item-top navbar-menu-active flex" :"navbar-menu-item-top flex"} 
                                                onClick={()=>{
                                                    linkTo(`thu-vien/${slugText}`)
                                                }}
                                            >
                                                <p className="navbar-menu-item-title">{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> 
                        <div 
                            className={location === "luu-tru" ? "navbar-menu-item flex-center navbar-menu-active" : "navbar-menu-item flex-center"}
                            onClick={()=>{ 
                                if (dropDown !== "luu-tru") {
                                    setDropDown("luu-tru")
                                } else {
                                    setDropDown("")
                                }
                            }}
                            >
                            <div className="navbar-menu-item-top flex">
                                <p className="navbar-menu-item-title">lưu trữ</p> 
                                <div className="flex-center">
                                    <FontAwesomeIcon icon={faAngleDown}/>
                                </div>
                            </div>
                            <div 
                                className="navbar-menu-item-sub"
                                style=
                                    {{
                                        height: `${dropDown === "luu-tru" || (location === "luu-tru" && dropDown === "luu-tru") 
                                            ? archiveList.length * 46 + archiveList.length * 10 
                                            : 0}px`
                                    }}
                            >
                                { archiveList &&
                                    archiveList.map((item, index) => {
                                        return (
                                            <div 
                                                key={index} 
                                                onClick={()=>{   
                                                    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/archive`, {
                                                        id: item._id,
                                                        archiveView: 1
                                                    })
                                                    window.open(`${item.archiveLink}`,'_blank')
                                                }} 
                                                className={locationSub === "luu-tru" ? "navbar-menu-item-top navbar-menu-active flex" :"navbar-menu-item-top flex"} 
                                            >
                                                <p className="navbar-menu-item-title" style={{pointerEvents: 'none'}}>{item.archiveName}</p>
                                            </div>
                                        )
                                    }) 
                                } 
                            </div>
                        </div>
                        <div 
                            className={location === "nha-tai-tro" ? "navbar-menu-item flex-center navbar-menu-active" : "navbar-menu-item flex-center"}
                            onClick={()=>{
                                linkTo("nha-tai-tro")
                            }}
                        >
                            <div className="navbar-menu-item-top flex">
                                <p className="navbar-menu-item-title">nhà tài trợ</p>
                            </div>
                        </div>
                        <div 
                            className={location === "lien-he" ? "navbar-menu-item flex-center navbar-menu-active" : "navbar-menu-item flex-center"}
                            onClick={()=>{
                                linkTo("lien-he")
                            }}
                        > 
                            <div className="navbar-menu-item-top flex">
                                <p className="navbar-menu-item-title">liên hệ</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className="close-menu-box close-box flex-center"
                    onClick={()=>{
                        setTimeout(()=>{
                            props.setOpenMenu(false)
                        }, 100)
                        setCloseAnimation(true)
                        setTimeout(()=>{
                            setCloseAnimation(false)
                        }, 500)
                        document.body.style.overflow = 'unset'
                    }}
                >
                    <FontAwesomeIcon icon={faTimes} className="icon" style={{color: '#000'}}/>
                </div> 
            </div>
            <div 
                className="close-bar-box"
                onClick={()=>{
                    setTimeout(()=>{
                        props.setOpenMenu(false)
                    }, 100)
                    setCloseAnimation(true)
                    setTimeout(()=>{
                        setCloseAnimation(false)
                    }, 500)
                    document.body.style.overflow = 'unset'
                }}
            ></div>
        </div>
    )
}
export default withRouter(Menu)