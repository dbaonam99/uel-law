import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 

export default function DashboardSponsorCreate(props) {

    const createForm = useRef(); 
    const [file, setFile] = useState([])  
    const [sponsorImg, setSponsorImg] = useState("")
    const [sponsorName, setSponsorName] = useState("")
    const [sponsorDes, setSponsorDes] = useState("")  
    const [boxLoading, setBoxLoading] = useState(false) 

    const onSubmit = (event) => {
        event.preventDefault()  
        setBoxLoading(true)
        if (file.length > 0) {
            let formData = new FormData(); 
            formData.append("file", file); 
            formData.append("upload_preset", "dbaonam");
            axios.post("https://api.cloudinary.com/v1_1/dzoxlskiz/image/upload", formData)
            .then((res) => {  
                axios.post('https://uel-law.herokuapp.com/sponsor', { 
                    sponsorImg: res.data.url,
                    sponsorName: sponsorName,
                    sponsorDes: sponsorDes
                })
                .then(()=>{
                    props.setCloseCreateFunc(false);
                    props.setToastFunc(true);
                    setBoxLoading(false)
                })  
            }) 
        } else {
            axios.post('https://uel-law.herokuapp.com/sponsor', { 
                sponsorImg: sponsorImg,
                sponsorName: sponsorName,
                sponsorDes: sponsorDes
            })
            .then(()=>{
                props.setCloseCreateFunc(false);
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
                        <div className="dashboard-left flex">Logo </div>
                        <div className="dashboard-right">
                            <input 
                                onChange={(event) => {
                                    const files = event.target.files; 
                                    setSponsorImg(URL.createObjectURL(files[0]))  
                                    setFile(files[0]) 
                                }}
                                type="file" 
                                className="input-file"
                                multiple="multiple" 
                                required
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}> 
                                {
                                    sponsorImg !== "" &&
                                    <div className="sponsor-box-img">
                                        <img src={sponsorImg} alt=""></img> 
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
                                    setSponsorName(event.target.value)
                                }} 
                                value={sponsorName}
                            required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Mô tả</div>
                        <div className="dashboard-right"> 
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setSponsorDes(event.target.value)
                                }} 
                                value={sponsorDes}
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