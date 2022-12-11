import Header from '../components/Layout/Header';  
import NewsLetter from '../components/Layout/NewsLetter'; 
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2';
import NewsfeedBody from '../components/Newsfeed/NewsfeedBody';
import axios from 'axios';
import LoadingPage2 from '../components/LoadingPage2';

export default function Newsfeed() {

    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        window.scrollTo(0,0)
        document.body.style.overflow = 'hidden';  
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/news`)
        .then((res)=>{
            setNews(res.data)  
            setLoading(false)  
            document.body.style.overflow = 'unset';  
        })   
    },[]) 

    return (
        <div className="Newsfeed">
            <LoadingPage2
                loading={loading}
            />
            <Header/>
            <BannerV2/>  
            <NewsfeedBody
                news={news}
            />
            <NewsLetter/>
            <Footer/>
        </div>
    )
}