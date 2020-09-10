import React,{ useState, useEffect } from 'react'
import './App.css'
import { Button, Form, Label, Modal, Select, Grid } from 'semantic-ui-react'
import { createTask, getTasks, getTask, updateTask, getResources } from './apiAdmin'
import TaskNavBar from './TaskNavBar'
import moment from 'moment'
import { Link } from 'react-router-dom';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

let resourceOptions = []
const Tasks = () => {
	const [resources, setResources] = useState([])
	const [addOpen, setAddOpen] = useState(false)
	const [assignOpen, setAssignOpen] = useState(false)
	const [acceptOpen, setAcceptOpen] = useState(false)
	const [hourly, setHourly] = useState(false)
	const [slot, setSlot] = useState(false)
	const [currentRange, setNewRange] = useState([]);
  	const onChange = (event, data) => setNewRange(data.value);
	const [task, setTask] = useState({
		taskName: '',
		jobCode: '',
		priority: '',
		projectName: '',
		contractorName: '',
		folder: '',
		scope: [],
		status: 'Open',
		assignee: {
			_id: '',
			resourceName: '',
		},
		assignType: '',
		assignTime: '',
	})
	const [tasks, setTasks] = useState('')
	const [editTask, setEditTask] = useState({
		taskName1: '',
		jobCode1: '',
		priority1: '',
		projectName1: '',
		contractorName1: '',
		folder1: '',
		scope1: [],
		status1: '',
		assignee: {
			_id: '',
			resourceName: '',
		},
		assignType: '',
		assignTime: '',
		_id1: ''
	})


	const {
		taskName, jobCode, priority, projectName, contractorName, 
		folder, scope, status
	} = task

	const {
		taskName1, jobCode1, priority1, projectName1, contractorName1, 
		folder1, scope1, status1, assignee, assignType, assignTime, _id1
	} = editTask

	const loadTasks = () => {
		getTasks().then(data => {
			if (data.error) {
	            console.log(data.error)
	        } else {
	            setTasks(data)
	            console.log(data)
	        }
        })
	}

	const loadTask = taskId => {
		getTask(taskId).then(data => {
			if (data.error) {
	            console.log(data.error)
	        } else {
	            setEditTask({
	            	...editTask,
	            	taskName1: data.taskName,
					jobCode1: data.jobCode,
					priority1: data.priority,
					projectName1: data.projectName,
					contractorName1: data.contractorName,
					folder1: data.folder,
					scope1: data.scope,
					status1: data.status,
					_id1: data._id
	            })
	        }
        })
	}

	const loadResources = () => {
		getResources().then(data => {
			if (data.error) {
	            console.log(data.error)
	        } else {
		        data.map((resource, key) => {
		          var obj = {};
			      obj["value"] = resource._id;
			      obj["text"] = resource.resourceName;
			      resourceOptions.push(obj);
			      obj = {};
			      setResources(data)
		        });
		   	}
        })
	}

	useEffect(() => {
        loadTasks()
        loadResources()
    }, [])

	const handleChange = name => event => {
      setTask({ ...task, [name]: event.target.value }) 
      // moment.duration(myMomentObjectToConvert.format("HH:mm")).asMinutes() 
  	}

  	const handleChangeHour = event => {
      setEditTask({ ...editTask, assignTime: event.target.value }) 
      // moment.duration(myMomentObjectToConvert.format("HH:mm")).asMinutes() 
  	}
  	
  	const handleChangeScope = (event, {value}) => {
	  	setTask({...task, scope: value})
	}
	const handleChangePriority = (event, {value}) => {
	  	setTask({...task, priority: value})
	}
	const handleChangeAssignee = (event, {value}) => {
		console.log(value)
	  	setEditTask({...editTask, assignee: {
	  		_id: value, resourceName:event.target.textContent }

	  	})
	}
	const handleAssignType = (event, {value}) => {
		setEditTask({...editTask, assignType: value})
		if(value == 'Hourly') return setHourly(true), setSlot(false)
		else return setSlot(true), setHourly(false)
	}

	const clickAddSubmit = event => {
        event.preventDefault()
        setAddOpen(false)

        console.log(task)
       createTask(task).then(data => {
	        if (data.error) {
	            console.log(data.error)
	        } else {
	          setTask({
	            ...task,
	            taskName: '',
				jobCode: '',
				priority: '',
				projectName: '',
				contractorName: '',
				folder: '',
				scope: '',
				status: 'Open',
				assignee: {
					_id: '',
					resourceName: '',
				},
				assignType: '',
				assignTime: '',
	          });
	        }
      	});
       loadTasks()
    };

    const clickAssignSubmit = (e, taskId ) => {
    	e.preventDefault()
    	console.log(e, taskId)
    	updateTask(taskId, editTask).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setEditTask({
                    ...editTask,
                    taskName1: '',
					jobCode1: '',
					priority1: '',
					projectName1: '',
					contractorName1: '',
					folder1: '',
					scope1: [],
					status1: '',
					assignee: {
						_id: '',
						resourceName: '',
					},
					assignType: '',
					assignTime: '',
					_id1: ''
                });
            }
        });
        setAssignOpen(false)
    }

	const priorityOptions = [
	  { key: 'High', text: 'High', value: 'High' },
	  { key: 'Medium', text: 'Medium', value: 'Medium' },
	  { key: 'Low', text: 'Low', value: 'Low' }, 
	]

	const scopeOptions = [
	  { key: "Quotation", text: "Quotation", value: "Quotation" },
	  { key: 'Costing Sheet', text: 'Costing Sheet', value: 'Costing Sheet' },
	  { key: 'Compliance', text: 'Compliance', value: 'Compliance' },
	  { key: 'Submittal', text: 'Submittal', value: 'Submittal' },
	  { key: 'Reply to comments', text: 'Reply to comments', value: 'Reply to comments' },
	  { key: 'Selection', text: 'Selection', value: 'Selection' },
	  { key: 'Technical Data Sheet', text: 'Technical Data Sheet', value: 'Technical Data Sheet' },
	  { key: 'Drawing', text: 'Drawing', value: 'Drawing' },
	  { key: 'Others', text: 'Others', value: 'Others' } 
	]

	const assignOptions = [
	  { key: 'Hourly', text: 'Hourly', value: 'Hourly' },
	  { key: 'Slot', text: 'Slot', value: 'Slot' }
	]

	const taskList = () => {
		return tasks !== '' ? (
		    <div>
		    {tasks.map((item, i) => 
		    	<div id="Component_1305__14" class="Component_1305___14">
				<div id="Rectangle_3391_el" class="Rectangle_3391_el">
					<div id="Created_by">
						<span>Admin</span>
					</div>
					<div id="assistant-24px" class="assistant_24px">
						<svg class="Path_15734" viewBox="0 0 16 16">
							<path id="Path_15734" d="M 0 0 L 16 0 L 16 16 L 0 16 L 0 0 Z">
							</path>
						</svg>
						<svg class="Path_15735" viewBox="3 2 12 14">
							<path id="Path_15735" d="M 13.66666698455811 2 L 4.333333492279053 2 C 3.599999904632568 2 3 2.600000143051147 3 3.333333253860474 L 3 12.66666698455811 C 3 13.39999961853027 3.599999904632568 13.99999904632568 4.333333492279053 13.99999904632568 L 7 13.99999904632568 L 9 16 L 11 13.99999904632568 L 13.66666698455811 13.99999904632568 C 14.40000057220459 13.99999904632568 15 13.39999961853027 15 12.66666698455811 L 15 3.333333253860474 C 15 2.600000143051147 14.40000057220459 2 13.66666698455811 2 Z M 13.66666698455811 12.66666698455811 L 10.4466667175293 12.66666698455811 L 10.0533332824707 13.05999946594238 L 9 14.11333274841309 L 7.940000057220459 13.0533332824707 L 7.553333282470703 12.66666698455811 L 4.333333492279053 12.66666698455811 L 4.333333492279053 3.333333253860474 L 13.66666698455811 3.333333253860474 L 13.66666698455811 12.66666698455811 Z M 9 11.99999904632568 L 10.25333404541016 9.25333309173584 L 13 8 L 10.25333404541016 6.746666431427002 L 9 4 L 7.746666431427002 6.746666431427002 L 5 8 L 7.746666431427002 9.25333309173584 L 9 11.99999904632568 Z">
							</path>
						</svg>
					</div>
					<div id="Group_13978_er">
						<div id="ID_Pm_es">
							<span>{moment(item.createdAt).format('LT')},</span>
						</div>
						<div id="ID_et">
							<span>{moment(item.createdAt).format('L')}</span>
						</div>
						// <div id="Clock_eu">
						// 	<svg class="Path_13_ev" viewBox="0 0 10.84 10.84">
						// 		<path id="Path_13_ev" d="M 1.626013278961182 1.626013278961182 C 2.619688034057617 0.5420044660568237 3.884365081787109 0 5.4200439453125 0 C 6.955722808837891 0 8.220400810241699 0.5420044660568237 9.214075088500977 1.626013278961182 C 10.29808330535889 2.619688034057617 10.840087890625 3.884365081787109 10.840087890625 5.4200439453125 C 10.840087890625 6.955722808837891 10.29808330535889 8.220400810241699 9.214075088500977 9.214075088500977 C 8.220400810241699 10.29808330535889 6.955722808837891 10.840087890625 5.4200439453125 10.840087890625 C 3.884365081787109 10.840087890625 2.619688034057617 10.29808330535889 1.626013398170471 9.214075088500977 C 0.6323387622833252 8.13006591796875 0 6.955722808837891 0 5.4200439453125 C 0 3.884365081787109 0.5420044660568237 2.619688034057617 1.626013278961182 1.626013278961182 Z M 7.859064102172852 7.859064102172852 L 8.491401672363281 7.226725578308105 L 6.23305082321167 4.968373775482178 L 5.4200439453125 1.355010986328125 L 4.516703605651855 1.355010986328125 L 4.516703605651855 5.4200439453125 C 4.516703605651855 5.691046714782715 4.607037544250488 5.87171459197998 4.787705898284912 6.052382469177246 C 4.787705898284912 6.052382469177246 4.878039836883545 6.142716407775879 4.968373775482178 6.142716407775879 L 7.859064102172852 7.859064102172852 Z">
						// 		</path>
						// 	</svg>
						// </div>
					</div>
					{
						item.assignee.resourceName == '' ? (
						<div id="Task_name_comes_here">
							<span>{item.taskName}</span>
						</div>
						): (
						<div>
							<Modal
						      className="assignModal"
						      as={Form}
						      trigger={<div onClick={() => {
						      	getTask(item._id).then(data => {
									if (data.error) {
							            console.log(data.error)
							        } else {
							            setEditTask({
							            	...editTask,
							            	taskName1: data.taskName,
											jobCode1: data.jobCode,
											priority1: data.priority,
											projectName1: data.projectName,
											contractorName1: data.contractorName,
											folder1: data.folder,
											scope1: data.scope,
											status1: data.status,
											assignee: {
												_id: data.assignee._id,
												resourceName: data.assignee.resourceName,
											},
											assignType: data.assignType,
											assignTime: data.assignTime,
											_id1: data._id
							            })
							        }
						        })
						      }}id="Task_name_comes_here">
										<span>{item.taskName}</span>
									</div>}
							onClose={() => setAcceptOpen(false)}
					        onOpen={() => setAcceptOpen(true)}
					        open={item._id == _id1 ? acceptOpen: null}
					 		>
						    >
						    <Modal.Content>
						    	<div id="Created_by">
									<span>Admin</span>
								</div>
								<div id="Group_13978_er">
									<div id="ID_Pm_es">
										<span>{moment(item.createdAt).format('LT')},</span>
									</div>
									<div id="ID_et">
										<span>{moment(item.createdAt).format('L')}</span>
									</div>
									<div id="Clock_eu">
										<svg class="Path_13_ev" viewBox="0 0 10.84 10.84">
											<path id="Path_13_ev" d="M 1.626013278961182 1.626013278961182 C 2.619688034057617 0.5420044660568237 3.884365081787109 0 5.4200439453125 0 C 6.955722808837891 0 8.220400810241699 0.5420044660568237 9.214075088500977 1.626013278961182 C 10.29808330535889 2.619688034057617 10.840087890625 3.884365081787109 10.840087890625 5.4200439453125 C 10.840087890625 6.955722808837891 10.29808330535889 8.220400810241699 9.214075088500977 9.214075088500977 C 8.220400810241699 10.29808330535889 6.955722808837891 10.840087890625 5.4200439453125 10.840087890625 C 3.884365081787109 10.840087890625 2.619688034057617 10.29808330535889 1.626013398170471 9.214075088500977 C 0.6323387622833252 8.13006591796875 0 6.955722808837891 0 5.4200439453125 C 0 3.884365081787109 0.5420044660568237 2.619688034057617 1.626013278961182 1.626013278961182 Z M 7.859064102172852 7.859064102172852 L 8.491401672363281 7.226725578308105 L 6.23305082321167 4.968373775482178 L 5.4200439453125 1.355010986328125 L 4.516703605651855 1.355010986328125 L 4.516703605651855 5.4200439453125 C 4.516703605651855 5.691046714782715 4.607037544250488 5.87171459197998 4.787705898284912 6.052382469177246 C 4.787705898284912 6.052382469177246 4.878039836883545 6.142716407775879 4.968373775482178 6.142716407775879 L 7.859064102172852 7.859064102172852 Z">
											</path>
										</svg>
									</div>
								</div>
								<div style={{left:"40px"}} id="Task_name_comes_here">
									<span>{taskName1}</span>
								</div>
								<div style={{left:"40px"}} id="Task_Code_ex">
									<span>Task Code</span>
								</div>
								<div style={{left:"40px"}}id="ID11GFY66_e">
									<span>{_id1}</span>
								</div>
								<div style={{left:"315px"}} id="Job_Code_e">
									<span>Job Code</span>
								</div>
								<div style={{left:"315px"}} id="ID11GFY66_fa">
									<span>{jobCode1}</span>
								</div>
								<div style={{left:"580px"}} id="Project_ew">
									<span>Project</span>
								</div>
								<div style={{left:"580px"}} id="Project_name_">
									<span>{projectName1}</span>
								</div>
								<div style={{left:"40px"}}id="Contractor_ez">
									<span>Contractor</span>
								</div>
								<div style={{left:"40px"}} id="Contractor_name_">
									<span>{item.contractorName}</span>
								</div>
								<div style={{left:"315px"}} id="Scope_of_work_ey">
									<span>Scope of work</span>
								</div>
								<div style={{left:"315px"}} id="Scope_of_work_">
									<span>{item.scope.join(', ')}</span>
								</div>

								<div id="Priority_eo" style={{left: "40px", top: "270px"}}>
									<span>Priority:</span>
								</div>
								{priority1 == "High" ? (
									<svg class="Ellipse_770_ft" style={{left: "94px", top: "274px"}}>
										<ellipse id="Ellipse_770_ft" rx="4" ry="4" cx="4" cy="4">
										</ellipse>
									</svg>
								): priority1 == "Medium" ?  (
									<svg class="Ellipse_770" style={{left: "94px", top: "274px"}}>
										<ellipse id="Ellipse_770" rx="4" ry="4" cx="4" cy="4">
										</ellipse>
									</svg>
								): priority1 == "Low" ?  (
								<svg class="Ellipse_770_c" style={{left: "94px", top: "274px"}}>
									<ellipse id="Ellipse_770_c" rx="4" ry="4" cx="4" cy="4">
									</ellipse>
								</svg>
								): null}
								
								<div id="High__ep" style={{left: "104px", top: "270px"}}>
									<span>{priority1}</span>
								</div>
								<div style={{top: "270px", right: "35px" }} id="Component_1313__1" class="Component_1313___1">
									<a href={item.folder}><div id="View_files">
										<span>View files</span>
									</div></a>
									<div id="folder-24px">
										<svg class="Path_15739" viewBox="0 0 20.203 20.203">
											<path id="Path_15739" d="M 0 0 L 20.2025146484375 0 L 20.2025146484375 20.2025146484375 L 0 20.2025146484375 L 0 0 Z">
											</path>
										</svg>
										<svg class="Path_15740" viewBox="2 4 16.835 13.468">
											<path id="Path_15740" d="M 8.734170913696289 4 L 3.683542728424072 4 C 2.757594347000122 4 2.00841760635376 4.757594108581543 2.00841760635376 5.683542728424072 L 2 15.78480052947998 C 2 16.71074867248535 2.757594347000122 17.46834182739258 3.683542728424072 17.46834182739258 L 17.15188598632813 17.46834182739258 C 18.07783508300781 17.46834182739258 18.83542823791504 16.71074867248535 18.83542823791504 15.78480052947998 L 18.83542823791504 7.367085456848145 C 18.83542823791504 6.441136837005615 18.07783508300781 5.683542728424072 17.15188598632813 5.683542728424072 L 10.41771411895752 5.683542728424072 L 8.734170913696289 4 Z">
											</path>
										</svg>
									</div>
								</div>
								<div className="assignLine"></div>
								<div id="Task_assign">
									<span>Task Status</span>
								</div>
								<div id="Assigned_By">
									<span>Assigned By:</span>
								</div>
								<div id="Assigned_Byname">
									<span>Admin</span>
								</div>
								<div id="Due">
									<span>Due:</span>
								</div>
								<div id="ID400_Hrs">
									<span>{item.assignTime}:00 Hrs</span>
								</div>
								<div id="Will_be_counted_once_task_begi">
									<span>(Will be counted once task begins)</span>
								</div>
								<div id="Task_Duration">
									<span>Task Duration:</span>
								</div>
								<div id="ID400_Hrs_ip">
									<span>{item.assignTime}:00 Hrs</span>
								</div>
								<div id="Revise_duration">
									<span>Revise duration?</span>
								</div>
								<div id="Component_1341__1" class="Component_1341___1">
									
									<svg class="Rectangle_3415">
										<rect id="Rectangle_3415" rx="6" ry="6" x="0" y="0" width="877" height="126">
										</rect>
									</svg>
									<div id="Add_your_comments_tag_users">
										<span>Add your comments, tag @users…</span>
									</div>
									<div id="attach_file-24px">
										<svg class="Path_17511" viewBox="0 0 22.143 19.242">
											<path id="Path_17511" d="M 0 0 L 22.14313316345215 0 L 22.14313316345215 19.24167633056641 L 0 19.24167633056641 L 0 0 Z">
											</path>
										</svg>
										<svg class="Path_17512" viewBox="7 1 10.149 17.638">
											<path id="Path_17512" d="M 15.76499176025391 5.008682727813721 L 15.76499176025391 14.22865295410156 C 15.76499176025391 16.00049018859863 14.11348152160645 17.43559837341309 12.0744686126709 17.43559837341309 C 10.03545475006104 17.43559837341309 8.383945465087891 16.00049018859863 8.383945465087891 14.22865295410156 L 8.383945465087891 4.206945896148682 C 8.383945465087891 3.100549697875977 9.417292594909668 2.2026047706604 10.69052219390869 2.2026047706604 C 11.96375274658203 2.2026047706604 12.99709796905518 3.100549697875977 12.99709796905518 4.206945896148682 L 12.99709796905518 12.62517929077148 C 12.99709796905518 13.06613349914551 12.58191394805908 13.42691612243652 12.0744686126709 13.42691612243652 C 11.56702041625977 13.42691612243652 11.15183734893799 13.06613349914551 11.15183734893799 12.62517929077148 L 11.15183734893799 5.008682727813721 L 9.767891883850098 5.008682727813721 L 9.767891883850098 12.62517929077148 C 9.767891883850098 13.73157596588135 10.80123710632324 14.62952041625977 12.0744686126709 14.62952041625977 C 13.34769916534424 14.62952041625977 14.38104438781738 13.73157596588135 14.38104438781738 12.62517929077148 L 14.38104438781738 4.206945896148682 C 14.38104438781738 2.435108184814453 12.72953605651855 0.9999999403953552 10.69052219390869 0.9999999403953552 C 8.651508331298828 0.9999999403953552 7 2.435108184814453 7 4.206945896148682 L 7 14.22865295410156 C 7 16.66593170166016 9.269671440124512 18.63820457458496 12.0744686126709 18.63820457458496 C 14.87926387786865 18.63820457458496 17.14893531799316 16.66593170166016 17.14893531799316 14.22865295410156 L 17.14893531799316 5.008682727813721 L 15.76499176025391 5.008682727813721 Z">
											</path>
										</svg>
									</div>
									<div id="add_photo_alternate-24px_1">
										<svg class="Path_17517" viewBox="0 0 22.143 19.242">
											<path id="Path_17517" d="M 0 0 L 22.14313316345215 0 L 22.14313316345215 19.24167633056641 L 0 19.24167633056641 L 0 0 Z">
											</path>
										</svg>
										<svg class="Path_17518" viewBox="2 1 19.375 16.836">
											<path id="Path_17518" d="M 16.7620906829834 16.23299407958984 L 3.845260620117188 16.23299407958984 L 3.845260620117188 5.008682727813721 L 12.14893627166748 5.008682727813721 L 12.14893627166748 3.405209302902222 L 3.845260620117188 3.405209302902222 C 2.830367565155029 3.405209302902222 1.999999761581421 4.126772403717041 1.999999761581421 5.008682727813721 L 1.999999761581421 16.23299407958984 C 1.999999761581421 17.11490440368652 2.830367565155029 17.83646774291992 3.845260620117188 17.83646774291992 L 16.7620906829834 17.83646774291992 C 17.7769832611084 17.83646774291992 18.60735130310059 17.11490440368652 18.60735130310059 16.23299407958984 L 18.60735130310059 9.017366409301758 L 16.7620906829834 9.017366409301758 L 16.7620906829834 16.23299407958984 Z M 9.574797630310059 13.69148921966553 L 7.766440868377686 11.79939079284668 L 5.229207038879395 14.62952041625977 L 15.37814331054688 14.62952041625977 L 12.11203193664551 10.85334205627441 L 9.574797630310059 13.69148921966553 Z M 18.60735130310059 3.405209302902222 L 18.60735130310059 0.9999999403953552 L 16.7620906829834 0.9999999403953552 L 16.7620906829834 3.405209302902222 L 13.99419784545898 3.405209302902222 C 14.0034236907959 3.413227319717407 13.99419784545898 5.008682727813721 13.99419784545898 5.008682727813721 L 16.7620906829834 5.008682727813721 L 16.7620906829834 7.405875205993652 C 16.77131652832031 7.413892269134521 18.60735130310059 7.405875205993652 18.60735130310059 7.405875205993652 L 18.60735130310059 5.008682727813721 L 21.37524223327637 5.008682727813721 L 21.37524223327637 3.405209302902222 L 18.60735130310059 3.405209302902222 Z">
											</path>
										</svg>
									</div>
									<div id="create_new_folder-24px">
										<svg class="Path_17519" viewBox="0 0 19.243 19.242">
											<path id="Path_17519" d="M 0 0 L 19.24258422851563 0 L 19.24258422851563 19.2421875 L 0 19.2421875 L 0 0 Z">
											</path>
										</svg>
										<svg class="Path_17520" viewBox="2 4 16.035 12.828">
											<path id="Path_17520" d="M 16.43193817138672 5.603515625 L 10.01774215698242 5.603515625 L 8.414194107055664 3.999999761581421 L 3.603548765182495 3.999999761581421 C 2.713578939437866 3.999999761581421 2.008017778396606 4.713564395904541 2.008017778396606 5.603515625 L 2 15.224609375 C 2 16.11456108093262 2.713578939437866 16.828125 3.603548765182495 16.828125 L 16.43193817138672 16.828125 C 17.32190895080566 16.828125 18.03548812866211 16.11456108093262 18.03548812866211 15.224609375 L 18.03548812866211 7.20703125 C 18.03548812866211 6.317080020904541 17.32190895080566 5.603515625 16.43193817138672 5.603515625 Z M 16.43193817138672 15.224609375 L 3.603548765182495 15.224609375 L 3.603548765182495 5.603515625 L 7.748722553253174 5.603515625 L 9.352270126342773 7.20703125 L 16.43193817138672 7.20703125 L 16.43193817138672 15.224609375 Z M 10.01774215698242 12.01757717132568 L 11.62129211425781 12.01757717132568 L 11.62129211425781 13.62109375 L 13.22484111785889 13.62109375 L 13.22484111785889 12.01757717132568 L 14.82838916778564 12.01757717132568 L 14.82838916778564 10.4140625 L 13.22484111785889 10.4140625 L 13.22484111785889 8.810546875 L 11.62129211425781 8.810546875 L 11.62129211425781 10.4140625 L 10.01774215698242 10.4140625 L 10.01774215698242 12.01757717132568 Z">
											</path>
										</svg>
									</div>
									<div id="Component_1343__1" class="Component_1343___1">
										<div id="Component_1342__1" class="Component_1342___1">
											<svg class="Rectangle_3436">
												<rect id="Rectangle_3436" rx="4" ry="4" x="0" y="0" width="18" height="18">
												</rect>
											</svg>
										</div>
										<div id="Completed">
											<span>Completed</span>
										</div>
									</div>
									<div id="Component_1343__2" class="Component_1343___2">
										<div id="Component_1342__1_jf" class="Component_1342___1">
											<svg class="Rectangle_3436_jg">
												<rect id="Rectangle_3436_jg" rx="4" ry="4" x="0" y="0" width="18" height="18">
												</rect>
											</svg>
										</div>
										<div id="Pending_RFI">
											<span>Pending RFI</span>
										</div>
									</div>
								</div>
								<div style={{bottom:"14px"}} onClick={()=> setAcceptOpen(false)} id="cancelAssign">
									<span>Cancel</span>
								</div>
								<div style={{bottom:"10px"}} id="Component_1262__13" class="Component_1262___13">
									<Button  onClick = {()=> setAcceptOpen=(false)}
									primary >Assign</Button>
								</div>
							</Modal.Content>
						    </Modal >
						</div>
						)
					}

					
					<div id="Task_Code_ex">
						<span>Task Code</span>
					</div>	
				</div>
				<div id="ID11GFY66_e">
					<span>{item._id}</span>
				</div>
				<div id="Contractor_ez">
					<span>Contractor</span>
				</div>
				<div id="Contractor_name_">
					<span>{item.contractorName}</span>
				</div>
				<div id="Job_Code_e">
					<span>Job Code</span>
				</div>
				<div id="ID11GFY66_fa">
					<span>{item.jobCode}</span>
				</div>
				<div id="Project_ew">
					<span>Project</span>
				</div>
				<div id="Project_name_">
					<span>{item.projectName}</span>
				</div>
				<div id="Scope_of_work_ey">
					<span>Scope of work</span>
				</div>
				<div id="Scope_of_work_">
					<span>{item.scope.join(', ')}</span>
				</div>
				<div className="hrLine"></div>
				{
					item.assignee.resourceName !== '' ? (
					<div>
						<div id="Assigned_to">
							<span>Assigned to</span>
						</div>
						<div id="assignedName">
							<span>@{item.assignee.resourceName}</span>
						</div>
					</div>
					): item.assignee.resourceName == '' ? (
					<div id="Group_13980">
						<Modal
					      className="assignModal"
					      as={Form}
					      trigger={<div onClick={() => {
					      	getTask(item._id).then(data => {
								if (data.error) {
						            console.log(data.error)
						        } else {
						            setEditTask({
						            	...editTask,
						            	taskName1: data.taskName,
										jobCode1: data.jobCode,
										priority1: data.priority,
										projectName1: data.projectName,
										contractorName1: data.contractorName,
										folder1: data.folder,
										scope1: data.scope,
										status1: data.status,
										_id1: data._id
						            })
						        }
					        })
					      }}id="Assign_this_task">
									<span>Assign this task</span>
								</div>}
						onClose={() => setAssignOpen(false)}
				        onOpen={() => setAssignOpen(true)}
				        open={item._id == _id1 ? assignOpen: null}
				        onSubmit={e => clickAssignSubmit(e, _id1)}>
					    >
					    	<Modal.Content>
						    	<div id="Created_by">
									<span>Admin</span>
								</div>
								<div id="Group_13978_er">
									<div id="ID_Pm_es">
										<span>{moment(item.createdAt).format('LT')},</span>
									</div>
									<div id="ID_et">
										<span>{moment(item.createdAt).format('L')}</span>
									</div>
									<div id="Clock_eu">
										<svg class="Path_13_ev" viewBox="0 0 10.84 10.84">
											<path id="Path_13_ev" d="M 1.626013278961182 1.626013278961182 C 2.619688034057617 0.5420044660568237 3.884365081787109 0 5.4200439453125 0 C 6.955722808837891 0 8.220400810241699 0.5420044660568237 9.214075088500977 1.626013278961182 C 10.29808330535889 2.619688034057617 10.840087890625 3.884365081787109 10.840087890625 5.4200439453125 C 10.840087890625 6.955722808837891 10.29808330535889 8.220400810241699 9.214075088500977 9.214075088500977 C 8.220400810241699 10.29808330535889 6.955722808837891 10.840087890625 5.4200439453125 10.840087890625 C 3.884365081787109 10.840087890625 2.619688034057617 10.29808330535889 1.626013398170471 9.214075088500977 C 0.6323387622833252 8.13006591796875 0 6.955722808837891 0 5.4200439453125 C 0 3.884365081787109 0.5420044660568237 2.619688034057617 1.626013278961182 1.626013278961182 Z M 7.859064102172852 7.859064102172852 L 8.491401672363281 7.226725578308105 L 6.23305082321167 4.968373775482178 L 5.4200439453125 1.355010986328125 L 4.516703605651855 1.355010986328125 L 4.516703605651855 5.4200439453125 C 4.516703605651855 5.691046714782715 4.607037544250488 5.87171459197998 4.787705898284912 6.052382469177246 C 4.787705898284912 6.052382469177246 4.878039836883545 6.142716407775879 4.968373775482178 6.142716407775879 L 7.859064102172852 7.859064102172852 Z">
											</path>
										</svg>
									</div>
								</div>
								<div style={{left:"40px"}} id="Task_name_comes_here">
									<span>{taskName1}</span>
								</div>
								<div style={{left:"40px"}} id="Task_Code_ex">
									<span>Task Code</span>
								</div>
								<div style={{left:"40px"}}id="ID11GFY66_e">
									<span>{_id1}</span>
								</div>
								<div style={{left:"315px"}} id="Job_Code_e">
									<span>Job Code</span>
								</div>
								<div style={{left:"315px"}} id="ID11GFY66_fa">
									<span>{jobCode1}</span>
								</div>
								<div style={{left:"580px"}} id="Project_ew">
									<span>Project</span>
								</div>
								<div style={{left:"580px"}} id="Project_name_">
									<span>{projectName1}</span>
								</div>
								<div style={{left:"40px"}}id="Contractor_ez">
									<span>Contractor</span>
								</div>
								<div style={{left:"40px"}} id="Contractor_name_">
									<span>{item.contractorName}</span>
								</div>
								<div style={{left:"315px"}} id="Scope_of_work_ey">
									<span>Scope of work</span>
								</div>
								<div style={{left:"315px"}} id="Scope_of_work_">
									<span>{item.scope.join(', ')}</span>
								</div>

								<div id="Priority_eo" style={{left: "40px", top: "270px"}}>
									<span>Priority:</span>
								</div>
								{priority1 == "High" ? (
									<svg class="Ellipse_770_ft" style={{left: "94px", top: "274px"}}>
										<ellipse id="Ellipse_770_ft" rx="4" ry="4" cx="4" cy="4">
										</ellipse>
									</svg>
								): priority1 == "Medium" ?  (
									<svg class="Ellipse_770" style={{left: "94px", top: "274px"}}>
										<ellipse id="Ellipse_770" rx="4" ry="4" cx="4" cy="4">
										</ellipse>
									</svg>
								): priority1 == "Low" ?  (
								<svg class="Ellipse_770_c" style={{left: "94px", top: "274px"}}>
									<ellipse id="Ellipse_770_c" rx="4" ry="4" cx="4" cy="4">
									</ellipse>
								</svg>
								): null}
								
								<div id="High__ep" style={{left: "104px", top: "270px"}}>
									<span>{priority1}</span>
								</div>
								<div style={{top: "270px", right: "35px" }} id="Component_1313__1" class="Component_1313___1">
									<a href={item.folder}><div id="View_files">
										<span>View files</span>
									</div></a>
									<div id="folder-24px">
										<svg class="Path_15739" viewBox="0 0 20.203 20.203">
											<path id="Path_15739" d="M 0 0 L 20.2025146484375 0 L 20.2025146484375 20.2025146484375 L 0 20.2025146484375 L 0 0 Z">
											</path>
										</svg>
										<svg class="Path_15740" viewBox="2 4 16.835 13.468">
											<path id="Path_15740" d="M 8.734170913696289 4 L 3.683542728424072 4 C 2.757594347000122 4 2.00841760635376 4.757594108581543 2.00841760635376 5.683542728424072 L 2 15.78480052947998 C 2 16.71074867248535 2.757594347000122 17.46834182739258 3.683542728424072 17.46834182739258 L 17.15188598632813 17.46834182739258 C 18.07783508300781 17.46834182739258 18.83542823791504 16.71074867248535 18.83542823791504 15.78480052947998 L 18.83542823791504 7.367085456848145 C 18.83542823791504 6.441136837005615 18.07783508300781 5.683542728424072 17.15188598632813 5.683542728424072 L 10.41771411895752 5.683542728424072 L 8.734170913696289 4 Z">
											</path>
										</svg>
									</div>
								</div>
								<div className="assignLine"></div>
								<div id="Task_assign">
									<span>Task assign</span>
								</div>
								<div id="Select_a_moderator">
									<span>Select a moderator below to assign tasks</span>
								</div>
								<Form className="assignForm">
									<Grid columns={2} style={{marginBottom: "10px !important"}}>
											<Grid.Column>
												<Form.Field  onChange={handleChangeAssignee} value={resources._id} control={Select} label='Assignee*' options={resourceOptions} placeholder='Select'/>
											</Grid.Column>
											<Grid.Column>
												<Form.Field  onChange={handleAssignType} value={assignType} control={Select} label='Assign Type*' options={assignOptions} placeholder='Select'/>   
											</Grid.Column>
									</Grid>
									{
										hourly ? (
											<Grid columns={2}>
													<Grid.Column>
														<Form.Input onChange={handleChangeHour} value={assignTime} style={{width: "90px"}} fluid label='Hourly*' placeholder='Eg. 1 or 4' />
													</Grid.Column>
													<Grid.Column>
													</Grid.Column>
											</Grid>
											): null
									}
									{
										slot ? (
										<Grid columns={3} >
										<Grid.Column>
											<SemanticDatepicker label="Start Date"  onChange={onChange}  />
										</Grid.Column>
										<Grid.Column>
											<SemanticDatepicker label="End Date" onChange={onChange}  />
										</Grid.Column>
										<Grid.Column>
											<Form.Input   fluid label='Start Time*' placeholder='Eg. 9:30' />
										</Grid.Column>
										<Grid.Column>
											<Form.Input   fluid label='End Time*' placeholder='Eg. 4:30' />
										</Grid.Column>
										
									</Grid>
										): null
									}
									
								</Form>
								<div onClick={()=> setAssignOpen(false)} id="cancelAssign">
									<span>Cancel</span>
								</div>
								<div id="Component_1262__13" class="Component_1262___13">
									<Button onClick = {()=> setTimeout(() => {
									loadTasks()}, 2000)}
									primary content='Submit'>Assign</Button>
								</div>
							</Modal.Content>
					    </Modal>

						<div id="done_all">
							<svg class="Path_95725" viewBox="0 0 24 24">
								<path id="Path_95725" d="M 0 0 L 24 0 L 24 24 L 0 24 L 0 0 Z">
								</path>
							</svg>
							<svg class="Path_95726" viewBox="0.41 5.59 23.25 13.41">
								<path id="Path_95726" d="M 18 7 L 16.59000015258789 5.590000152587891 L 10.25 11.93000030517578 L 11.65999984741211 13.34000015258789 L 18 7 Z M 22.23999977111816 5.590000152587891 L 11.65999984741211 16.17000007629395 L 7.480000019073486 12 L 6.070000171661377 13.40999984741211 L 11.65999984741211 19 L 23.65999984741211 7 L 22.23999977111816 5.590000152587891 Z M 0.4099999964237213 13.40999984741211 L 6 19 L 7.409999847412109 17.59000015258789 L 1.830000042915344 12 L 0.4099999964237213 13.40999984741211 Z">
								</path>
							</svg>
						</div>
					</div>
					): null
				}
				
				

				<div style={{left: "250px"}} id="Component_1313__1" class="Component_1313___1">
					<a href={item.folder}><div id="View_files">
						<span>View files</span>
					</div></a>
					<div id="folder-24px">
						<svg class="Path_15739" viewBox="0 0 20.203 20.203">
							<path id="Path_15739" d="M 0 0 L 20.2025146484375 0 L 20.2025146484375 20.2025146484375 L 0 20.2025146484375 L 0 0 Z">
							</path>
						</svg>
						<svg class="Path_15740" viewBox="2 4 16.835 13.468">
							<path id="Path_15740" d="M 8.734170913696289 4 L 3.683542728424072 4 C 2.757594347000122 4 2.00841760635376 4.757594108581543 2.00841760635376 5.683542728424072 L 2 15.78480052947998 C 2 16.71074867248535 2.757594347000122 17.46834182739258 3.683542728424072 17.46834182739258 L 17.15188598632813 17.46834182739258 C 18.07783508300781 17.46834182739258 18.83542823791504 16.71074867248535 18.83542823791504 15.78480052947998 L 18.83542823791504 7.367085456848145 C 18.83542823791504 6.441136837005615 18.07783508300781 5.683542728424072 17.15188598632813 5.683542728424072 L 10.41771411895752 5.683542728424072 L 8.734170913696289 4 Z">
							</path>
						</svg>
					</div>
				</div>
				<div id="Priority_eo">
					<span>Priority:</span>
				</div>
				{item.priority == "High" ? (
					<svg class="Ellipse_770_ft">
						<ellipse id="Ellipse_770_ft" rx="4" ry="4" cx="4" cy="4">
						</ellipse>
					</svg>
				): item.priority == "Medium" ?  (
					<svg class="Ellipse_770">
						<ellipse id="Ellipse_770" rx="4" ry="4" cx="4" cy="4">
						</ellipse>
					</svg>
				): item.priority == "Low" ?  (
				<svg class="Ellipse_770_c">
					<ellipse id="Ellipse_770_c" rx="4" ry="4" cx="4" cy="4">
					</ellipse>
				</svg>
				): null}
				
				<div id="High__ep">
					<span>{item.priority}</span>
				</div>
				<div id="Component_1313__11_fq" class="Component_1313___11">
					<div id="Rectangle_3412_fr">
						<span>{item.status}</span>
					</div>
				</div>
			</div>
		    )}
		    </div>
		  ): null
	}


  return (
  	<React.Fragment>
  		<TaskNavBar taskCount={tasks ? tasks.length : 0}/>
			<div id="Component_1295__11" class="Component_1295___11">
				<div id="Rectangle_3325z" class="Rectangle_3325z" style={{width:"800px", height:"138px"}}>
						<Modal
					        trigger={<div id="Rectangle_2233_ju" class="Rectangle_2233_ju" style={{width:"630px", height:"90px"}}>
							</div>}
							onClose={() => setAddOpen(false)}
					        onOpen={() => setAddOpen(true)}
					        open={addOpen}
					        size='small'
					        as={Form} 
					        onSubmit={event => clickAddSubmit(event)}	
						><Modal.Content>
								<Form style={{marginLeft:"25px", marginBottom:"50px"}}>
									<Form.Input onChange={handleChange('taskName')} value={taskName} fluid label='Task Name*' placeholder='Floor Drawings' />
									<Grid columns={2}>
											<Grid.Column>
													<Form.Input onChange={handleChange('jobCode')} value={jobCode} label='Job Code*' placeholder='Eg.11GFY66' />
											</Grid.Column>
											<Grid.Column>
												<Form.Field onChange={handleChangePriority} value={priority} control={Select} label='Priority Type *' options={priorityOptions} placeholder='Select'/>   
											</Grid.Column>
									</Grid>
									<Grid columns={2}>
											<Grid.Column>
													<Form.Input onChange={handleChange('projectName')} value={projectName} label='Project Name*' placeholder='Project Name' />
											</Grid.Column>
											<Grid.Column>
												<Form.Input onChange={handleChange('contractorName')} value={contractorName} label='Contractor Name*' placeholder='Contractor Name' />
											</Grid.Column>
									</Grid>
									<Grid columns={2}>
											<Grid.Column>
													<Form.Input onChange={handleChange('folder')} value={folder} label='Folder Location*' placeholder='https://google.co.in' />
											</Grid.Column>
											<Grid.Column>
												<Form.Field onChange={handleChangeScope} value={scope} multiple control={Select} label='Scope of Work *' options={scopeOptions} placeholder='Select'/>   
											</Grid.Column>
									</Grid>
									<Button onClick={() => setTimeout(() => {
										loadTasks()}, 2000)} primary className='taskSave' content='Submit'>Save</Button>
								</Form>
						</Modal.Content>
						</Modal>
					
				</div>
			
				<div id="Create_a_new_task">
					<span>Create a new task</span>
				</div>
			</div>
			{taskList()}


  	</React.Fragment>
  )
}

export default Tasks