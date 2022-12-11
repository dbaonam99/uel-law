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
    setLoading(true)
    window.scrollTo(0, 0)

    Promise.all([
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/home`)
        .then((res) => res.data[0])
        .catch(() => {}),
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/quote`)
        .then((res) => res.data)
        .catch(() => []),
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/sponsor`)
        .then((res) => res.data)
        .catch(() => []),
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/team`)
        .then((res) => res.data)
        .catch(() => []),
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/news`)
        .then((res) => res.data)
        .catch(() => []),
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/library`)
        .then((res) => res.data)
        .catch(() => []),
    ])
      .then(([_home, _quote, _sponsor, _team, _news, _library]) => {
        setHome(_home)
        setQuote(_quote)
        setSponsor(_sponsor)
        setTeam(_team)
        setNews(_news)
        setLibrary(_library)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

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
