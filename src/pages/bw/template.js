import * as React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox,InputNumber,Input,Select,Button,TimePicker,Row, Col,message  } from 'antd'
import { Table, Divider, Tag } from 'antd';
import moment from 'moment';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

import './template.css'

import CheckAllBox from './checkAllBox.js'
class Template extends React.Component{

    constructor(props) {  //构造函数
        super(props);
        this.state = {
            rulename:'',		//规则名称
            ruleobjects:[],		//规则对象
            warningtype:'',		//告警类型
            //显示状态
            index_warning_display:'none',
            incident_warning_display:'none',
            //指标告警的具体参数
			indextype:'',		//指标类型
            indexnum:'',		//指标阈值
            indexsymbol:'',		//指标大小关系
            //事件告警的具体参数
            incidenttype:'',	//事件类型
            //ssh连接
        	ssh_details_src_ip:"",
        	ssh_details_dest_ip:"",
        	ssh_details_port:"",
        	ssh_details_direction:"in",
        	ssh_details_type:"generation_record",
        	//扫描攻击列表
        	scan_list:[],
        	//拒绝攻击列表
        	reject_list:[],
        	//数据库连接
        	db_details_src_ip:"",
	    	db_details_dest_ip:"",
	    	db_details_port:"",
	    	db_details_direction:"in",
	    	db_details_type:"generation_record",
	    	db_details_SQL:"",
	    	//ftp操作列表
	    	ftp_operation_list:[],
        	//生效时间
            starttime:'',
            endtime:'',
        }
    }
    //规则对象
    ruleobjectChange(checkedValue,username){
    	var ruleobjects = this.state.ruleobjects;
    	//遍历寻找同username的
    	var found = 0;
    	for(var i=0;i<ruleobjects.length;i++) {
    		if(ruleobjects[i].name === username){
    			ruleobjects[i].VMs=checkedValue;
    			found = 1;
    			break;
    		}
		}
		//没找到则添加进去
		if(!found){
			ruleobjects.push({name:username,VMs:checkedValue})
		}
		console.log(ruleobjects);
		this.setState({ruleobjects:ruleobjects});
    }
    //选择事件的类型时的事件
    incidenttypeChange(value){
        this.setState({incidenttype:value});
        this._showDetails(value);
    }
    //选择告警类型时的事件
    warningtypeChange(value){
        this.setState({ warningtype :value });
        if(value === "index-warning"){
        	this.setState({
        		index_warning_display:"block",
        		incident_warning_display:"none"
        	})
        }else if(value === "incident-warning"){
        	this.setState({
        		index_warning_display:"none",
        		incident_warning_display:"block"
        	})
        }

    }

    //提交事件
	handleSubmit(){
		console.log(this.state);
		this._saveAllRules();
		message.success('提交成功');
		//两秒后跳转
		setTimeout(()=>window.location.href="/fudan#/bw/rules",2000);
		
	}

	_saveAllRules(){
		let rules = this._loadAllRules();
		if(!rules){
			rules = []
		}
		rules.push(this.state);
		rules = JSON.stringify(rules);
		localStorage.setItem('rules', rules);
	}

	_loadAllRules() {
	    let rules = JSON.parse(localStorage.getItem('rules'));
	    console.log(rules);
	    return rules;
	}

