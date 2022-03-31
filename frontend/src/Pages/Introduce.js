import Header from '../components/Layout/Header';  
import NewsLetter from '../components/Layout/NewsLetter'; 
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2';
import IntroduceBody from '../components/Introduce/IntroduceBody';
import axios from 'axios';
import LoadingPage2 from '../components/LoadingPage2';

export default function Introduce() {

    const [introduceList, setIntroduceList] = useState([]) 
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        window.scrollTo(0,0)
        axios.get('https://uel-law.herokuapp.com/introduce')
        .then((res)=>{
            setIntroduceList(res.data) 
            setLoading(false) 
            document.body.style.overflow = 'unset';  
        }) 
    },[])

    return (
        <div className="Introduce">
            <LoadingPage2
                loading={loading}
            />
            <Header/>
            <BannerV2/>   
            <IntroduceBody
                introduceList={introduceList}
            /> 
            <NewsLetter/>
            <Footer/>
        </div>
    )
}