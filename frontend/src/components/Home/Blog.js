import '../../Styles/Home.css'
import News from '../Newsfeed/News'

export default function Blog({ home, news }) {
  return (
    <div className="Blog flex-col" style={{ paddingTop: '5px' }}>
      <div className="about-header flex-center">
        <div className="about-title">Tin tức</div>
        <div className="about-title-text">{home.homeBlog}</div>
        <div className="h-gap"></div>
      </div>
      <div className="blog-list flex">
        {news &&
          news
            .reverse()
            .slice(0, 3)
            .map((item, index) => {
              return <News key={index} news={item} />
            })}
      </div>
    </div>
  )
}
