/*
 * @Author: DT333TJ
 * @Date: 2022-02-04 10:35:42
 * @LastEditTime: 2022-02-04 15:29:42
 * @LastEditors: DT333TJ
 * @Description: 
 * @FilePath: \react-project\src\views\home\index.js
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<h1>Home page</h1>
				<Link to="/login">跳转login</Link>
			</div>
		)
	}
}

export default Home

