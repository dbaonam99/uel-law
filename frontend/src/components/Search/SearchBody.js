import '../../Styles/Newsfeed.css' 
import News from './News'
import { withRouter } from 'react-router-dom'  
import { useEffect, useState } from 'react' 
import LibraryItem from './LibraryItem'

function SearchBody(props) {  
 
    const [news, setNews] = useState([])
    const [library, setLibrary] = useState([])
 
    useEffect(()=>{
        if (props.news) { 
            setNews(props.news) 
        }
        if (props.library) { 
            setLibrary(props.library) 
        }
    }, [props.news, props.library, props.location.pathname])

    return (
        <div className="NewsfeedBody flex-col">  
            { news.length > 0 && 
                <div className="SearchBodyTitle">bản tin</div> 
            }
            { news.length === 0 && library.length === 0 && 
                <h2>Không tìm thấy bài đăng nào!</h2>
            }
            <div className="newsfeed-left" style={{width: '100%'}}>
                <div className="newsfeed-top flex">
                    { news &&
                        news.map((item, index) => { 
                            return (
                                <News 
                                    key={index}
                                    news={item}
                                /> 
                            )
                        })
                    }
                </div>
            </div> 
            { library.length > 0 &&
                <div className="SearchBodyTitle">Thư viện</div>
            }
            <div className="newsfeed-left" style={{width: '100%'}}>
                <div className="newsfeed-top flex">
                    { library &&
                        library.map((item, index) => { 
                            return (
                                <LibraryItem
                                    key={index}
                                    library={item}
                                /> 
                            )
                        })
                    }
                </div>
            </div> 
        </div>
    )
}
export default withRouter(SearchBody)