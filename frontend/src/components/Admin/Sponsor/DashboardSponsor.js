import React from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import DashboardSponsorTable from './DashboardSponsorTable'

export default function DashboardSponsor(props) {

    return (
        <div className="dashboard-product">
            <div className={props.toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                Cập nhật thành công
            </div>
            <DashboardSponsorTable
                setOpenCreateFunc = {props.setOpenCreateFunc}
                setCloseCreateFunc = {props.setCloseCreateFunc}
                setOpenEditFunc = {props.setOpenEditFunc}
                setCloseEditFunc = {props.setCloseEditFunc}
                isChange = {props.isChange}
            />
        </div>
    )
}