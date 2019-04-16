import * as React from 'react'
import { SubRouter } from '../../router'
import { Layout, Icon, Avatar} from 'antd'
import { renderContent } from '../../router'
const { Header, Sider, Content } = Layout
import Context from '@component/context'
// import Header from '../../component/header'
import Navbar from '../../component/navbar'
import './index.scss'
export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentDidMount() {
    // const { token } = this.context
    // if (!token) {
    //   this.props.history.push('/')
    // }
  }
  render() {
    const { token } = this.context
    return (
      <Layout className="layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="pad" />
          { SubRouter() }
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} className="main-header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
            <div className="user-profile">
             <Avatar 
              icon="user"
             />
             <span className="user-name">admin</span>
            </div>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            { renderContent() }
          </Content>
        </Layout>
      </Layout>
    )
  }
}
MainPage.contextType = Context