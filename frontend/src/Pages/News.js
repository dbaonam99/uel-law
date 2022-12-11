import Header from '../components/Layout/Header';  
import NewsLetter from '../components/Layout/NewsLetter'; 
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2'; 
import axios from 'axios';
import NewsBody from '../components/Newsfeed/NewsBody';
import Blog from '../components/Home/Blog';
import LoadingPage2 from '../components/LoadingPage2';

export default function News(props) {

    const [news, setNews] = useState(null) 
    const [newsList, setNewsList] = useState([]) 
    const [home, setHome] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        window.scrollTo(0,0)
        document.body.style.overflow = 'hidden';
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/news/${props.location.pathname.split("/")[3]}`)
        .then((res)=>{
            setNews(res.data)  
            setLoading(false) 
            document.body.style.overflow = 'unset'; 
        }) 
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/home`)
        .then((res)=>{
            setHome(res.data[0]) 
        })
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/news`)
        .then((res)=>{
            setNewsList(res.data) 
        })
    },[props.location.pathname]) 

    return (
        <div className="Newsfeed">
            <LoadingPage2
                loading={loading}
            />
            <Header/>
            <BannerV2/>  
            { news &&
                <NewsBody
                    news={news}
                />
            } 
            {
                news && home &&
                <Blog
                    home={home}
                    news={newsList}
                />
            }
            <NewsLetter/>
            <Footer/>
        </div>
    )
}