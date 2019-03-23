import * as React from 'react'
import { SubRouter } from '../../router'
import Header from '../../component/header'
import Navbar from '../../component/navbar'
import '../../common/css/base.scss'
export default class MainPage extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Navbar />
        <SubRouter />
      </div>
    )
  }
}