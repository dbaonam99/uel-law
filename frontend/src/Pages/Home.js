import Banner from '../components/Layout/Banner'
import Header from '../components/Layout/Header'
import AboutUs from '../components/Home/AboutUs'
import Intro from '../components/Home/Intro'
import Quote from '../components/Home/Quote'
import Sponsors from '../components/Home/Sponsors'
import TeamMember from '../components/Home/TeamMember'
import Blog from '../components/Home/Blog'
import ContactForm from '../components/Home/ContactForm'
import NewsLetter from '../components/Layout/NewsLetter'
import CLBStatus from '../components/Home/CLBStatus'
import Footer from '../components/Layout/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingPage2 from '../components/LoadingPage2'

export default function Home() {
  const [home, setHome] = useState({})
  const [quote, setQuote] = useState([])
  const [sponsor, setSponsor] = useState([])
  const [team, setTeam] = useState([])
  const [news, setNews] = useState([])
  const [library, setLibrary] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      setLoading(true)
      window.scrollTo(0, 0)
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/home`).then((res) => {
        setHome(res.data[0])
      })
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/quote`).then((res) => {
        setQuote(res.data)
      })
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sponsor`).then((res) => {
        setSponsor(res.data)
      })
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/team`).then((res) => {
        setTeam(res.data)
      })
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/news`).then((res) => {
        setNews(res.data)
      })
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/library`).then((res) => {
        setLibrary(res.data)
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (home._id && quote.length > 0 && sponsor.length > 0 && news.length > 0) {
      setLoading(false)
      document.body.style.overflow = 'unset'
    }
  }, [home, quote, sponsor, team, news])

  return (
    <div className="Home">
      <LoadingPage2 loading={loading} />
      <Header />
      <Banner />
      <Intro />
      {home && <AboutUs home={home} />}
      {home && <Quote quote={quote} />}
      {home && sponsor.length > 0 && <Sponsors home={home} sponsor={sponsor} />}
      {home && team.length > 0 && <TeamMember home={home} team={team} />}
      {news && home && <Blog home={home} news={news} />}
      {home && <ContactForm home={home} />}
      {team && news && library && (
        <CLBStatus team={team} news={news} library={library} />
      )}
      <NewsLetter />
      <Footer />
    </div>
  )
}
