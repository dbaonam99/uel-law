import '../../Styles/Newsfeed.css'
import Widget from './Widget'
import NewsContent from './NewsContent' 

export default function NewsBody(props) {  

    const news = props.news 

    return (
        <div className="NewsfeedBody flex">  
            <div className="newsfeed-left flex">
                { news &&
                    <NewsContent
                        news={news}
                    />
                } 
            </div>
            <Widget/>
        </div>
    )
}