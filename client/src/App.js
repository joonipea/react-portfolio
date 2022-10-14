import React, {useState, useEffect} from 'react';
import './App.css';
import Navigation from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Design from './components/pages/Design';
import Merch from './components/pages/Merch';
import Music from './components/pages/Music';
import Shows from './components/pages/Shows';
import Names from './components/pages/Names';
import About from './components/pages/About';
import { Beatstore } from './components/pages/Beatstore';
import Journal from './components/pages/Journal';
import Mathle from './components/pages/mratth';
import Account from './Account';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import { BrowserRouter as Router} from 'react-router-dom';
import BlogAdmin from './components/pages/Blog Admin';
import ListBlogs from './components/pages/Blogs';
import BlogPages from './components/pages/Blog Pages';
import { BeatUpload } from './components/pages/BeatUpload';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}blogs/getposts`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      }).then((response) => {
          if (response.ok) {
              response.json().then((data) => {
                  setBlogs(data);
              });
          } else {
              console.log("Error fetching posts");
          }
      });
  }, []);
  const blogList = [];
  blogs.forEach((blog) => { 
    blogList.push((blog.title).replace(/ /g, "-"));
  });


  return (
    <>
      <Router>
      <Navigation />
        <Routes>
          <Route exact path ='/' element={<Home/>} />
          <Route path='/Music' element={<Music/>} />
          <Route path='/Shows' element={<Shows/>} />
          <Route path='/Design' element={<Design/>} />
          <Route path='/Merch' element={<Merch/>} />
          <Route path='/Names' element={<Names/>} />
          <Route path='/Beats' element={<Beatstore/>} />
          <Route path='/Beat-Upload' element={<BeatUpload/>} />
          <Route path='/About' element={<About />} />
          <Route path='/Journal' element={<Journal />} />
          <Route path='/mathle' element={<Mathle />} />
          <Route path='/User' element={<Account />} />
          <Route path='/User/Forgot' element={<ForgotPassword />} />
          <Route path='/User/changepassword' element={<ChangePassword />} />
          <Route path='/Blog-admin' element={<BlogAdmin/>} />
          <Route path='/Blogs' element={<ListBlogs/>} />
          {blogList.map((blog) => (
            <Route key={blog} path={`/Blogs/${blog}`} element={<BlogPages activeBlog={blog}/>} />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
