import * as React from 'react'
import './index.scss'
class Header extends React.Component {

  render () {
    return (
      <header className="header-wrapper">
        <div className="container">
          <span className="logo"></span>
          <div className="project-name">可定制的虚拟机初始化系统</div>
        </div>
      </header>
    )
  }
}

export default Header