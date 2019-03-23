import * as React from 'react'
import ReactDOM from 'react-dom'
import RouterRender from './router.js'
import Header from './component/header'
import Navbar from './component/navbar'
import './common/css/base.scss'
import "antd/dist/antd.css";
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Navbar />
        <RouterRender />
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
