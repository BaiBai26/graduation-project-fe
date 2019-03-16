import * as React from 'react'
import {
  SHAXIANG_NUMBER,
  PHY_MACHINE_NUMBER,
  VIRTUAL_MACHINE_NUMBER,
  SYS_HEALTH,
  RIZHI_PER_SECOND,
  SECU_EVENT_NUMBER,
  GAOJING_EVENT_NUMBER,
  UNDONE_EVENT_NUMBER
} from '../../../static/js/mock_main'
import './index.scss'
class PageM extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sandboxNumber: 0,
      phyMachineNumber: 0,
      virtualMachineNumber: 0,
      systemHealth: 0,
      logPerSecond: 0,
      warningNumber: 0,
      secEventNumber: 0,
      undoEventNumber: 0
    }
  }
  componentDidMount() {
    this.setState({
      sandboxNumber: SHAXIANG_NUMBER,
      phyMachineNumber: PHY_MACHINE_NUMBER,
      virtualMachineNumber: VIRTUAL_MACHINE_NUMBER,
      systemHealth: SYS_HEALTH,
      logPerSecond: RIZHI_PER_SECOND,
      warningNumber: GAOJING_EVENT_NUMBER,
      secEventNumber: SECU_EVENT_NUMBER,
      undoEventNumber: UNDONE_EVENT_NUMBER
    })
  }
  renderStatistics() {
    const {sandboxNumber, phyMachineNumber, virtualMachineNumber, systemHealth, logPerSecond, warningNumber, secEventNumber, undoEventNumber} = this.state
    return (
      <>
        <div className="info-item">
          <p className="info-title">沙箱数量</p>
          <p className="info-count">{sandboxNumber}</p>
        </div>
        <div className="info-item">
          <p className="info-title">物理机数量</p>
          <p className="info-count">{phyMachineNumber}</p>
        </div>
        <div className="info-item">
          <p className="info-title">虚拟机数量</p>
          <p className="info-count">{virtualMachineNumber}</p>
        </div>
        <div className="info-item">
          <p className="info-title">系统健康度</p>
          <p className="info-count">{systemHealth}</p>
        </div>
        <div className="info-item">
          <p className="info-title">单位时间日志数量</p>
          <p className="info-count">{logPerSecond}</p>
        </div>
        <div className="info-item">
          <p className="info-title">安全事件数量</p>
          <p className="info-count">{secEventNumber}</p>
        </div>
        <div className="info-item">
          <p className="info-title">告警事件数量</p>
          <p className="info-count">{warningNumber}</p>
        </div>
        <div className="info-item">
          <p className="info-title">未处理事件数量</p>
          <p className="info-count">{undoEventNumber}</p>
        </div>
      </>
    )
  }
  render() {
    return (
      <div className="main-wrapper">
        <div className="top">
          <p>统计信息</p>
          <div className="statistic-info">
            {this.renderStatistics()}
          </div>
        </div>
        <div className="medium">
          <p>24h系统安全事件统计图</p>
        </div>
        <div className="bottom">
          <p>告警事件列表</p>
        </div>
      </div>
    )
  }
}

export default PageM