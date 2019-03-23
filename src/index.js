import * as React from 'react'
import ReactDOM from 'react-dom'
import { RouterRoute } from './router.js'
import './common/css/base.scss'
import "antd/dist/antd.css";
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <RouterRoute />
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
