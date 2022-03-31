import './App.css';
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom"; 

import Home from './Pages/Home';
import Introduce from './Pages/Introduce';
import Newsfeed from './Pages/Newsfeed';
import Library from './Pages/Library';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import News from './Pages/News';
import Dashboard from './components/Admin/Dashboard';
import Search from './Pages/Search'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sponsor from './Pages/Sponsor';
import LibraryItem from './Pages/LibraryItem';
import { ChangeToSlug } from './Func.js'
import LoadingPage from './components/LoadingPage';

function App() {

    const [introduceList, setIntroduceList] = useState([])
    const [libraryGroupList, setLibraryGroupList] = useState([])
    useEffect(()=>{
        axios.get('https://uel-law.herokuapp.com/introduce')
        .then((res)=>{
            setIntroduceList(res.data)
        })
        axios.get('https://uel-law.herokuapp.com/library')
        .then((res)=>{
            const libGroupArr = []
            for (let i in res.data) {
                libGroupArr.push(res.data[i].libraryGroup)
            }
            var unique = libGroupArr.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            })
            setLibraryGroupList(unique)
        })
    }, []) 

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        if (window.location.href.split('/')[3] === "") {
            setTimeout(()=>{
                setLoading(false) 
                document.body.style.overflow = 'unset';
            }, 3500)
        } else {
            setLoading(false)
            document.body.style.overflow = 'unset';
        }
        localStorage.setItem("connectId", new Date().getTime())
    },[])
    
    return ( 
        <div> 
            <LoadingPage
                loading={loading} 
            /> 
            <Router>
                <div className="App"> 
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/home" exact component={Home}></Route>
                    { introduceList &&
                        introduceList.map((item, index) => {
                            let path = "/gioi-thieu/" + item.introduceUrl
                            return (
                                <Route key={index} path={path} exact component={Introduce}></Route>
                            )
                        })
                        
                    }
                    <Route path="/ban-tin" exact component={Newsfeed}></Route>
                    <Route path="/ban-tin/:cate" exact component={Newsfeed}></Route>
                    <Route path="/ban-tin/:cate/:id" exact component={News}></Route> 
                    { libraryGroupList &&
                        libraryGroupList.map((item, index) => {
                            const slugText = `/thu-vien/${ChangeToSlug(item)}`
                            return (
                                <Route key={index} path={slugText} exact component={Library}></Route>
                            )
                        })
                    }
                    { libraryGroupList &&
                        libraryGroupList.map((item, index) => {
                            const slugText = `/thu-vien/${ChangeToSlug(item)}/:cate`
                            return (
                                <Route key={index} path={slugText} exact component={Library}></Route>
                            )
                        })
                    }
                    { libraryGroupList &&
                        libraryGroupList.map((item, index) => {
                            const slugText = `/thu-vien/${ChangeToSlug(item)}/:cate/:id`
                            return (
                                <Route key={index} path={slugText} exact component={LibraryItem}></Route>
                            )
                        })
                    }
                    <Route path="/lien-he" exact component={Contact}></Route>
                    <Route path="/admin" exact component={Login}></Route>
                    <Route path="/admin/dashboard" exact component={Dashboard}></Route>
                    <Route path="/nha-tai-tro" exact component={Sponsor}></Route>
                    <Route path="/search/:keyword" exact component={Search}></Route>
                </div>
            </Router> 
        </div>
    );
}

export default App;
