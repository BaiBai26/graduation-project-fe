import * as React from 'react'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import PageB from './pages/bw'
import Rules from './pages/bw/rules.js'
import Template from './pages/bw/template.js'
import History from './pages/bw/history.js'
import PageD from './pages/dyl'
import PageJ from './pages/jgs'
import PageM from './pages/manage'
import LoginPage from './pages/login'
import MainPage from './pages/main'
import { connect } from './component/layout'
import Layout from './component/layout'
import './common/css/base.scss'
const routerList = [
  {
    component: LoginPage,
    path: `/`,
    key: 'login',
    exact: true
  },
  {
    component: MainPage,
    path: '/fudan',
    key: 'mainP',
    exact: true
  }
]
const subRouterList = [
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
  },{
    component: Template,
    path: '/bw/template',
    key: 'bw_template',
    exact: true
  },{
    component: Rules,
    path: '/bw/rules',
    key: 'bw_rules',
    exact: true
  },{
    component: History,
    path: '/bw/history',
    key: 'bw_history',
    exact: true
  }
]
const render = (routerList) => {
  return routerList.map(item => {
    const {component, key, path, exact} = item
    const props = {
      path,
      component: connect(component),
      exact
    }
    return <Route key={key} {...props}/>
  })
}

export const RouterRoute = () => {
  return (
    <Router>
      <Layout>
        <div>
          {render(routerList)}
        </div>
      </Layout>
    </Router>
  )
}
export const SubRouter = () => {
  return (
    <HashRouter>
      <div className="content-wrapper">
        <nav className="link-wrapper">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="info-circle" />
              <span>信息汇总</span>
              <Link to="/" style={{textDecoration: 'none'}}>
                <Icon type="info-circle" />
                <span>信息汇总</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="usergroup-delete" />
              <span>告警配置</span>
              <Link to="/bw" style={{textDecoration: 'none'}}>
                <Icon type="usergroup-delete" />
                <span>告警配置</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/dyl" style={{textDecoration: 'none'}}>
                <Icon type="file-protect" />
                <span>安全配置</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/jgs" style={{textDecoration: 'none'}}>
                <Icon type="search" />
                <span>搜索查询</span>
              </Link>
            </Menu.Item>
          </Menu>
        </nav>
      </div>
    </HashRouter>
  )
}

export const renderContent = () => {
  return (
    <HashRouter>
      <div className="route-wrapper">
        {render(subRouterList)}
      </div>
    </HashRouter>
  )
}