import * as React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import PageB from './pages/bw'
import PageD from './pages/dyl'
import PageJ from './pages/jgs'
import PageM from './pages/main'
import './common/css/base.scss'
const routerList = [
  {
    component: PageM,
    path: `/`,
    key: 'main',
    exact: true
  },
  {
    component: PageB,
    path: '/bw',
    key: 'bw',
    exact: true
  }, {
    component: PageD,
    path: '/dyl',
    key: 'dyl',
    exact: true
  }, {
    component: PageJ,
    path: '/jgs',
    key: 'jgs',
    exact: true
  }
]
const render = routerList.map(item => {
  const {component, key, path, exact} = item
  const props = {
    path,
    component,
    exact
  }
  return <Route key={key} {...props}/>
})

export default () => {
  return (
    <Router>
      <div className="content-wrapper">
        <nav className="link-wrapper">
          <ul className="container">
            <li className="router-item"><Link to="/" style={{textDecoration: 'none'}}>信息汇总</Link></li>
            <li className="router-item"><Link to="/bw" style={{textDecoration: 'none'}}>用户管理</Link></li>
            <li className="router-item"><Link to="/dyl" style={{textDecoration: 'none'}}>安全配置</Link></li>
            <li className="router-item"><Link to="/jgs" style={{textDecoration: 'none'}}>搜索查询</Link></li>
          </ul>
        </nav>
        <div className="route-wrapper">
          {render}
        </div>
      </div>
    </Router>
  )
}