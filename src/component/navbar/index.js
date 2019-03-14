import * as React from 'react'

import './index.scss'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curtime: new Date()
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        curtime: Date.now()
      })
    }, 1000)
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }
  formateTime(time){
    const addZero = (t) => {
      return t < 10 ? '0' + t : t
    }
    let t = new Date(time)
    let y = t.getFullYear()
    let m = addZero(t.getMonth() + 1)
    let d = addZero(t.getDate())
    let h = addZero(t.getHours())
    let min = addZero(t.getMinutes())
    let s = addZero(t.getSeconds())
    return `${y}-${m}-${d} ${h}:${min}:${s}`
  }
  render () {
    const { curtime }  = this.state
    return (
      <div className="navbar">
        <div className="time">系统时间: {this.formateTime(curtime)}</div>
        <div className="tip">告警系统及关键提示</div>
        <div className="admin">admin</div>
      </div>
    )
  }
}
export default Navbar