	//事件告警的细节展开，value是具体的事件
	_showDetails(value){
		if(value === "incident-ssh"){

			//======================= SSH 连接 ==================================
			ReactDOM.render(
    			<div className="incident-ssh-detail rules-block">
    				<div className="rules-inline">
	    				<span>源IP: </span>
	    				<Input placeholder="请输入源IP" 
	    					   onChange={(e) => this.setState({ssh_details_src_ip:e.target.value})} />
    				</div>
    				<div className="rules-inline">
	    				<span>目的IP: </span>
	    				<Input placeholder="请输入目的IP" 
	    					   onChange={(e) => this.setState({ssh_details_dest_ip:e.target.value})} />
    				</div>
    				<div className="rules-inline">
	    				<span>端口号: </span>
	    				<Input placeholder="请输入端口号" 
	    					   onChange={(e) => this.setState({ssh_details_port:e.target.value})} />
    				</div>
    				<div className="rules-inline">
    					<span>方向: </span>
    					<Select defaultValue="in" name="ssh-derection" style={{ width: 120 }} 
    							onChange={(value) => this.setState({ssh_details_direction:value})} >
					      <Option value="in">进</Option>
					      <Option value="out">出</Option>
					    </Select>
					</div>
					<div className="rules-inline">
						<span>类型: </span>
			            <Select defaultValue="generation_record" name="ssh-type" style={{ width: 120 }} 
    							onChange={(value) => this.setState({ssh_details_type:value})} >
			                <Option value ="generation_record">发生记录</Option>
			                <Option value ="no_alarm">禁止记录</Option>
			            </Select>
					</div>
    			</div>,
    			document.getElementById('details'))
	    }else if(value === "incident-scan"){

	    	//======================= 扫描攻击 ==================================
	    	let options = ["扫描操作1","扫描操作2","扫描操作3","扫描操作4"];
	    	let defaultOptions = ["扫描操作1"];
	    	ReactDOM.render(
    			<div className="incident-ssh-detail rules-block">
    				<CheckAllBox  plainOptions={options}
								  defaultCheckedList={defaultOptions} 
								  onSubChange={(checkedList) => this.setState({scan_list:checkedList})}/>
    			</div>,
    			document.getElementById('details'))
	    }else if(value ===  "incident-reject"){

	    	//======================= 拒绝服务攻击 ==================================
	    	//icmp、udp、syn、smurf、fraggle、land
	    	let options = ["icmp", "udp","syn","smurf","fraggle","land" ];
	    	let defaultOptions = [];
	    	ReactDOM.render(
	    		<div className="incident-ssh-detail rules-block">
	    			<CheckAllBox  plainOptions={options}
								  defaultCheckedList={defaultOptions} 
								  onSubChange={(checkedList) => this.setState({reject_list:checkedList})}/>,
	    		</div>,
    			document.getElementById('details'))
	    }else if(value === "incident-db"){

	    	//======================= 数据库连接 ==================================
	    	ReactDOM.render(
    			<div className="incident-db-detail rules-block">
    				<div className="rules-inline">
	    				<span>源IP: </span>
	    				<Input placeholder="请输入源IP" 
	    					   onChange={(e) => this.setState({db_details_src_ip:e.target.value})} />
    				</div>
    				<div className="rules-inline">
	    				<span>目的IP: </span>
	    				<Input placeholder="请输入目的IP" 
	    					   onChange={(e) => this.setState({db_details_dest_ip:e.target.value})} />
    				</div>
    				<div className="rules-inline">
	    				<span>端口号: </span>
	    				<Input placeholder="请输入端口号" 
	    					   onChange={(e) => this.setState({db_details_port:e.target.value})} />
    				</div>
    				<div className="rules-inline">
    					<span>方向: </span>
    					<Select defaultValue="in" name="db-derection" style={{ width: 120 }} 
    							onChange={(value) => this.setState({db_details_direction:value})} >
					      <Option value="in">进</Option>
					      <Option value="out">出</Option>
					    </Select>
					</div>
					<div className="rules-inline">
						<span>类型: </span>
						<Select defaultValue="generation_record" name="db-type" style={{ width: 120 }} 
    							onChange={(value) => this.setState({db_details_type:value})} >
			                <Option value ="generation_record">发生记录</Option>
			                <Option value ="no_alarm">禁止记录</Option>
			            </Select>
					</div>
					<div className="rules-inline" id="incident-db-detail-SQL">
	    				<span>SQL语句</span>
	    				<Input placeholder="请输入SQL语句，如SELECT *" 
	    					   onChange={(e) => this.setState({db_details_SQL:e.target.value})} />
    				</div>
    			</div>,
    			document.getElementById('details'))
	    }else if(value === "incident-ftp"){

	    	//======================= ftp连接 ==================================
	    	let options = ["FTP操作1","FTP操作2","FTP操作3","FTP操作4"];
	    	let defaultOptions = [];
	    	ReactDOM.render(
    			<div className="incident-ftp-detail">
    				<CheckAllBox  plainOptions={options}
								  defaultCheckedList={defaultOptions} 
								  onSubChange={(checkedList) => this.setState({ftp_operation_list:checkedList})}/>
    			</div>,
    			document.getElementById('details'))
	    }else{
	    	ReactDOM.render(
    			null,
    			document.getElementById('details'))
	    }
	}

