import * as React from 'react'
import "./detection.css"

class Detection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      illegal_VM_Show: "displayFlag",
      network_isolation_show:"displayFlag",
    }
  }

  handleClick(){
    var choice = document.getElementById("select").value;
    console.log(choice);
    if(choice=="illegal-VM"){
      this.setState({
        illegal_VM_Show:"",
        network_isolation_show:"displayFlag",
      })
    }else if(choice=="network-isolation"){
      this.setState({
        illegal_VM_Show: "displayFlag",
        network_isolation_show:""
      })
    }
  }

  render() {
    return (
        <div className="container">
          <div className="submit">
            <div className="select">
              <select name="methods" id="select">
                <option value="illegal-VM" className="select-options">非法虚拟机检测</option>
                <option value="network-isolation" className="select-options">网络隔离检测</option>
              </select>
            </div>
            <div className="config-button-wrapper">
              <div className="config-button" onClick={this.handleClick.bind(this)}> 检测</div>
            </div>
          </div>
          <div className="bottom">
            <div id="illegal-VM-selected" className={this.state.illegal_VM_Show}>
                <Illegal_VM></Illegal_VM>
            </div>
            <div id="network-isolation-selected" className={this.state.network_isolation_show}>
              <p>网络隔离检测结果</p>
            </div>
          </div>
        </div>
    )
  }
}

class Illegal_VM extends React.Component{
  
  render(){
    var illegal_VM_list = [
      {name:"非法虚拟机1",state:"无效"},
      {name:"非法虚拟机2",state:"无效"},
    ];
    var illegal_VM = illegal_VM_list.map(
      (VM) =>
        <tr>
          <td>{VM.name}</td>
          <td>{VM.state}</td>
          <td><div className="button">删除</div></td>
       </tr>      
    )
    console.log(illegal_VM_list);
    return(
      <div>
        <p>非法虚拟机检测结果</p>
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {illegal_VM}
          </tbody>
        </table>
      </div>
      )
  }
}




export default Detection