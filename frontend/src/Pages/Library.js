import Header from '../components/Layout/Header';  
import NewsLetter from '../components/Layout/NewsLetter'; 
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2';
import LibraryBody from '../components/Library/LibraryBody';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import LoadingPage2 from '../components/LoadingPage2';

function Library() {

    const [library, setLibrary] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{ 
        window.scrollTo(0,0)
        document.body.style.overflow = 'hidden';
        axios.get('https://uel-law.herokuapp.com/library')
        .then((res)=>{
            setLibrary(res.data) 
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
            <LibraryBody
                library={library}
            />
            <NewsLetter/>
            <Footer/>
        </div>
    )
}
export default withRouter(Library)