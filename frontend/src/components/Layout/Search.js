import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import '../../Styles/Search.css' 
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

function Search(props) {  

    const [closeAnimation, setCloseAnimation] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const onSubmit = (event) => {
        props.history.push(`/search/${searchValue}`)
        document.body.style.overflow = 'unset'
    }

    return (
        <div className={classNames('Search flex-center flex-col', {
            show_box: props.openSearch, 
        })}>  
            <div 
                className="close-box flex-center"
                onClick={()=>{
                    setTimeout(()=>{
                        props.setOpenSearch(false)
                    }, 200)
                    setCloseAnimation(true)
                    setTimeout(()=>{
                        setCloseAnimation(false)
                    }, 500)
                    document.body.style.overflow = 'unset'
                }}
            >
                <FontAwesomeIcon icon={faTimes} className="icon"/>
            </div> 
            <form 
                className={classNames('search-box flex',{ 
                    show_input: props.openSearch && !closeAnimation,
                    close_input: closeAnimation
                })}
                onSubmit={onSubmit}
            >
                <input 
                    placeholder="Tìm kiếm..."
                    value = {searchValue}
                    onChange={(event)=>{
                        setSearchValue(event.target.value)
                    }}
                ></input>
                <button>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </form>
            <div
                className={classNames('search-help',{ 
                    show_input: props.openSearch && !closeAnimation,
                    close_input: closeAnimation
                })}>
                <p>Nhập từ khóa liên quan đến tiêu đề để tìm kiếm</p>
            </div>
        </div>
    )
}
export default withRouter(Search)