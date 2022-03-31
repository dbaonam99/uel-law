import Header from '../components/Layout/Header';  
import NewsLetter from '../components/Layout/NewsLetter'; 
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2'; 
import axios from 'axios'; 
import Blog from '../components/Home/Blog'; 
import LibraryItemBody from '../components/Library/LibraryItemBody';
import LoadingPage2 from '../components/LoadingPage2';

export default function LibraryItem(props) {

    const [library, setLibrary] = useState(null)  
    const [home, setHome] = useState([])
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        window.scrollTo(0,0)
        document.body.style.overflow = 'hidden';
        axios.get(`https://uel-law.herokuapp.com/library/${props.location.pathname.split("/")[4]}`)
        .then((res)=>{
            setLibrary(res.data) 
            setLoading(false) 
            document.body.style.overflow = 'unset'; 
        }) 
        axios.get('https://uel-law.herokuapp.com/home')
        .then((res)=>{
            setHome(res.data[0]) 
        }) 
        axios.get('https://uel-law.herokuapp.com/news')
        .then((res)=>{
            setNews(res.data) 
        })
    },[props.location.pathname])   
    
    return (
        <div className="Newsfeed">
            <LoadingPage2
                loading={loading}
            />
            <Header/>
            <BannerV2/>  
            { library &&
                <LibraryItemBody
                    library={library}
                />
            } 
            {
                library && home &&
                <Blog
                    home={home}
                    news={news}
                />
            }
            <NewsLetter/>
            <Footer/>
        </div>
    )
}