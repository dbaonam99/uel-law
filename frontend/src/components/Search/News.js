import { faCalendarAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../../Styles/Home.css' 
import '../../Styles/Library.css' 
import { ChangeToSlug } from '../../Func.js'

function News(props) {  

    const news = props.news 
    const [dayText, setDayText] = useState("")

    useEffect(()=>{
        if (news) {
            const monthNames = [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ];   
            const date = new Date(news.newsDate)
            const day = date.getDate()
            const monthNumber = date.getMonth()
            const month = monthNames[monthNumber] 
            const year = date.getFullYear() 
            setDayText(`${day} ${month}, ${year}`)
        }
    }, [news])
    const location = props.location.pathname.split("/")[1]

    const redirect = (url, id, cate) => {   
        props.history.push(`/ban-tin/${ChangeToSlug(cate)}/${url}-${id}`) 
    }

    return (
        <div className="blog-item newsfeed-news search-news">
            { news &&
                <div className={location === "ban-tin" ? "blog-img newsfeed-img" : "blog-img"}>
                    <div 
                        className="blog-img-overlay flex-center"
                        onClick={()=>{
                            redirect(news.newsUrl, news._id, news.newsCate)
                        }}>
                        <div className="blog-img-overlay-item flex-center">
                            <FontAwesomeIcon icon={faEye} className="icon"/>
                        </div>
                    </div>
                    <img src={news.newsBanner} alt=""></img>
                </div>
            }
            { news &&
                <div className="blog-item-bottom flex-col">
                    <div className="blog-time flex">
                        <FontAwesomeIcon icon={faCalendarAlt} className="icon"/>
                        <p>{dayText}</p>
                    </div>
                    <div 
                        className="blog-title"
                        onClick={()=>{
                            redirect(news.newsUrl, news._id, news.newsCate)
                        }}
                    >{news.newsTitle}</div>
                    <div 
                        className="blog-viewmore"
                        onClick={()=>{
                            redirect(news.newsUrl, news._id, news.newsCate)
                        }}
                    >Xem thêm</div>
                </div>
            }
        </div> 
    )
}
export default withRouter(News)