import Header from '../components/Layout/Header';  
import NewsLetter from '../components/Layout/NewsLetter'; 
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2';
import SponsorBody from '../components/Sponsor/SponsorBody';
import axios from 'axios';
import LoadingPage2 from '../components/LoadingPage2';

export default function Sponsor() {

    const [sponsor, setSponsor] = useState([]) 
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        window.scrollTo(0,0)
        document.body.style.overflow = 'hidden';
        axios.get('https://uel-law.herokuapp.com/sponsor')
        .then((res)=>{
            setSponsor(res.data) 
            setLoading(false) 
            document.body.style.overflow = 'unset'; 
        })
    },[])

    return (
        <div className="Sponsor">
            <LoadingPage2
                loading={loading}
            />
            <Header/>
            <BannerV2/>   
            <SponsorBody
                sponsor={sponsor}
            /> 
            <NewsLetter/>
            <Footer/>
        </div>
    )
}