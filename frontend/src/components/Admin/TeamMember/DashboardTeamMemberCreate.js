import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 

export default function DashboardTeamMemberCreate(props) {

    const createForm = useRef(); 
    const [file, setFile] = useState([])  
    const [teamMemberAvt, setTeamMemberAvt] = useState("")
    const [teamMemberName, setTeamMemberName] = useState("")
    const [teamMemberTitle, setTeamMemberTitle] = useState("") 
    const [teamMemberFacebook, setTeamMemberFacebook] = useState("") 
    const [teamMemberInsta, setTeamMemberInsta] = useState("") 
    const [teamMemberGmail, setTeamMemberGmail] = useState("")  
    const [boxLoading, setBoxLoading] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()
        setBoxLoading(true) 
        let formData = new FormData(); 
        formData.append("file", file); 
        formData.append("upload_preset", "dbaonam");
        axios.post("https://api.cloudinary.com/v1_1/dzoxlskiz/image/upload", formData)
        .then((res) => {  
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/team`, { 
                teamMemberAvt: res.data.url,
                teamMemberName: teamMemberName,
                teamMemberTitle: teamMemberTitle,
                teamMemberFacebook: teamMemberFacebook,
                teamMemberInsta: teamMemberInsta,
                teamMemberGmail: teamMemberGmail
            })
            .then(()=>{
                props.setCloseCreateFunc(false);
                props.setToastFunc(true);
                setBoxLoading(false)
            })  
        }) 
    }  

    return (
        <div className="DashboardProductInfo">
            <div className="create-box"> 
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Thêm mới
                    </div>
                    <div  
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseCreateFunc(false);
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
                                required
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
                            { !boxLoading && <p>Thêm mới</p> }
                            { boxLoading && <div className="action-loading-icon"></div> }
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    )
}