import axios from 'axios'
import React, { useEffect, useState } from 'react' 
import '../../../Styles/AdminLayout.css'
import DashboardAboutUs from './DashboardAboutUs'  
import DashboardHomeTitle from './DashboardHomeTitle'

export default function DashboardHome(props) { 

    const [home, setHome] = useState({}) 
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/home`)
        .then((res)=>{
            setHome(res.data[0])
        }) 
        window.scrollTo(0,0)  
    }, []) 

    return (
        <div>
            {
                home &&
                <DashboardAboutUs
                    home={home}
                /> 
            }
            {
                home &&
                <DashboardHomeTitle
                    home={home}
                />
            }
        </div>
    )
}