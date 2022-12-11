import { useEffect, useState } from "react"
import { faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import '../../Styles/Newsfeed.css'
import { withRouter } from 'react-router-dom'
import axios from "axios"
import { ChangeToSlug } from '../../Func.js'

function Widget(props) {  

    const [searchFocus, setSearchFocus] = useState(false)  
    const [cateList, setCateList] = useState([])
    const [data, setData] = useState([])

    useEffect(()=>{ 
            axios.get(`${process.env.REACT_APP_API_ENDPOINT}/news`)
            .then((res)=>{
                const resData = res.data
                //Get all category
                const cate = Object.values(resData.reduce((a, {newsCate}) => {
                    a[newsCate] = a[newsCate] || {newsCate, count: 0};
                    a[newsCate].count++;
                    return a;
                }, Object.create(null))); 
                //Sort and splice category by posts count 
                cate.sort((a,b) =>  b.count - a.count)
                const splicedCate = cate.splice(0,5);
                splicedCate.sort((a, b) => b.count - a.count);  
                setCateList(splicedCate) 
                setData(res.data.reverse().splice(0,3))
            })  
    }, [])    
    
    const redirect = (url, id, cate) => {   
        props.history.push(`/ban-tin/${ChangeToSlug(cate)}/${url}-${id}`) 
    }

    return (
        <div className="newsfeed-right">
            <div className={searchFocus ? "widget-row widget-search flex searchFocus-widget-search" : "widget-row widget-search flex"}>
                <input 
                    className="widget-input" placeholder="Tìm kiếm..."
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
            </div>
            <div className="widget-row">
                <div className="widget-title">
                    Categories
                </div>
                <ul className="widget-cates">
                    { cateList &&
                        cateList.map((item, index) => {
                            return (
                                <li 
                                    key={index} 
                                    className="flex"
                                    onClick={()=>{
                                        props.history.push(`/ban-tin/${ChangeToSlug(item.newsCate)}`)
                                    }}
                                >
                                    <p>{item.newsCate.toLowerCase()}</p>
                                    <p>{item.count}</p>
                                </li>
                            )
                        })
                    } 
                </ul> 
            </div>
            <div className="widget-row">
                <div className="widget-title">
                    Bài đăng gần đây
                </div>
                <ul className="widget-post">
                    { data &&
                        data.map((item, index) => {
                            const monthNames = [
                                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                            ];
                            const date = new Date(item.newsDate)
                            const day = date.getDate()
                            const monthNumber = date.getMonth()
                            const month = monthNames[monthNumber] 
                            const year = date.getFullYear() 
                            let dayText = `${day} ${month}, ${year}`
                            return (
                                <li 
                                    key={index} className="widget-post-item flex"
                                    onClick={()=>{
                                        redirect(item.newsUrl, item._id, item.newsCate)
                                    }}
                                >
                                    <img src={item.newsBanner || ""} alt=""></img>
                                    <div className="widget-post-info flex-col">
                                        <div className="widget-post-title">{item.newsTitle}</div>
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
            </div>
            {/* <div className="widget-row">
                <div className="widget-title">
                    Tags
                </div>
                <div className="widget-tags flex">
                    <div className="widget-tag-item">Applin</div>
                    <div className="widget-tag-item">Business</div>
                    <div className="widget-tag-item">Cloud</div>
                    <div className="widget-tag-item">Hosting</div>
                    <div className="widget-tag-item">Life</div>
                    <div className="widget-tag-item">Life style</div>
                    <div className="widget-tag-item">Techniq</div>
                </div> 
            </div> */}
        </div>
    )
}
export default withRouter(Widget)