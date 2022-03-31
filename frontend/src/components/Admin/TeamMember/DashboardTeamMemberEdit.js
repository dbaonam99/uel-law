import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 

export default function DashboardTeamMemberEdit(props) {

    const createForm = useRef(); 
    const [file, setFile] = useState([])  
    const [teamMemberAvt, setTeamMemberAvt] = useState("")
    const [teamMemberName, setTeamMemberName] = useState("")
    const [teamMemberTitle, setTeamMemberTitle] = useState("") 
    const [teamMemberFacebook, setTeamMemberFacebook] = useState("") 
    const [teamMemberInsta, setTeamMemberInsta] = useState("") 
    const [teamMemberGmail, setTeamMemberGmail] = useState("")  
    const [id, setId] = useState("") 
    const [boxLoading, setBoxLoading] = useState(false) 
    
    const team = props.team
    useEffect(()=> {
        if (team) {  
            setId(team._id)
            setTeamMemberAvt(team.teamMemberAvt)
            setTeamMemberName(team.teamMemberName)
            setTeamMemberTitle(team.teamMemberTitle)
            setTeamMemberFacebook(team.teamMemberFacebook)
            setTeamMemberInsta(team.teamMemberInsta)
            setTeamMemberGmail(team.teamMemberGmail)
        }
    },[team])  

    const onSubmit = (event) => {
        event.preventDefault()  
        setBoxLoading(true)
        if (file.length > 0) {
            let formData = new FormData(); 
            formData.append("file", file); 
            formData.append("upload_preset", "dbaonam");
            axios.post("https://api.cloudinary.com/v1_1/dzoxlskiz/image/upload", formData)
            .then((res) => {  
                axios.put('https://uel-law.herokuapp.com/team', { 
                    id: id,
                    teamMemberAvt: res.data.url,
                    teamMemberName: teamMemberName,
                    teamMemberTitle: teamMemberTitle,
                    teamMemberFacebook: teamMemberFacebook,
                    teamMemberInsta: teamMemberInsta,
                    teamMemberGmail: teamMemberGmail
                })
                .then(()=>{
                    props.setCloseEditFunc(false);
                    props.setToastFunc(true);
                    setBoxLoading(false)
                })  
            })  
        } else {
            axios.put('https://uel-law.herokuapp.com/team', { 
                id: id,
                teamMemberAvt: teamMemberAvt,
                teamMemberName: teamMemberName,
                teamMemberTitle: teamMemberTitle,
                teamMemberFacebook: teamMemberFacebook,
                teamMemberInsta: teamMemberInsta,
                teamMemberGmail: teamMemberGmail
            })
            .then(()=>{
                props.setCloseEditFunc(false);
                props.setToastFunc(true);
                setBoxLoading(false)
            })
        }  
    }  

    return (
        <div className="DashboardProductInfo">
            <div className="create-box"> 
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Chỉnh sửa
                    </div>
                    <div  
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Ảnh </div>
                        <div className="dashboard-right">
                            <input 
                                onChange={(event) => {
                                    const files = event.target.files; 
                                    setTeamMemberAvt(URL.createObjectURL(files[0]))  
                                    setFile(files[0]) 
                                }}
                                type="file" 
                                className="input-file"
                                multiple="multiple"  
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}> 
                                {
                                    teamMemberAvt !== "" &&
                                    <div className="create-box-img">
                                        <img src={teamMemberAvt} alt=""></img> 
                                    </div> 
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tên</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setTeamMemberName(event.target.value)
                                }} 
                                value={teamMemberName}
                            required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Chức vụ</div>
                        <div className="dashboard-right"> 
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setTeamMemberTitle(event.target.value)
                                }} 
                                value={teamMemberTitle}
                            required></input>
                        </div>
                    </div> 
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Facebook</div>
                        <div className="dashboard-right"> 
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setTeamMemberFacebook(event.target.value)
                                }} 
                                value={teamMemberFacebook}
                            required></input>
                        </div>
                    </div> 
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Insta</div>
                        <div className="dashboard-right"> 
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setTeamMemberInsta(event.target.value)
                                }} 
                                value={teamMemberInsta}
                            required></input>
                        </div>
                    </div> 
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Gmail</div>
                        <div className="dashboard-right"> 
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setTeamMemberGmail(event.target.value)
                                }} 
                                value={teamMemberGmail}
                            required></input>
                        </div>
                    </div> 
                    <div className="admin-btn modal-btn">
                        <button className="admin-btn-box">
                            { !boxLoading && <p>Chỉnh sửa</p> }
                            { boxLoading && <div className="action-loading-icon"></div> }
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    )
}