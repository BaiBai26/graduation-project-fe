import * as React from 'react'
import { SubRouter } from '../../router'
import Context from '@component/context'
import Header from '../../component/header'
import Navbar from '../../component/navbar'
import '../../common/css/base.scss'
export default class MainPage extends React.Component {
  componentDidMount() {
    const { token } = this.context
    if (!token) {
      this.props.history.push('/')
    }
  }
  render() {
    const { token } = this.context
    return (
      <div className="app">
        <Header/>
        <Navbar />
        <SubRouter/>
      </div>
    )
  }
}
MainPage.contextType = Context