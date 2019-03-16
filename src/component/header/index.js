import * as React from 'react'
import './index.scss'
class Header extends React.Component {

  render () {
    return (
      <header className="header-wrapper">
        <div className="container">
          <p className="project-name">系统名称及系统logo，待定<span className="logo"></span></p>
        </div>
      </header>
    )
  }
}

export default Header