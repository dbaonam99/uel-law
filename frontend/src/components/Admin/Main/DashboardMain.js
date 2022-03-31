import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import {
  faEnvelope,
  faNewspaper,
  faTasks,
} from '@fortawesome/free-solid-svg-icons'
import DashboardTotalCount from './DashboardTotalCount'
import axios from 'axios'
import DashboardTodoList from './DashboardTodoList'
import DashboardChartPie from './DashboardChartPie'

export default function DashboardMain() {
  const [news, setNews] = useState([])
  const [library, setLibrary] = useState([])
  const [email, setEmail] = useState([])
  const [newsPercent, setNewsPercent] = useState({})
  const [emailPercent, setEmailPercent] = useState({})

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    let lastYear = new Date().getFullYear()
    let lastMonth = 0
    if (currentMonth === 1) {
      lastMonth = 12
      lastYear = currentYear - 1
    } else {
      lastMonth = currentMonth - 1
      lastYear = currentYear
    }
    axios.get(`https://uel-law.herokuapp.com/news`).then((res) => {
      axios.get(`https://uel-law.herokuapp.com/library`).then((res2) => {
        const data = [...res.data, ...res2.data]
        setNews(data)
        const lastMonthArr = []
        for (let i in data) {
          if (
            new Date(data[i].newsDate).getMonth() + 1 === lastMonth &&
            new Date(data[i].newsDate).getFullYear() === lastYear
          ) {
            lastMonthArr.push(data[i])
          }
          if (
            new Date(data[i].libraryDate).getMonth() + 1 === lastMonth &&
            new Date(data[i].libraryDate).getFullYear() === lastYear
          ) {
            lastMonthArr.push(data[i])
          }
        }
        const currentMonthArr = []
        for (let i in data) {
          if (
            new Date(data[i].newsDate).getMonth() + 1 === currentMonth &&
            new Date(data[i].newsDate).getFullYear() === currentYear
          ) {
            currentMonthArr.push(data[i])
          }
          if (
            new Date(data[i].libraryDate).getMonth() + 1 === currentMonth &&
            new Date(data[i].libraryDate).getFullYear() === currentYear
          ) {
            currentMonthArr.push(data[i])
          }
        }
        if (currentMonthArr.length >= lastMonthArr.length) {
          setNewsPercent({
            percent: Math.ceil(
              ((currentMonthArr.length - lastMonthArr.length) /
                lastMonthArr.length) *
                100
            ),
            isDecrease: true,
          })
        } else {
          setNewsPercent({
            percent: Math.ceil(
              ((lastMonthArr.length - currentMonthArr.length) /
                lastMonthArr.length) *
                100
            ),
            isDecrease: false,
          })
        }
      })
    })
    axios.get(`https://uel-law.herokuapp.com/library`).then((res) => {
      setLibrary(res.data)
    })
    axios.get(`https://uel-law.herokuapp.com/email`).then((res) => {
      setEmail(res.data)
      const data = [...res.data]
      const lastMonthArr = []
      for (let i in data) {
        if (
          new Date(data[i].subscriberDate).getMonth() + 1 === lastMonth &&
          new Date(data[i].subscriberDate).getFullYear() === lastYear
        ) {
          lastMonthArr.push(data[i])
        }
      }
      const currentMonthArr = []
      for (let i in data) {
        if (
          new Date(data[i].subscriberDate).getMonth() + 1 === currentMonth &&
          new Date(data[i].subscriberDate).getFullYear() === currentYear
        ) {
          currentMonthArr.push(data[i])
        }
      }
      if (currentMonthArr.length >= lastMonthArr.length) {
        setEmailPercent({
          percent: Math.ceil(
            ((currentMonthArr.length - lastMonthArr.length) /
              lastMonthArr.length) *
              100
          ),
          isDecrease: true,
        })
      } else {
        setEmailPercent({
          percent: Math.ceil(
            ((lastMonthArr.length - currentMonthArr.length) /
              lastMonthArr.length) *
              100
          ),
          isDecrease: false,
        })
      }
    })
  }, [])

  const totalCount = [
    {
      id: 1,
      title: 'Bài đăng',
      count: news.length + library.length,
      percent: newsPercent.percent,
      isDecrease: newsPercent.isDecrease,
      color: 'orange',
      icon: faNewspaper,
    },
    {
      id: 2,
      title: 'Email đăng ký',
      count: email.length,
      percent: emailPercent.percent,
      isDecrease: emailPercent.isDecrease,
      color: 'pink',
      icon: faEnvelope,
    },
  ]

  return (
    <div className="dashboard-main">
      <div className="row flex">
        {totalCount.map((item, index) => {
          return <DashboardTotalCount key={index} item={item} />
        })}
      </div>
      <div className="row flex">
        <DashboardChartPie email={email} color="pink" />
        <DashboardTodoList // recent orders
          icon={faTasks}
          title="Todo list"
          color="green"
        />
      </div>
    </div>
  )
}
