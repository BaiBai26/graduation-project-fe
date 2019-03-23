import * as React from 'react'
import clsn from 'classnames'
import { 
  VIRTUAL_MACHINE,
  SECURITY_CONFIG,
  SUCCESS_CONFIG
 } from '@static/js/mock_dyl'
import { Modal, message } from 'antd'
const confirm = Modal.confirm
import './index.scss'
 const NO_MACHINE_CONTENT = '当前环境没有任何虚拟机...'
 const NO_SUCCESS_CONTENT = '目前还没有成功配置的虚拟机...'
class PageD extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMachineNumber: 0,
      selectedMachines: null,
      selectedConfig: null,
      allMachines: null,
      successConfigMachines: null,
      modalVisible: false,
      btnClickable: true
    }
  }
  componentDidMount() {
    this.setState({
      successConfigMachines: SUCCESS_CONFIG,
      allMachines: VIRTUAL_MACHINE,
      selectedMachines: [],
      selectedConfig: []
    })
  }
  toggleSelectMachine(idx) {
    const { allMachines, selectedMachineNumber, selectedMachines } = this.state
    const machines = [...allMachines]
    let selectedm = [...selectedMachines]
    const m = machines[idx]
    const s = !!m.selected
    let n = selectedMachineNumber
    if(!s) {
      selectedm.push(m)
      n++
    } else {
      selectedm = selectedm.filter(item => item.value !== m.value)
      n--
    }
    m.selected = !s
    this.setState({
      allMachines: machines,
      selectedMachineNumber: n,
      selectedMachines: selectedm
    })
  }
  renderVirtualMachine (machines, none_content, cb) {
    if(!machines) {
      return (
        <div className="selected-machine-tip">{none_content}</div>
      )
    }
    return (
      <div className="virtual-machines-wrapper">
        {
          machines.map((item, index)=> {
            return (
              <div className={clsn('machine-item-wrapper', {
                'selected': !!item.selected
              })} key={item.key} onClick={ _ => {cb(index)}}>
                <div className="machine-icon"></div>
                <div className="machine-ip"><span>{item.content}</span></div>
              </div>
            )
          })
        }
      </div>
    )
  }
  handleConfigClick(e, index) {
    console.log(e.target.checked)
    let selectedConfig = [...this.state.selectedConfig]
    let checked = e.target.checked
    let config = SECURITY_CONFIG[index]
    if (checked) {
      selectedConfig.push(config)
    } else {
      selectedConfig = selectedConfig.filter(item => item.key !== config.key)
    }
    this.setState({
      selectedConfig
    }, () => {
      console.log(this.state.selectedConfig)
    })
  }
  renderConfig() {
    return (
      <div className="config-wrapper">
        {
          SECURITY_CONFIG.map((item, index)=> {
            return (
              <div key={item.key}><input type="checkbox" value={item.key} onChange={e => this.handleConfigClick(e,index)} checked={item.checked}/>{item.content}</div>
            )
          })
        }
      </div>
    )
  }
  handleClickConfigButton() {
    // confirm({
    //   title: '注意',
    //   content: '确定要应用吗？',
    //   onOk:this.confirm,
    //   onCancel: this.cancel,
    // })
    const { btnClickable } = this.state
    console.log(btnClickable)
    if(!btnClickable) {
      message.error('当前不可执行配置!')
      return
    }
    this.setState({
      modalVisible: true
    })
    setTimeout(() => {
      this.setState({
        btnClickable: true
      })
    }, 2500)
  }
  confirm() {
    // 异步
    this.setState({
      btnClickable: false,
      modalVisible: false
    })
    message.success('已应用')
    // setTimeout(() => {
    //   this.setState({
    //     btnClickable: true
    //   }, 2000)
    // })
  }
  cancel() {
    this.setState({
      modalVisible: false
    })
    message.error('已取消应用')
  }
  render() {
    const {successConfigMachines, selectedMachineNumber, allMachines, btnClickable} = this.state
    const successNumber = successConfigMachines ? successConfigMachines.length : 0
    return (
      <div className="init-config-wrapper">
        <div className="top">
          <p>已选{selectedMachineNumber}个</p>
          { this.renderVirtualMachine(allMachines, NO_MACHINE_CONTENT, this.toggleSelectMachine.bind(this))}
        </div>
        <div className="mediem">
          {this.renderConfig()}
          <div className="config-button-wrapper">
            <div className={clsn("config-button", {
              "disable": !btnClickable
            })} onClick={this.handleClickConfigButton.bind(this)}>应用</div>
          </div>
        </div>
        <div className="bottom">
          <div className="success-title">已成功配置的机器: <span>{successNumber}台</span></div>
          { this.renderVirtualMachine(successConfigMachines, NO_SUCCESS_CONTENT, () => {})}
        </div>
        <Modal
          title="注意"
          onOk={this.confirm.bind(this)}
          onCancel={this.cancel.bind(this)}
          visible={this.state.modalVisible}
        >
          <p>应用后不可撤销，确定提交吗？</p>
        </Modal>
      </div>
    )
  }
}

export default PageD