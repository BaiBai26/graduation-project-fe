import * as React from 'react'
import { BrowserRouter as Router,Route,Link} from 'react-router-dom';

import './index.css'

import Detection from "./detection.js"
import Rules from "./rules.js"


class PageB extends React.Component{
	render(){
		return(
			<div className="subnav">
			    <ul>
				    <li className="router-item"><Link to="/bw/rules" style={{textDecoration: 'none'}}>告警规则</Link></li>
		            <li className="router-item"><Link to="/bw/template" style={{textDecoration: 'none'}}>告警模板</Link></li>
		            <li className="router-item"><Link to="/bw/history" style={{textDecoration: 'none'}}>告警历史</Link></li>
		        </ul>
			</div>
			)
	}
}

export default PageB