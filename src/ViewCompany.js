import React, { useState, useEffect } from 'react'
import './App.css'
import { Button, Form, Checkbox, Label, Modal, Select, Divider, Grid, Segment, List} from 'semantic-ui-react'
import { getCompany, getCustomers, updateCustomer, getResources, getResource, updateResource, getResourcePhoto, deleteResource, createResource } from './apiAdmin'
import ShowImage from './showImage';
import _ from 'lodash'

let customerOptions = []
let customerPlace = {}
const ViewCompany = props => {
	const [companyUser, setCompanyUser] = useState('')
	const [error, setError] = useState(false)
	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [allocateOpen, setAllocateOpen] = useState(false)
	const [customerPlace, setCustomerPlace] = useState({})
	const [customers, setCustomers] = useState([])
	const [allocateResource, setAllocateResource] = useState()
	const [customers1, setCustomers1] = useState([])
	const [resources, setResources] = useState([])
	const [resource, setResource] = useState({
		_id: '',
		company:'',
		resourceName:'',
		resourceCode:'',
		designation:'',
		role:'',
		phone:'',
		email:'',
		passcode:'',
		resourceStatus:'',
		photo:'',
		formData: ''
	})
	const [resource1, setResource1] = useState([{
			resourceName1: '',
			resourceCode1: '',
			designation1: '',
			role1: '',
			phone1: '',
			email1: '',
			passcode1: '',
			resourceStatus1: true,
			photo1: '',
			formData1: ''
				}])

	const {
		company,
		resourceName,
		resourceCode,
		designation,
		role,
		phone,
		email,
		passcode,
		resourceStatus,
		photo,
		formData
	} = resource

	const {
    resourceName1,
		resourceCode1,
		designation1,
		role1,
		phone1,
		email1,
		passcode1,
		resourceStatus1,
		photo1,
		formData1
    } = resource1;

	const loadCompany = companyId => {
		getCompany(companyId).then(data => {
			if (data.error) {
	            setError(data.error)
	            console.log(data.error)
	        } else {
	            setCompanyUser(data)
	        }
        })
	}

	const loadResources = () => {
		getResources().then(data => {
			if (data.error) {
	            setError(data.error)
	            console.log(data.error)
	        } else {
	            setResources(data)
	        }
        })
	}

	const loadCustomers = () => {
		getCustomers().then(data => {
			if (data.error) {
	            setError(data.error)
	            console.log(data.error)
	        } else {
		        data.map((customer, key) => {
		          var obj = {};
			      obj["value"] = customer._id;
			      obj["text"] = customer.customerName;
			      customerOptions.push(obj);
			      obj = {};
			      setCustomers(data)
			      setCustomers1(data)
		        });
		   	}
        })
	}


	useEffect(() => {
        const companyId = props.match.params.companyId
        loadCompany(companyId)
        loadResources()
        loadCustomers()
        setResource({...resource, formData: new FormData()})
        setResource1({...resource1, formData1: new FormData()})
    }, [props])

    const handleChangeResource = name => event => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		formData.append(name, value)
		formData.append('company', companyUser.companyCode)
		setResource({ ...resource, [name]: value }); 

    };
    const handleChangeResource1 = name => event => {
		const value = name === 'photo1' ? event.target.files[0] : event.target.value;
		formData1.append(name.slice(0, -1), value)
		formData1.append('company', companyUser.companyCode)
	    setResource1({ ...resource1, [name]: value });   
	};

    const handleChangeRole = (event, {value}) => {
	  	formData.append('role', value)
	  	setResource({...resource, role: value})
	}
	const handleChangeRole1 = (event, {value}) => {
	  	formData1.append('role', value)
	  	setResource1({...resource1, role1: value})
	}

	const handleChangeCustomer = (event, {value}) => {
	  	setCustomerPlace({_id: value, label: event.target.textContent})
	  	
	  	// console.log(value)
	  	let cstmr = customers.filter(c=>c._id == value)
	  	// console.log(cstmr[0].companyResource.map(rs=>rs._id))
	  		// console.log(resources.map(cr=> cr._id !== cstmr[0].companyResource.map(rs=>rs._id)))
	  	let rsc = (resources.map(cr=> cr.resourceName))
	  	let cst = cstmr[0].companyResource.map(rs=>rs.resourceName)
	  	let arr = []
	  	if(value == cstmr[0]._id) {
	  		for (var i = 0; i < rsc.length; i++) {
			    if (cst.indexOf(rsc[i]) == -1) {
			        arr.push(rsc[i])
			    }
			}
	  	}
	  	setAllocateResource(arr)
	}

	const handleAllocate = (event, resource) => {
			let employee = []
			let cstmr = {} 
			employee = resources.filter(r=> r.resourceName == resource.children)
 			const uniqueEmp = {
 				_id: employee[0]._id,
 				resourceName: employee[0].resourceName 
 			}
 			setCustomers([...customers, customers.filter(c => c._id == customerPlace._id).map(filteredCstmr => (
  					filteredCstmr.companyResource.push(uniqueEmp)
 				))])
 			cstmr = customers.filter(c => c._id == customerPlace._id)
			updateCustomer(customerPlace._id, cstmr[0]).then(data => {
				if(data.error) {
					console.log(error)
				} else {
					console.log(data)
				}
			})
			
	}

	const handleDislocate = (event, resource) => {
		let employee = []
		let cstmr = {}
			employee = resources.filter(r=> r.resourceName == resource.children)
			// let arr1 = customers.filter(c=> c._id == customerPlace._id)
			// let arr2 = arr1.map(arr => arr.companyResource)
			// let arr3 = arr2.map(arr => arr.filter(r=>r._id !== employee[0]._id))
			// let arr4 = arr3[0].[0]
			
 			setCustomers([...customers, customers.filter(c => c._id == customerPlace._id).filter(filteredCstmr => (
 				filteredCstmr.companyResource = []))])
 			cstmr = customers.filter(c => c._id == customerPlace._id)
 			console.log(cstmr)
			updateCustomer(customerPlace._id, cstmr[0]).then(data => {
				if(data.error) {
					console.log(error)
				} else {
					console.log(data)
				}
			})
	}

	const handleOnClose = () => {
		setCustomerPlace('')
		setAllocateOpen()
	}

	const handleStatusResource = (event, {checked}) => {
		formData.append('resourceStatus', checked)
  		setResource({...resource, resourceStatus: checked})     
	};
	const handleStatusResource1 = (event, {checked}) => {
		formData1.append('resourceStatus', checked)
	  	setResource1({...resource1, resourceStatus1: checked})     
	};
	const clickSubmit = (e, resourceId ) => {
        e.preventDefault()
        setError('')
        setEditOpen(false)

        updateResource(resourceId, formData).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setResource({
                    ...resource,
                    resourceName: data.name,
                    resourceCode: data.code,
                    desgination: data.designation,
                    role: data.role,
                    phone: data.phone,
                    email: data.email,
                    resourceStatus: data.status,
                    passcode: data.passcode,
                    photo: data.photo,
                });
            }
        });
        loadResources()
    };
    const clickSubmit1 = event => {
        event.preventDefault()
        setError('')
        setAddOpen(false)

       createResource(formData1).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setResource1({
	            ...resource1,
	            resourceName1: '',
							resourceCode1: '',
							designation1: '',
							role1: '',
							phone1: '',
							email1: '',
							passcode1: '',
							resourceStatus1: true,
							photo1: ''
	          });
	        }
      	});
       loadResources()
    };

   

    const options = [
	  { key: 'superadmin', text: 'Super Admin', value: 'Super Admin' },
	  { key: 'moderator', text: 'Moderator', value: 'Moderator' },
	  
	]


  return (
  	<React.Fragment>
	  	<div id="view_company_title">
				<span>{companyUser.companyName}</span>
			</div>
			<div  id="Component_1262__21">
				
				<Modal
			        trigger={<Button primary >Add Resource</Button>}
			        onClose={() => setAddOpen(false)}
			        onOpen={() => setAddOpen(true)}
			        open={addOpen}
			        size='tiny'
			        as={Form} 
						onSubmit={event => clickSubmit1(event)}>
						<Modal.Header>Add Resource</Modal.Header>
						
			        <Modal.Content>
			        	<Form style={{ padding: "25px"}}>
					        <Form.Group style={{ marginBottom: "2em"}}>
					          <Form.Input onChange={handleChangeResource1('resourceName1')} value={resourceName1} style={{width: "210px", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
					          <Form.Input onChange={handleChangeResource1('resourceCode1')} value={resourceCode1} style={{width: "210px"}} fluid label='Employee Code *' placeholder='Employee Code' />   
					        </Form.Group>
					        <Form.Group style={{ marginBottom: "2em"}}>
					          <Form.Input onChange={handleChangeResource1('designation1')} value={designation1} style={{width: "210px", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
					          <Form.Field onChange={handleChangeRole1} value={role1} control={Select} style={{width: "210px"}} label='Role *' options={options} placeholder='Select'/>   
					        </Form.Group>
					        <Form.Group style={{ marginBottom: "2em"}}>
					          <Form.Input onChange={handleChangeResource1('phone1')} value={phone1} style={{width: "210px", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
					          <Form.Input onChange={handleChangeResource1('email1')} value={email1} style={{width: "210px"}} fluid label='Email *' placeholder='Email' />   
					        </Form.Group>
					        <Form.Group>
					          <Form.Input onChange={handleChangeResource1('passcode1')} value={passcode1} style={{width: "210px", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
					        		
				        			<Checkbox onClick={handleStatusResource1} toggle checked = {resourceStatus1} style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
					        </Form.Group>
					        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
					        <Form.Group>
						        <Form.Field>
						        	<Button className="dropzone" as="label" htmlFor="file" type="button">
						                Drag & Drop or Click to Upload
						            </Button>
						            <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource1('photo1')} />
					        		
					          	</Form.Field>
					          	<Button onClick={() => setTimeout(() => {
								   loadResources()}, 1000)}
								primary className='update' content='Submit'>Save</Button>
					        </Form.Group>
					    </Form>
					</Modal.Content>
				</Modal>
			</div>
			<div className="Rectangle_3370">
			</div>
				<div id="Company_name">
					<span>Company name</span>
				</div>
				<div id="Jersey_engineering_services_cb">
					<span>{companyUser.companyName}</span>
				</div>
				<div id="Company_Short_Name">
					<span>Company Short Name</span>
				</div>
				<div id="JES">
					<span>{companyUser.shortName}</span>
				</div>
				<div id="Company_Code">
					<span>Company Code</span>
				</div>
				<div id="JES456665">
					<span>{companyUser.companyCode}</span>
				</div>
				<div id="Status____">
					<span>Status    </span>
				</div>
				<div id="Component_1261__7" class="Component_1261___7">
					<Checkbox toggle checked = {companyUser.companyStatus}/>
				</div>
			<div id="List_of_Resources">
				<span>List of Resources</span>
			</div>
			<div id="Component_1290__1" class="Component_1290___1">
				<div id="Allocated">
					<span>Allocated</span>
				</div>
				<svg class="Rectangle_3379">
					<rect id="Rectangle_3379" rx="3" ry="3" x="0" y="0" width="13" height="13">
					</rect>
				</svg>
			</div>
			<div id="Component_1290__2" className="Component_1290___2">
				<div id="Unallocated">
					<span>Unallocated</span>
				</div>
				<svg class="Rectangle_3379_f">
					<rect id="Rectangle_3379_f" rx="3" ry="3" x="0" y="0" width="13" height="13">
					</rect>
				</svg>
			</div>
			<div id="Component_1262__8">
				<Modal
			        trigger={<Button primary content='Submit'>Allocate Resources</Button>}
			        onClose={handleOnClose}
			        onOpen={() => setAllocateOpen(true)}
			        open={allocateOpen}
			        size='tiny'
			        as={Form} 	
				>
				<Modal.Header>Allocate Resources</Modal.Header>
				<Modal.Content>
					<Form style={{ padding: "25px"}}>
						<Form.Field style={{marginBottom: "40px"}} onChange={handleChangeCustomer} value={customers._id} control={Select} label='Select Customer *' options={customerOptions} placeholder='Select'/>
							<Segment style={{maxHeight:"330px", overflowY: "scroll"}}>
							    <Grid columns={2}>
							      <Grid.Column verticalAlign='top' style={{borderRight: "2px groove #0000ff2b"}}>
							      		{resources.map((r, i) => {
							      				return (
													<Label onClick={handleAllocate} key={i} style={{textAlign:"center", cursor:"pointer", width:"100%"}}>
															{r.resourceName}
													</Label>	      			
												)
											})
									  	}

							      		
							      </Grid.Column>
							      <Grid.Column>
							        {customers1.map((c, i) => {
							        	if(c.companyResource.length > 0) {
							        		if(customerPlace._id == c._id) {
							        			return (
							        				<List key={i} style={{textAlign:"center", cursor:"pointer"}}>
							        						{c.companyResource.map(r => {
							        							return (
							        							<Label onClick={handleDislocate} style={{textAlign:"center", cursor:"pointer", width:"100%"}}>
																		{r.resourceName}
																</Label>
							        							)
							        						})}
													</List>
							        			)
							        		}
							        	}
							        })}
							      </Grid.Column>
							    </Grid>
							</Segment>
					</Form>
				</Modal.Content>
				</Modal>
			</div>
			<div className="Rectangle_3371">
					<div>
						<table className="resourceList">
							<tr>
								<th className="listHeader" style={{textAlign:"left"}}>Employee name</th>
								<th className="listHeader">Employee Code</th>
								<th className="listHeader">Allocated to</th>
								<th className="listHeader">Role</th>
								<th className="listHeader">Status</th>
								<th className="listHeader">Action</th>
							</tr>
							{resources.map((r, i) => {
								if(r.company==companyUser.companyCode)
									return (
										<tr key={i}>
											<td className="listData" style={{color:"#213fd0de",textAlign:"left"}}>{r.resourceName}</td>
											<td className="listData">{r.resourceCode}</td>
											<td className="listData">None</td>
											<td className="listData">{r.role}</td>
											<td className="listData"><Checkbox toggle checked = {r.resourceStatus}/></td>
											<td className="listData">
												<Modal
											        trigger={<Button basic onClick={() => getResource(r._id).then(data => {
											        	if (data.error) {
											                console.log(data.error)
											            } else  {
											            	setResource({
											                    ...resource,
											                    _id: data._id,
											                    resourceName: data.resourceName,
											                    resourceCode: data.resourceCode,
											                    designation: data.designation,
											                    role: data.role,
											                    phone: data.phone,
											                    email: data.email,
																passcode: data.passcode,
																resourceStatus: data.resourceStatus,
																photo: data.photo,
																formData:  new FormData()
											                })
											            }
											        })}>Edit</Button>}
											        onClose={() => setEditOpen(false)}
											        onOpen={() => setEditOpen(true)}
											        open={r._id == resource._id ? editOpen: null}
											        size='tiny'
											        as={Form} 
		   											onSubmit={e => clickSubmit(e, r._id)}>
		   											<Modal.Header>{r.resourceName}</Modal.Header>
		   											
											        <Modal.Content>
											        	<Form style={{ padding: "25px"}}>
													        <Form.Group style={{ marginBottom: "2em"}}>
													          <Form.Input onChange={handleChangeResource('resourceName')} value={resourceName} style={{width: "210px", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
													          <Form.Input onChange={handleChangeResource('resourceCode')} value={resourceCode} style={{width: "210px"}} fluid label='Employee Code *' placeholder='Employee Code' />   
													        </Form.Group>
													        <Form.Group style={{ marginBottom: "2em"}}>
													          <Form.Input onChange={handleChangeResource('designation')} value={designation} style={{width: "210px", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
													          <Form.Field onChange={handleChangeRole} value={role} control={Select} style={{width: "210px"}} label='Role *' options={options} placeholder='Select'/>   
													        </Form.Group>
													        <Form.Group style={{ marginBottom: "2em"}}>
													          <Form.Input onChange={handleChangeResource('phone')} value={phone} style={{width: "210px", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
													          <Form.Input onChange={handleChangeResource('email')} value={email} style={{width: "210px"}} fluid label='Email *' placeholder='Email' />   
													        </Form.Group>
													        <Form.Group>
													          <Form.Input onChange={handleChangeResource('passcode')} value={passcode} style={{width: "210px", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
													        		
												        			<Checkbox onClick={handleStatusResource} toggle checked = {resourceStatus} style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
													        </Form.Group>
													        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
													        <Form.Group>
														        <Form.Field>
														        	<Button style={{padding: 0}} as="label" htmlFor="file" type="button">
													        			<ShowImage item={r} url="resource" />
															        </Button>
														            <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource('photo')} />
													        		
													          	</Form.Field>
													          	<Button onClick={() => setTimeout(() => {
																   loadResources()}, 1000)}
																primary className='update' content='Submit'>Save</Button>
													        </Form.Group>
													    </Form>
													</Modal.Content>
												</Modal>
												<Button basic onClick={() => deleteResource(r._id).then(data => {
										            if (data.error) {
										                console.log(data.error);
										            } else {
										                loadResources();
										            }
										        		})}
												>
											      Delete
											    </Button>
											</td>
										</tr>
									)
								}
							)}
						</table>
					</div>
						
			</div>
	</React.Fragment>
  );
}

export default ViewCompany