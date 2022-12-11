import Header from '../components/Layout/Header';  
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';
import BannerV2 from '../components/Layout/BannerV2';
import ContactBody from '../components/Contact/ContactBody';
import '../App.css'; 
import axios from 'axios';
import LoadingPage2 from '../components/LoadingPage2'

export default function Contact() {
 
    const [home, setHome] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        window.scrollTo(0,0)  
        document.body.style.overflow = 'hidden';
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/home`)
        .then((res)=>{
            setHome(res.data[0])  
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
            <ContactBody
                home={home}
            /> 
            <Footer/>
        </div>
    )
}