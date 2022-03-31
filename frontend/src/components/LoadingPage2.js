import React from 'react'
import '../Styles/LoadingPage.css'

export default function LoadingPage2({ loading }) {
  return (
    <div
      style={{
        height: `${window.innerHeight}px`,
      }}
      className={loading ? 'loading-page show-loading' : 'loading-page'}
    >
      <div className="loading-icon"></div>
    </div>
  )
}
