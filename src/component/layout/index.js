import * as React from 'react'
import Context from '../context'
class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: ''
    }
  }
  
  render () {
    const { token } = this.state
    const store = {
      token,
      modify: (obj, cb) => {
        this.setState(obj,cb)
      }
    }
    return (
      <Context.Provider value={{...store}}>
          {this.props.children}
      </Context.Provider>
    )
  }
}
export default Layout

export const connect = (Target) => {
  return class Consumer extends React.Component {
    render() {
      return (
        <Context.Consumer>
          { (context) => <Target { ...this.props } context={ context } /> }
        </Context.Consumer>
      )
    }
  }
}