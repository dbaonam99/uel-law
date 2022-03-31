import Header from '../components/Layout/Header';  
import NewsLetter from '../components/Layout/NewsLetter'; 
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2';
import SearchBody from '../components/Search/SearchBody';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import LoadingPage2 from '../components/LoadingPage2';

function Search(props) {

    const [news, setNews] = useState([])
    const [library, setLibrary] = useState([])
    const searchValue = props.location.pathname.split("/")[2] 
    const [loading, setLoading] = useState(true)
 
    useEffect(()=>{
        window.scrollTo(0,0) 
        document.body.style.overflow = 'hidden';  
        axios.get('https://uel-law.herokuapp.com/library')
        .then((res)=>{
            const constLibrary = res.data
            const search = []
            for (let i in constLibrary) {
                if ((constLibrary[i].libraryTitle).toLowerCase().includes(searchValue)) {
                    search.push(constLibrary[i])
                }
            } 
            setLibrary(search)
        }) 
        axios.get('https://uel-law.herokuapp.com/news')
        .then((res)=>{
            const constNews = res.data
            const search = []
            for (let i in constNews) {
                if ((constNews[i].newsTitle).toLowerCase().includes(searchValue)) {
                    search.push(constNews[i])
                }
            }  
            setNews(search)
            setLoading(false)  
            document.body.style.overflow = 'unset';  
        }) 
    },[searchValue])

    return (
        <div className="Newsfeed"> 
            <LoadingPage2
                loading={loading}
            />
            <Header/>
            <BannerV2/>  
            <SearchBody
                news={news}
                library={library}
            />
            <NewsLetter/>
            <Footer/>
        </div>
    )
}
export default withRouter(Search)