	render(){
	    const columns = [{
			  title: '租户名',
			  dataIndex: 'name',
			  key: 'name',
			  align:"center",
			  width:120
			}, {
			  title: '管理的虚拟机',
			  dataIndex: 'VM',
			  key: 'VM',
			  align:"center",
			  render: (VMs,record) => 
			  		<CheckboxGroup style={{ width: '100%' }}
			  				   	   options = {VMs} 
			  				   	   onChange={(checkedValue) => this.ruleobjectChange(checkedValue,record.name)} />
			}];

		const data = [{
			  key: '1',
			  name: '租户1',
			  VM:['虚拟机11','虚拟机12','虚拟机13','虚拟机14','虚拟机15','虚拟机16','虚拟机17','虚拟机18']
			}, {
			  key: '2',
			  name: '租户2',
			  VM:['虚拟机21','虚拟机22'],
			}];


		return(
	        <div className="template"> 
	        	{/*
	        		========================   规则名称   ===============================
	        	*/}
	        	<div className="rules-block">
		            <span style={{ width: 100 }}>规则名称：</span>
		            <Input placeholder="请输入规则名称" onChange={(e) => this.setState({rulename:e.target.value})}></Input>
	            </div>
	            {/*
	        		========================   规则对象   ===============================
	        	*/}
	        	<div className="rules-block" style={{marginBottom:0}}>
	        		<span>作用对象：</span>
	        	</div>
	        	<div className="rules-block">
		            <Table columns={columns} dataSource={data} bordered pagination={false}/>		            
				</div>
			    {/*
	        		========================   告警类型   ===============================
	        	*/}
	        	<div className="rules-block">
		            <span>告警类型：</span>
		            <Select showSearch placeholder="选择告警类型"
		            		style={{width:200}}
		            		onChange={(value) => this.warningtypeChange(value)} >
			                <Option value ="index-warning">指标告警</Option>
			                <Option value ="incident-warning">事件告警</Option>
			        </Select>
		            <Button type="primary" style={{marginLeft:20}}>高级定制</Button>
				</div>
		        {/*
	        		========================   指标告警描述   ===============================
	        	*/}
	        	<div className="index-warning-type rules-block" style={{display:this.state.index_warning_display}}>
		            <span>指标告警描述：</span>
		            <Select showSearch placeholder="选择指标类型"
		            		style={{width:200}}
		            		onChange={(value) => this.setState({indextype:value})} >
			                <Option value ="index-rxnum">入包量（pps）</Option>
			                <Option value ="index-txnum">出包量（pps）</Option>
			                <Option value ="index-rxbw">入带宽（bps）</Option>
			                <Option value ="index-txbw">出带宽（bps）</Option>
			                <Option value ="index-tcpnum">TCP连接数（个/分钟）</Option>
			        </Select>
			         <Select showSearch placeholder="选择大小关系"
		            		style={{width:100}}
		            		onChange={(value) => this.setState({indexsymbol:value})} >
			                <Option value ="index-d">＞</Option>
			                <Option value ="index-x">＜</Option>
			                <Option value ="index-dy">=</Option>
			                <Option value ="index-dd">≥</Option>
			                <Option value ="index-xd">≤</Option>
			        </Select>
			        <InputNumber min={1} max={100} 
			        			 onChange={(value) => this.setState({indexnum:value})} />
		        </div>
	            {/*
	        		========================   事件告警描述   ===============================
	        	*/}
	        	<div className="incident-warning-type rules-block" style={{display:this.state.incident_warning_display}}>
		            <span>事件告警描述：</span>
		            <Select showSearch placeholder="选择事件类型"
		            		style={{width:200}}
		            		onChange={(value) => this.incidenttypeChange(value)} >
			                <Option value ="incident-ssh">SSH/Telnet连接</Option>
			                <Option value ="incident-scan">扫描攻击</Option>
			                <Option value ="incident-reject">拒绝服务攻击</Option>
			                <Option value ="incident-db">连接数据库</Option>
			                <Option value ="incident-ftp">FTP操作</Option>
			        </Select>
	            </div>
	            <div id="details" style={{display:this.state.incident_warning_display}}>	
	            </div>
	            {/*
	        		========================   生效时间   ===============================
	        	*/}
	        	<div className="rules-block">
		            <span className="rules-inline">生效时间：</span>
		            <TimePicker className="rules-inline"
		            			onChange={(value)=>this.setState({starttime:value})}
		            			clearText="选择开始时间" 
		            			format='HH:mm'
		            			defaultOpenValue={moment('00:00', 'HH:mm')} />
		            <TimePicker className="rules-inline"
		            			onChange={(value)=>this.setState({endtime:value})} 
		            			format='HH:mm'
		            			clearText="选择结束时间" 		       
		            			defaultOpenValue={moment('00:00', 'HH:mm')} />
	               
	            </div>
	            <Button className="rules-block" type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
	        </div>			
	        )
	}
}

export default Template