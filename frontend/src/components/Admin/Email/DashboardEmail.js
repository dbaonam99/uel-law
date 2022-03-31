import React, { useEffect, useState } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import DashboardEmailTable from './DashboardEmailTable'
import DashboardEmailInfo from './DashboardEmailInfo'
import axios from 'axios'

export default function DashboardEmail(props) {

    const [home, setHome] = useState({})

    useEffect(()=>{ 
        axios.get(`https://uel-law.herokuapp.com/home`)
        .then((res)=>{ 
            setHome(res.data[0]) 
        })
    }, []) 

    return (
        <div className="dashboard-product">
            <div className={props.toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                Cập nhật thành công
            </div>
            <DashboardEmailInfo
                setOpenCreateFunc = {props.setOpenCreateFunc}
                setCloseCreateFunc = {props.setCloseCreateFunc}
                setOpenEditFunc = {props.setOpenEditFunc}
                setCloseEditFunc = {props.setCloseEditFunc}
                isChange = {props.isChange}
                home = {home}
            />
            <DashboardEmailTable
                setOpenCreateFunc = {props.setOpenCreateFunc}
                setCloseCreateFunc = {props.setCloseCreateFunc}
                setOpenEditFunc = {props.setOpenEditFunc}
                setCloseEditFunc = {props.setCloseEditFunc}
                isChange = {props.isChange}
            />
        </div>
    )
}