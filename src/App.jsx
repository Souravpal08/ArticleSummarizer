import React from 'react'
import ShowDemo from './components/ShowDemo';
import Body from './components/Body';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <main>
    <div className="main">
    <div className="gradient" />
    </div>

    <div className="app">
        <Body />
        <ShowDemo />
        <ToastContainer
         position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition: Bounce
  
/>
    </div>
    </main>
  )
}

export default App
