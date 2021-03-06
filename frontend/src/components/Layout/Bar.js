import { faCalendarAlt, faEnvelope, faHome, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import '../../App.css'
import '../../Styles/Search.css' 
import classNames from 'classnames'
import axios from 'axios'
import { ChangeToSlug } from '../../Func'
import { withRouter } from 'react-router-dom'

function Bar(props) {  

    const [closeAnimation, setCloseAnimation] = useState(false)  

    const [home, setHome] = useState({}) 
    const [news, setNews] = useState([]) 

    useEffect(()=>{ 
        axios.get('https://uel-law.herokuapp.com/home')
        .then((res)=>{
            setHome(res.data[0]) 
        }) 
        axios.get('https://uel-law.herokuapp.com/news')
        .then((res)=>{
            setNews(res.data.reverse().slice(0,3)) 
        }) 
    },[])

    const redirect = (url, id, cate) => {   
        setTimeout(()=>{
            props.setOpenBar(false)
        }, 300)
        setCloseAnimation(true)
        setTimeout(()=>{
            setCloseAnimation(false)
            props.history.push(`/ban-tin/${ChangeToSlug(cate)}/${url}-${id}`) 
        }, 500)
        document.body.style.overflow = 'unset'
    }

    return (
        <div className={props.openBar ? "bar-container show-bar flex" : "bar-container"}>
            <div 
                className="close-bar-box"
                onClick={()=>{
                    setTimeout(()=>{
                        props.setOpenBar(false)
                    }, 300)
                    setCloseAnimation(true)
                    setTimeout(()=>{
                        setCloseAnimation(false)
                    }, 500)
                    document.body.style.overflow = 'unset'
                }}
            ></div>
            <div className={classNames('Bar', {
                show_bar: props.openBar, 
                close_bar: closeAnimation
            })}>  
                <div 
                    className="close-box flex-center"
                    onClick={()=>{
                        setTimeout(()=>{
                            props.setOpenBar(false)
                        }, 300)
                        setCloseAnimation(true)
                        setTimeout(()=>{
                            setCloseAnimation(false)
                        }, 500)
                        document.body.style.overflow = 'unset'
                    }}
                >
                    <FontAwesomeIcon icon={faTimes} className="icon" style={{color: '#000'}}/>
                </div>  
                <div className="bar-box">
                    <div className="bar-box-title">
                        B???n tin g???n ????y
                    </div> 
                    <ul className="widget-post">
                        { news &&
                            news.map((item, index) => {
                                const monthNames = [
                                    "Th??ng 1", "Th??ng 2", "Th??ng 3", "Th??ng 4", "Th??ng 5", "Th??ng 6",
                                    "Th??ng 7", "Th??ng 8", "Th??ng 9", "Th??ng 10", "Th??ng 11", "Th??ng 12"
                                ];
                                const date = new Date(item.newsDate)
                                const day = date.getDate()
                                const monthNumber = date.getMonth()
                                const month = monthNames[monthNumber] 
                                const year = date.getFullYear() 
                                let dayText = `${day} ${month}, ${year}`
                                return (
                                    <li 
                                        key={index} className="widget-post-item bar-post-item flex"
                                        onClick={()=>{
                                            redirect(item.newsUrl, item._id, item.newsCate)
                                        }}
                                    >
                                        <img src={item.newsBanner || ""} alt=""></img>
                                        <div className="widget-post-info flex-col">
                                            <div className="widget-post-title">
                                                {item.newsTitle}
                                            </div>
                                            <div className="widget-post-date flex">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="icon"/>
                                                {dayText}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>  
                    <div className="bar-box-title">
                        Li??n h???
                    </div>
                    <div className="footer-contact-info" style={{margin: '0'}}>
                        <div className="footer-contact-item flex">
                            <FontAwesomeIcon icon={faPhone}/>
                            <p>{home.homeContactPhone}</p>
                        </div>
                        <div className="footer-contact-item flex">
                            <FontAwesomeIcon icon={faEnvelope}/>
                            <p>{home.homeContactEmail}</p>
                        </div>
                        <div className="footer-contact-item flex">
                            <FontAwesomeIcon icon={faHome}/>
                            <p>{home.homeContactAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Bar)