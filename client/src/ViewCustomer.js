import React, { useState, useEffect } from 'react'
import './App.css'
import { Button, Form, Checkbox, Label, Modal, Select} from 'semantic-ui-react'
import { getCustomer, updateCustomer, getCustomerResources, getCustomerResource, updateCustomerResource, getCustomerResourcePhoto, deleteCustomerResource, createCustomerResource } from './apiAdmin'
import ShowImage from './showImage';

const ViewCustomer = props => {
	const [customerUser, setCustomerUser] = useState('')
	const [error, setError] = useState(false)
	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [customerResources, setCustomerResources] = useState([])
	const [customerResource, setCustomerResource] = useState({
		_id: '',
		customer:'',
		customerResourceName:'',
		role:'',
		phone:'',
		email:'',
		passcode:'',
		customerResourceStatus:'',
		photo:'',
		formData: ''
	})
	const [customerResource1, setCustomerResource1] = useState([{
			customerResourceName1: '',
			role1: '',
			phone1: '',
			email1: '',
			passcode1: '',
			customerResourceStatus1: true,
			photo1: '',
			formData1: ''
				}])

	const {
		customer,
		customerResourceName,
		role,
		phone,
		email,
		passcode,
		customerResourceStatus,
		photo,
		formData
	} = customerResource

	const {
    customerResourceName1,
		role1,
		phone1,
		email1,
		passcode1,
		customerResourceStatus1,
		photo1,
		formData1
    } = customerResource1;

	const loadCustomer = customerId => {
		getCustomer(customerId).then(data => {
			if (data.error) {
	            setError(data.error)
	            console.log(data.error)
	        } else {
	            setCustomerUser(data)
	            console.log(data)
	        }
        })
	}

	const loadResources = () => {
		getCustomerResources().then(data => {
			if (data.error) {
	            setError(data.error)
	            console.log(data.error)
	        } else {
	            setCustomerResources(data)
	            console.log(data)
	        }
        })
	}


	useEffect(() => {
        const customerId = props.match.params.customerId
        loadCustomer(customerId)
        loadResources()
        setCustomerResource({...customerResource, formData: new FormData()})
        setCustomerResource1({...customerResource1, formData1: new FormData()})
    }, [props])

    const handleChangeCustomerResource = name => event => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		formData.set(name, value)
		formData.append('customer', customerUser.customerCode)
		setCustomerResource({ ...customerResource, [name]: value }); 

    };
    const handleChangeCustomerResource1 = name => event => {
		const value = name === 'photo1' ? event.target.files[0] : event.target.value;
		formData1.append(name.slice(0, -1), value)
		formData1.append('customer', customerUser.customerCode)
	    setCustomerResource1({ ...customerResource1, [name]: value });   
	};

    const handleChangeRole = (event, {value}) => {
	  	formData.append('role', value)
	  	setCustomerResource({...customerResource, role: value})
	}
	const handleChangeRole1 = (event, {value}) => {
	  	formData1.append('role', value)
	  	setCustomerResource1({...customerResource1, role1: value})
	}
	const handleStatusResource = (event, {checked}) => {
		formData.append('customerResourceStatus', checked)
  		setCustomerResource({...customerResource, customerResourceStatus: checked})     
	};
	const handleStatusResource1 = (event, {checked}) => {
		formData1.append('customerResourceStatus', checked)
	  	setCustomerResource1({...customerResource1, customerResourceStatus1: checked})     
	};
	const clickSubmit = (e, resourceId ) => {
		console.log(e, resourceId)
        e.preventDefault()
        setError('')
        setEditOpen(false)

        updateCustomerResource(resourceId, formData).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCustomerResource({
                    ...customerResource,
                    customerResourceName: data.customerResourceName,
                    role: data.role,
                    phone: data.phone,
                    email: data.email,
                    customerResourceStatus: data.customerResourceStatus,
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

       createCustomerResource(formData1).then(data => {
      		console.log(data)
	        if (data.error) {
	            console.log(error)
	        } else {
	          setCustomerResource1({
	            ...customerResource1,
	            customerResourceName1: '',
				role1: '',
				phone1: '',
				email1: '',
				passcode1: '',
				customerResourceStatus1: true,
				photo1: ''
	          });
	        }
      	});
    };

   

    const options = [
	  { key: 'admin', text: 'Admin', value: 'Admin' },
	  { key: 'engineer', text: 'Engineer', value: 'Engineer' },
	  
	]


  return (
  	<React.Fragment>
	  	<div id="view_company_title">
				<span>{customerUser.customerName}</span>
			</div>
			
			<div className="Rectangle_3370">
			</div>
				<div id="Company_name">
					<span>Customer name</span>
				</div>
				<div id="Jersey_engineering_services_cb">
					<span>{customerUser.customerName}</span>
				</div>
				<div id="Company_Short_Name">
					<span>Customer Short Name</span>
				</div>
				<div id="JES">
					<span>{customerUser.shortName}</span>
				</div>
				<div id="Company_Code">
					<span>Customer Code</span>
				</div>
				<div id="JES456665">
					<span>{customerUser.customerCode}</span>
				</div>
				<div id="Status____">
					<span>Status    </span>
				</div>
				<div id="Component_1261__7" class="Component_1261___7">
					<Checkbox toggle checked = {customerUser.customerStatus}/>
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
					          <Form.Input onChange={handleChangeCustomerResource1('customerResourceName1')} value={customerResourceName1} style={{width: "210px", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
					          <Form.Field onChange={handleChangeRole1} value={role1} control={Select} style={{width: "210px"}} label='Role *' options={options} placeholder='Select'/>   
					        </Form.Group>
					        <Form.Group style={{ marginBottom: "2em"}}>
					          <Form.Input onChange={handleChangeCustomerResource1('phone1')} value={phone1} style={{width: "210px", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
					          <Form.Input onChange={handleChangeCustomerResource1('email1')} value={email1} style={{width: "210px"}} fluid label='Email *' placeholder='Email' />   
					        </Form.Group>
					        <Form.Group>
					          <Form.Input onChange={handleChangeCustomerResource1('passcode1')} value={passcode1} style={{width: "210px", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
					        		
				        			<Checkbox onClick={handleStatusResource1} toggle checked = {customerResourceStatus1} style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
					        </Form.Group>
					        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
					        <Form.Group>
						        <Form.Field>
						        	<Button className="dropzone" as="label" htmlFor="file" type="button">
						                Drag & Drop or Click to Upload
						            </Button>
						            <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource1('photo1')} />
					        		
					          	</Form.Field>
					          	<Button onClick={() => setTimeout(() => {
								   loadResources()}, 1000)}
								primary className='update' content='Submit'>Save</Button>
					        </Form.Group>
					    </Form>
					</Modal.Content>
				</Modal>
			</div>
			<div className="Rectangle_3371">
					<div>
						<table className="resourceList">
							<tr>
								<th className="listHeader" style={{textAlign:"left"}}>Employee name</th>
								<th className="listHeader">Role</th>
								<th className="listHeader">Email</th>
								<th className="listHeader">Status</th>
								<th className="listHeader">Action</th>
							</tr>
							{customerResources.map((r, i) => {
								if(r.customer==customerUser.customerCode)
									return (
										<tr key={i}>
											<td className="listData" style={{color:"#213fd0de", textAlign:"left"}}>{r.customerResourceName}</td>
											<td className="listData">{r.role}</td>
											<td className="listData" style={{color:"#213fd0de"}}>{r.email}</td>
											<td className="listData"><Checkbox toggle checked = {r.customerResourceStatus}/></td>
											<td className="listData">
												<Modal
											        trigger={<Button basic onClick={() => getCustomerResource(r._id).then(data => {
											        	if (data.error) {
											                console.log(data.error)
											            } else  {
											            	setCustomerResource({
											                    ...customerResource,
											                    _id: data._id,
											                    customerResourceName: data.customerResourceName,
											                    role: data.role,
											                    phone: data.phone,
											                    email: data.email,
																passcode: data.passcode,
																customerResourceStatus: data.customerResourceStatus,
																photo: data.photo,
																formData:  new FormData()
											                })
											            }
											        })}>Edit</Button>}
											        onClose={() => setEditOpen(false)}
											        onOpen={() => setEditOpen(true)}
											        open={r._id == customerResource._id ? editOpen: null}
											        size='tiny'
											        as={Form} 
		   											onSubmit={e => clickSubmit(e, r._id)}>
		   											<Modal.Header>{r.customerResourceName}</Modal.Header>
		   											
											        <Modal.Content>
											        	<Form style={{ padding: "25px"}}>
													        <Form.Group style={{ marginBottom: "2em"}}>
													          <Form.Input onChange={handleChangeCustomerResource('customerResourceName')} value={customerResourceName} style={{width: "210px", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
													          <Form.Field onChange={handleChangeRole} value={role} control={Select} style={{width: "210px"}} label='Role *' options={options} placeholder='Select'/>   
													        </Form.Group>
													        <Form.Group style={{ marginBottom: "2em"}}>
													          <Form.Input onChange={handleChangeCustomerResource('phone')} value={phone} style={{width: "210px", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
													          <Form.Input onChange={handleChangeCustomerResource('email')} value={email} style={{width: "210px"}} fluid label='Email *' placeholder='Email' />   
													        </Form.Group>
													        <Form.Group>
													          <Form.Input onChange={handleChangeCustomerResource('passcode')} value={passcode} style={{width: "210px", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
													        		
												        			<Checkbox onClick={handleStatusResource} toggle checked = {customerResourceStatus} style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
													        </Form.Group>
													        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
													        <Form.Group>
														        <Form.Field>
														        	<Button style={{padding: 0}} as="label" htmlFor="file" type="button">
													        			<ShowImage item={r} url="customerResource" />
															        </Button>
														            <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource('photo')} />
													        		
													          	</Form.Field>
													          	<Button onClick={() => setTimeout(() => {
																   loadResources()}, 1000)}
																primary className='update' content='Submit'>Save</Button>
													        </Form.Group>
													    </Form>
													</Modal.Content>
												</Modal>
												<Button basic onClick={() => deleteCustomerResource(r._id).then(data => {
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

export default ViewCustomer