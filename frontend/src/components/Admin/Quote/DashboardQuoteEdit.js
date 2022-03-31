import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 

export default function DashboardQuoteEdit(props) {

    const createForm = useRef(); 
    const [file, setFile] = useState([])  
    const [quoteAvt, setQuoteAvt] = useState("")
    const [quoteName, setQuoteName] = useState("")
    const [quoteTitle, setQuoteTitle] = useState("")
    const [quoteContent, setQuoteContent] = useState("")
    const [id, setId] = useState("")
    const [boxLoading, setBoxLoading] = useState(false) 
    
    const quote = props.quote
    useEffect(()=> {
        if (quote) { 
            setId(quote._id)
            setQuoteAvt(quote.quoteAvt)
            setQuoteName(quote.quoteName)
            setQuoteTitle(quote.quoteTitle)
            setQuoteContent(quote.quoteContent)
        }
    },[quote]) 

    const onSubmit = (event) => {
        event.preventDefault()    
        setBoxLoading(true) 
        if (file.length > 0) {
            let formData = new FormData(); 
            formData.append("file", file); 
            formData.append("upload_preset", "dbaonam");
            axios.post("https://api.cloudinary.com/v1_1/dzoxlskiz/image/upload", formData)
            .then((res) => {  
                axios.put('https://uel-law.herokuapp.com/quote', { 
                    id: id,
                    quoteAvt: res.data.url,
                    quoteName: quoteName,
                    quoteTitle: quoteTitle,
                    quoteContent: quoteContent
                })
                .then(()=>{
                    props.setCloseEditFunc(false);
                    props.setToastFunc(true);
                    setBoxLoading(false);
                })  
            })  
        } else {
            axios.put('https://uel-law.herokuapp.com/quote', { 
                id: id,
                quoteAvt: quoteAvt,
                quoteName: quoteName,
                quoteTitle: quoteTitle,
                quoteContent: quoteContent
            })
            .then(()=>{
                props.setCloseEditFunc(false);
                props.setToastFunc(true);
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
                                    setQuoteAvt(URL.createObjectURL(files[0]))  
                                    setFile(files[0]) 
                                }}
                                type="file" 
                                className="input-file"
                                multiple="multiple"  
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}> 
                                {
                                    quoteAvt !== "" &&
                                    <div className="create-box-img">
                                        <img src={quoteAvt} alt=""></img> 
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
                                    setQuoteName(event.target.value)
                                }} 
                                value={quoteName}
                            required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Chức vụ</div>
                        <div className="dashboard-right"> 
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setQuoteTitle(event.target.value)
                                }} 
                                value={quoteTitle}
                            required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Trích dẫn</div>
                        <div className="dashboard-right"> 
                            <textarea 
                                type="text" className="textarea" 
                                onChange={(event)=>{
                                    setQuoteContent(event.target.value)
                                }} 
                                value={quoteContent}
                            required></textarea>
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