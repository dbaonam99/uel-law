import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 
import DashboardEditor from './DashboardEditor'
import { ChangeToSlug } from '../../../Func.js'

export default function DashboardNewsCreate(props) {

    const createForm = useRef(); 
    const [file, setFile] = useState([])  
    const [border, setBorder] = useState(false) 
    const [newsTitle, setNewsTitle] = useState("")
    const [newsBanner, setNewsBanner] = useState("") 
    const [newsCate, setNewsCate] = useState("")  
    const [newCateLibrary, setNewCateLibrary] = useState("")  
    const [newsCateList, setNewsCateList] = useState([])
    const [newsContent, setNewsContent] = useState({
        "type" : "paragraph",
        "data" : {
            "text" : "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
        }
    })
    const [boxLoading, setBoxLoading] = useState(false)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/news`)
        .then((res)=>{
            const libCateArr = []
            for (let i in res.data) {
                libCateArr.push(res.data[i].newsCate)
            }
            var unique = libCateArr.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            }) 
            setNewsCateList(unique) 
        })
    }, []) 

    const onSubmit = (event) => {
        event.preventDefault()
        setBoxLoading(true)
        if (newsCate==="") {
            alert("Hãy điền đủ thông tin!")
            return
        }  
        let formData = new FormData(); 
        formData.append("file", file); 
        formData.append("upload_preset", "dbaonam");
        axios.post("https://api.cloudinary.com/v1_1/dzoxlskiz/image/upload", formData)
        .then((res) => {     
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/news`, {
                newsBanner: res.data.url,
                newsTitle: newsTitle,
                newsDate: new Date(),
                newsCate: newsCate,
                newsUrl: ChangeToSlug(newsTitle)
            })
            .then((res)=>{ 
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}/news/content`, {
                    id: res.data,
                    newsContent: newsContent
                })
                .then(()=>{
                    props.setCloseCreateFunc(false);
                    props.setToastFunc(true);
                    setBoxLoading(false)
                })
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
                        <div className="dashboard-left flex">Ảnh bìa </div>
                        <div className="dashboard-right">
                            <input 
                                onChange={(event) => {
                                    const files = event.target.files; 
                                    setNewsBanner(URL.createObjectURL(files[0]))  
                                    setFile(files[0]) 
                                }}
                                type="file" 
                                className="input-file"
                                multiple="multiple" 
                                required
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}> 
                                {
                                    newsBanner !== "" &&
                                    <div className="sponsor-box-img">
                                        <img src={newsBanner} alt=""></img> 
                                    </div> 
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tiêu đề</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setNewsTitle(event.target.value)
                                }} 
                                value={newsTitle}
                            required></input>
                        </div>
                    </div> 
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Category</div>
                        <div className="dashboard-right flex-center">
                            <select style={{ width: "350px"}} 
                                onChange={(event) => {setNewsCate(event.target.value)}}
                                value={newsCate}
                                className="input"
                            >
                                <option></option>
                                { newsCateList.length > 0 &&
                                    newsCateList.map((item, index) => {
                                        return(
                                            <option key={index}>{item}</option>
                                        )
                                    })
                                }
                            </select> 
                            <input 
                                type="text"
                                className="input"
                                placeholder="Category mới" 
                                style={{  margin:'0 10px'}}  
                                onChange={(event)=>{
                                    setNewCateLibrary(event.target.value)
                                }}
                                value={newCateLibrary}
                            ></input>
                            <div 
                                className="admin-btn modal-btn" 
                                style={{width: 'max-content'}}
                                onClick={()=>{ 
                                    setNewsCateList(newsCateList => [...newsCateList, newCateLibrary])
                                    setNewCateLibrary("")
                                    setNewsCate(newCateLibrary)
                                }} 
                            >
                                <div className="admin-btn-box" style={{fontSize: '11px'}}>Thêm</div>
                            </div> 
                        </div>
                    </div>
                    
                    <div 
                        className={border ? "border_editor editor-box" : "editor-box"} 
                        onClick={()=>{
                            setBorder(true)
                        }}
                    > 
                        { newsContent &&
                            <DashboardEditor
                                data = {newsContent}
                                setContent={setNewsContent}
                            />
                        }
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