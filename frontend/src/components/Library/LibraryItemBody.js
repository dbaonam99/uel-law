import '../../Styles/Newsfeed.css'
import LibWidget from './LibWidget'
import LibraryContent from './LibraryContent' 

export default function LibraryItemBody(props) {  

    const library = props.library 

    return (
        <div className="NewsfeedBody flex">  
            <div className="newsfeed-left flex">
                { library &&
                    <LibraryContent
                        library={library}
                    />
                }  
            </div>
            <LibWidget/>
        </div>
    )
}