/*
 *                   江城子 . 程序员之歌
 * 
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 * 
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 * 
 * 
 * @Author: DT333TJ
 * @Date: 2022-02-03 19:25:47
 * @LastEditTime: 2022-02-05 16:21:24
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \react-project\src\App.js
 */
import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Login from './views/login'
import Home from './views/home'

import Header from './components/header'

function App() {
  return (
    <Fragment>
      <Header></Header>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '' : '/father/react'}>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="*" element={<Navigate to={"/login"}/>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
