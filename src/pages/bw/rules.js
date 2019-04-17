import * as React from 'react'
import {Button,Table,Switch,Tag} from 'antd'
import {Link} from 'react-router-dom';
import './rules.css'



class Rules extends React.Component{
	constructor(){
		super();
		this.state = {
			rules:[],
		}
	}

	componentWillMount(){
		this._getdata();
	}

	_loadrules(){
		let rules = JSON.parse(localStorage.getItem('rules'));
	    return rules;
	}

	_getdata(){
		let rules = this._loadrules();
		console.log(rules);
		if(!rules) return null;
		let rulelist =  [];
		let index = 0;
		for(let i=0;i<rules.length;i++){
			let rule = rules[i];
			let rulename = rule.rulename;
			//根据类型提取有效信息
			let rule_content;
			if(rule.warningtype === 'index-warning'){
				rule_content = { warningtype:rule.warningtype,
								 indextype:rule.indextype,
								 indexnum:rule.indexnum,
								 indexsymbol:rule.indexsymbol,
								 starttime:rule.starttime,
								 endtime:rule.endtime };
			}else if(rule.warningtype === 'incident-warning'){
				switch(rule.incidenttype){
					case 'incident-ssh':
						rule_content = { warningtype:rule.warningtype,
										 incidenttype:rule.incidenttype,
										 ssh_details_src_ip:rule.ssh_details_src_ip,
							        	 ssh_details_dest_ip:rule.ssh_details_dest_ip,
							        	 ssh_details_port:rule.ssh_details_port,
							        	 ssh_details_direction:rule.ssh_details_direction,
							        	 ssh_details_type:rule.ssh_details_type,
										 starttime:rule.starttime,
										 endtime:rule.endtime };
						break;
					case 'incident-scan':
					 	rule_content = { warningtype:rule.warningtype,
										 incidenttype:rule.incidenttype,
										 scan_list:rule.scan_list,
										 starttime:rule.starttime,
										 endtime:rule.endtime };
						break;
					case 'incident-reject':
						rule_content = { warningtype:rule.warningtype,
										 incidenttype:rule.incidenttype,
										 reject_list:rule.reject_list,
										 starttime:rule.starttime,
										 endtime:rule.endtime };
						break;
					case 'incident-db':
						rule_content = { warningtype:rule.warningtype,
										 incidenttype:rule.incidenttype,
										 db_details_src_ip:rule.db_details_src_ip,
							        	 db_details_dest_ip:rule.db_details_dest_ip,
							        	 db_details_port:rule.db_details_port,
							        	 db_details_direction:rule.db_details_direction,
							        	 db_details_type:rule.db_details_type,
							        	 db_details_SQL:rule.db_details_SQL,
										 starttime:rule.starttime,
										 endtime:rule.endtime };
						break;
					case 'incident-ftp':
						rule_content = { warningtype:rule.warningtype,
										 incidenttype:rule.incidenttype,
										 ftp_operation_list:rule.ftp_operation_list,
										 starttime:rule.starttime,
										 endtime:rule.endtime };
						break;
					default:
						rule_content = null;
				}
			}
			let state = true;
			for(let j=0;j<rule.ruleobjects.length;j++){
				let object = rule.ruleobjects[j];
				let key = index;
				let username = object.name;
				let targets = object.VMs;
				if(targets.length!=0){
					rulelist.push({key:key,index:index,username:username,rulename:rulename,
								   targets:targets,rule_content:rule_content,state:state});
					index++;

				}
			}
		}
		this.setState({rules:rulelist});
		console.log(rulelist);
		return rulelist
	}

	hanldeSwitchClick(index){
		console.log(index);
		let state = this.state.rules[index].state;
		let rules = this.state.rules;
		rules[index].state = !state;
		this.setState({rules:rules});
	}

	render(){
		const columns = [{
			  title: '序号',
			  dataIndex: 'index',
			  key: 'index',
			  align:"center",
			},{
			  title: '租户名',
			  dataIndex: 'username',
			  key: 'username',
			  align:"center",
			},{
			  title: '规则名称',
			  dataIndex: 'rulename',
			  key: 'rulename',
			  align:"center",
			},{
			  title: '对象',
			  dataIndex: 'targets',
			  key: 'targets',
			  align:"center",
			  render:(targets) => {
			  	let target_cards = targets.map((target,index) => <Tag key={index} color="#108ee9">{target}</Tag>)
			  	return(<div>{target_cards}</div>)
			  }
			},{
			  title: '规则',
			  dataIndex: 'rule_content',
			  key: 'rule_content',
			  align:"center",
			  width:400,
			  render:(rule_content) => <p style={{overflow:"scroll",width:380}}>{JSON.stringify(rule_content)}</p>

			},{
			  title: '当前状态',
			  dataIndex: 'state',
			  key: 'state',
			  align:"center",
			  render:(state,record,index) => {
			  		return	<Switch checkedChildren="开" unCheckedChildren="关" 
			  						defaultChecked={state}
			  						onChange={this.hanldeSwitchClick.bind(this,index)} />
			  	}
			}];

		// const data = [{
		// 	  key: '1',
		// 	  index:'1',
		// 	  username: '租户1',
		// 	  rulename:"规则1",
		// 	  target:['虚拟机11','虚拟机12','虚拟机13','虚拟机14','虚拟机15','虚拟机16','虚拟机17','虚拟机18'],
		// 	  rule_content:"暂无",
		// 	  state:"关闭"
		// 	}]

		return(
			<div className="rules">
				<div className="rules-block block-top">
					<span className="rules-title">告警规则</span>
					<Link to="/bw/template">
						<Button type="primary">创建告警规则</Button>
					</Link>
				</div>
				<div className="rules-block">
		            <Table columns={columns} dataSource={this.state.rules} bordered pagination={false}/>		            
				</div>
			</div>
			)
	}
}

export default Rules