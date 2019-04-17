import * as React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox,InputNumber,Input } from 'antd'
const CheckboxGroup = Checkbox.Group;


class CheckAllBox extends React.Component {
  constructor(props){
    super(props);
  	this.state = {
      checkedList: this.props.defaultCheckedList,
      indeterminate: true,
      checkAll: false,
    };
  }

  onChange(checkedList){
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.plainOptions.length),
      checkAll: checkedList.length === this.props.plainOptions.length,
    });
    this.props.onSubChange(checkedList);
  }

  onCheckAllChange(e){
    this.setState({
      checkedList: e.target.checked ? this.props.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    if(e.target.checked) this.props.onSubChange(this.props.plainOptions);
    else this.props.onSubChange([]);
  }

  render() {
    return (
      <div>
        <div>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange.bind(this)}
            checked={this.state.checkAll}
          >
            全选
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup options={this.props.plainOptions} value={this.state.checkedList} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}


export default CheckAllBox