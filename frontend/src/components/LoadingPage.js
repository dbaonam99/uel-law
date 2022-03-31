import React from 'react';
import '../Styles/LoadingPage.css' 

export default function LoadingPage(props) {

    const loading = props.loading


    return(
        <div 
            style={{
                height: `${window.innerHeight}px`,
                zIndex: '9999999999'
            }}
            className={loading ? "loading-page show-loading" : "loading-page"}
        >
            <div className="loading-page-container flex-center">
                <p className="loading-text hello">Hello!</p>
            </div>
            <div className="loading-page-container flex-center">
                <p className="loading-text welcome">Welcome to Young Lawyers Journal</p>
            </div> 
        </div>
    )
}