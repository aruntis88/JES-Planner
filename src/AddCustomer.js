import React, { useState, useEffect } from 'react'
import './App.css'
import { Button, Form, Checkbox, Label, Select} from 'semantic-ui-react'
import { createCustomer, createCustomerResource, createCustomerResource1, createCustomerResource2, createCustomerResource3, createCustomerResource4, createCustomerResource5 } from './apiAdmin'
import { useHistory } from "react-router"


const options = [
  { key: 'admin', text: 'Admin', value: 'Admin' },
  { key: 'engineer', text: 'Engineer', value: 'Engineer' },
  
]
const AddCustomer = () => {
	const [customer, setCustomer] = useState({
		customerName: '',
		shortName: '',
		customerCode: '',
		customerStatus: true
	})
	const [count, setCount] = useState(0)
	const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState({customer:''})
	const [customerResource, setCustomerResource] = useState([{
			customerResourceName: '',
			role: '',
			phone: '',
			email: '',
			passcode: '',
			customerResourceStatus: true,
			photo: '',
			formData: ''
				}])
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
	const [customerResource2, setCustomerResource2] = useState([{
			customerResourceName2: '',
			role2: '',
			phone2: '',
			email2: '',
			passcode2: '',
			customerResourceStatus2: true,
			photo2: '',
			formData2: ''
				}])
	const [customerResource3, setCustomerResource3] = useState([{
			customerResourceName3: '',
			role3: '',
			phone3: '',
			email3: '',
			passcode3: '',
			customerResourceStatus3: true,
			photo3: '',
			formData3: ''
				}])
	const [customerResource4, setCustomerResource4] = useState([{
			customerResourceName4: '',
			role4: '',
			phone4: '',
			email4: '',
			passcode4: '',
			customerResourceStatus4: true,
			photo4: '',
			formData4: ''
				}])
	const [customerResource5, setCustomerResource5] = useState([{
			customerResourceName5: '',
			role5: '',
			phone5: '',
			email5: '',
			passcode5: '',
			customerResourceStatus5: true,
			photo5: '',
			formData5: ''
				}])

	const {
    customerName,
		shortName,
		customerCode,
		customerStatus
    } = customer;

  const {
    customerResourceName,
		role,
		phone,
		email,
		passcode,
		customerResourceStatus,
		photo,
		formData
    } = customerResource;

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
  const {
    customerResourceName2,
		role2,
		phone2,
		email2,
		passcode2,
		customerResourceStatus2,
		photo2,
		formData2
    } = customerResource2;

  const {
    customerResourceName3,
		role3,
		phone3,
		email3,
		passcode3,
		customerResourceStatus3,
		photo3,
		formData3
    } = customerResource3;  

  const {
    customerResourceName4,
		role4,
		phone4,
		email4,
		passcode4,
		customerResourceStatus4,
		photo4,
		formData4
    } = customerResource4;

  const {
    customerResourceName5,
		role5,
		phone5,
		email5,
		passcode5,
		customerResourceStatus5,
		photo5,
		formData5
    } = customerResource5;

    useEffect(() => {
    	setCustomerResource({...customerResource, formData: new FormData()});
    	setCustomerResource1({...customerResource1, formData1: new FormData()})
    	setCustomerResource2({...customerResource2, formData2: new FormData()})
    	setCustomerResource3({...customerResource3, formData3: new FormData()})
    	setCustomerResource4({...customerResource4, formData4: new FormData()})
    	setCustomerResource5({...customerResource5, formData5: new FormData()})
    }, [])

    let history = useHistory()

  const handleChange = name => event => {
      setCustomer({ ...customer, [name]: event.target.value });
      if (name == 'customerCode') setUser({...user, customer: event.target.value})   
  };

  const handleStatus = event => {
  	setCustomer({...customer, customerStatus: !customerStatus})
	};

	const handleChangeCustomerResource = name => event => {
			const value = name === 'photo' ? event.target.files[0] : event.target.value;
			formData.append(name, value)
			formData.append('customer', user.customer)
      setCustomerResource({ ...customerResource, [name]: value }); 
      console.log(value)
  };
  const handleChangeCustomerResource1 = name => event => {
			const value = name === 'photo1' ? event.target.files[0] : event.target.value;
			formData1.append(name.slice(0, -1), value)
			formData1.append('customer', user.customer)
      setCustomerResource1({ ...customerResource1, [name]: value });   
  };
  const handleChangeCustomerResource2 = name => event => {
			const value = name === 'photo2' ? event.target.files[0] : event.target.value;
			formData2.append(name.slice(0, -1), value)
			formData2.append('customer', user.customer)
      setCustomerResource2({ ...customerResource2, [name]: value });   
  };
  const handleChangeCustomerResource3 = name => event => {
			const value = name === 'photo3' ? event.target.files[0] : event.target.value;
			formData3.append(name.slice(0, -1), value)
			formData3.append('customer', user.customer)
      setCustomerResource3({ ...customerResource3, [name]: value });   
  };
  const handleChangeCustomerResource4 = name => event => {
			const value = name === 'photo4' ? event.target.files[0] : event.target.value;
			formData4.append(name.slice(0, -1), value)
			formData4.append('customer', user.customer)
      setCustomerResource4({ ...customerResource4, [name]: value });   
  };
  const handleChangeCustomerResource5 = name => event => {
			const value = name === 'photo5' ? event.target.files[0] : event.target.value;
			formData5.append(name.slice(0, -1), value)
			formData5.append('customer', user.customer)
      setCustomerResource5({ ...customerResource5, [name]: value });   
  };

  const handleChangeRole = (event, {value}) => {
  	formData.append('role', value)
  	setCustomerResource({...customerResource, role: value})
  }
  const handleChangeRole1 = (event, {value}) => {
  	formData1.append('role', value)
  	setCustomerResource1({...customerResource1, role1: value})
  }
  const handleChangeRole2 = (event, {value}) => {
  	formData2.append('role', value)
  	setCustomerResource2({...customerResource2, role2: value})
  }
  const handleChangeRole3 = (event, {value}) => {
  	formData3.append('role', value)
  	setCustomerResource3({...customerResource3, role3: value})
  }
  const handleChangeRole4 = (event, {value}) => {
  	formData4.append('role', value)
  	setCustomerResource4({...customerResource4, role4: value})
  }
  const handleChangeRole5 = (event, {value}) => {
  	formData5.append('role', value)
  	setCustomerResource5({...customerResource5, role5: value})
  }

	const handleStatuscustomerResource = (event, {checked}) => {
		formData.append('customerResourceStatus', checked)
  	setCustomerResource({...customerResource, customerResourceStatus: checked})     
	};
	const handleStatuscustomerResource1 = (event, {checked}) => {
		formData1.append('customerResourceStatus', checked)
  	setCustomerResource1({...customerResource1, customerResourceStatus1: checked})     
	};
	const handleStatuscustomerResource2 = (event, {checked}) => {
		formData2.append('customerResourceStatus', checked)
  	setCustomerResource2({...customerResource2, customerResourceStatus2: checked})      
	};
	const handleStatuscustomerResource3 = (event, {checked}) => {
		formData3.append('customerResourceStatus', checked)
  	setCustomerResource3({...customerResource3, customerResourceStatus3: checked})      
	};
	const handleStatuscustomerResource4 = (event, {checked}) => {
		formData4.append('customerResourceStatus', checked)
  	setCustomerResource4({...customerResource4, customerResourceStatus4: checked})      
	};
	const handleStatuscustomerResource5 = (event, {checked}) => {
		formData5.append('customerResourceStatus', checked)
  	setCustomerResource5({...customerResource5, customerResourceStatus5: checked})      
	};

	const handleSubmit = event => {
		event.preventDefault();
    	console.log(user.customer, customer)
    	createCustomer(customer).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setError("");
              setSuccess(true);
              setCustomer({
                  ...customer,
                  customerName: '',
				shortName: '',
				customerCode: '',
				customerStatus: true
              });
          }
          console.log(data)
      });
      createCustomerResource(formData).then(data => {
      	console.log(data)
        if (data.error) {
            console.log(error)
        } else {
          setCustomerResource({
            ...customerResource,
            customerResourceName: '',
			role: '',
			phone: '',
			email: '',
			passcode: '',
			customerResourceStatus: true,
			photo: ''
          });
        }
      });
      
      	createCustomerResource1(formData1).then(data => {
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

      
     createCustomerResource2(formData2).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setCustomerResource2({
	            ...customerResource2,
	            customerResourceName2: '',
							role2: '',
							phone2: '',
							email2: '',
							passcode2: '',
							customerResourceStatus2: true,
							photo2: ''
	          });
	        }
      	});
      
				createCustomerResource3(formData3).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setCustomerResource3({
	            ...customerResource3,
	            customerResourceName3: '',
							role3: '',
							phone3: '',
							email3: '',
							passcode3: '',
							customerResourceStatus3: true,
							photo3: ''
	          });
	        }
	      });

      
     createCustomerResource4(formData4).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setCustomerResource4({
	            ...customerResource4,
	            customerResourceName4: '',
							role4: '',
							phone4: '',
							email4: '',
							passcode4: '',
							customerResourceStatus4: true,
							photo4: ''
	          });
	        }
	      });

      
      createCustomerResource5(formData5).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setCustomerResource5({
	            ...customerResource5,
	            customerResourceName5: '',
							role5: '',
							phone5: '',
							email5: '',
							passcode5: '',
							customerResourceStatus5: true,
							photo5: ''
	          });
	        }
	      });

      setCount(count-count)
      history.push('/customers')

  }

	const addEmp1 = () => {
    if (count >= 1) {
      return (
        <div id="Rectangle_3365">
					<Form style={{ padding: "25px"}}>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource1('customerResourceName1')} value={customerResourceName1} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
		          <Form.Field onChange={handleChangeRole1} value={role1} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource1('phone1')} value={phone1} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeCustomerResource1('email1')} value={email1} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group>
		          <Form.Input onChange={handleChangeCustomerResource1('passcode1')} value={passcode1} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatuscustomerResource1} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource1('photo1')} />

          	</Form.Field>
		      </Form>
				</div>
      )
    } else return null
  }
  const addEmp2 = () => {
    if (count >= 2) {
      return (
        <div id="Rectangle_3365" style={{marginTop: "35px"}}>
					<Form style={{ padding: "25px"}}>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource2('customerResourceName2')} value={customerResourceName2} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />		        
		          <Form.Field onChange={handleChangeRole2} value={role2} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		          </Form.Group>	        
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource2('phone2')} value={phone2} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeCustomerResource2('email2')} value={email2} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group>
		          <Form.Input onChange={handleChangeCustomerResource2('passcode2')} value={passcode2} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatuscustomerResource2} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource2('photo2')} />

          	</Form.Field>
		      </Form>
				</div>
      )
    } else return null
  }
  const addEmp3 = () => {
    if (count >= 3) {
      return (
        <div id="Rectangle_3365" style={{marginTop: "35px"}}>
					<Form style={{ padding: "25px"}}>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource3('customerResourceName3')} value={customerResourceName3} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />		        
		          <Form.Field onChange={handleChangeRole3} value={role3} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>		        
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource3('phone3')} value={phone3} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeCustomerResource3('email3')} value={email3} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group>
		          <Form.Input onChange={handleChangeCustomerResource3('passcode3')} value={passcode3} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatuscustomerResource3} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource3('photo3')} />

          	</Form.Field>
		      </Form>
				</div>
      )
    } else return null
  }
  const addEmp4 = () => {
    if (count >= 4) {
      return (
        <div id="Rectangle_3365" style={{marginTop: "35px"}}>
					<Form style={{ padding: "25px"}}>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource4('customerResourceName4')} value={customerResourceName4} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />		       
		          <Form.Field onChange={handleChangeRole4} value={role4} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource4('phone4')} value={phone4} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeCustomerResource4('email4')} value={email4} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group>
		          <Form.Input onChange={handleChangeCustomerResource4('passcode4')} value={passcode4} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatuscustomerResource4} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource4('photo4')} />

          	</Form.Field>
		      </Form>
				</div>
      )
    } else return null
  }
  const addEmp5 = () => {
    if (count >= 5) {
      return (
        <div id="Rectangle_3365" style={{marginTop: "35px"}}>
					<Form style={{ padding: "25px"}}>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource5('customerResourceName5')} value={customerResourceName5} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />		        
		          <Form.Field onChange={handleChangeRole5} value={role5} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource5('phone5')} value={phone5} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeCustomerResource5('email5')} value={email5} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group>
		          <Form.Input onChange={handleChangeCustomerResource5('passcode5')} value={passcode5} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatuscustomerResource5} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource5('photo5')} />

          	</Form.Field>
		      </Form>
				</div>
      )
    } else return null
  }
  return (
  	<React.Fragment>
	  	<div id="Add_new_company">
			<span>Add new customer</span>
		</div>
		<div id="Cancel">
			<span>Cancel</span>
		</div>
		<div  id="Component_1262__2" class="Component_1262___2">
			<Button primary content='Submit' onClick={handleSubmit}>Save</Button>
		</div>
		<div class="Rectangle_3354">
			<div id="Rectangle_3354">
				<Form>
	        <Form.Group>
	          <Form.Input onChange={handleChange('customerName')} value={customerName} style={{width: "550px", marginRight:'20px'}} fluid label='	Customer name *' placeholder='Customer name' />
	          <Form.Input onChange={handleChange('shortName')} value={shortName} style={{width: "260px", marginRight:'20px'}} fluid label='Customer Short Name *' placeholder='Customer Short Name' />
	          <Form.Input onChange={handleChange('customerCode')} value={customerCode} style={{width: "260px"}} fluid label='Customer code *' placeholder='Customer code' />
	        </Form.Group>
	        <Label style={{paddingLeft:"inherit"}}> Status </Label><br/>
	        <Checkbox onClick={handleStatus} toggle checked={customerStatus} />
	      </Form>
			</div>
		</div>
		
		<div id="Add_new_users">
			<span>Add new resources</span>
		</div>
		
		<div id="Component_1270__1" class="Component_1270___1">
				<div id="Rectangle_3365">
				<Form style={{ padding: "25px"}}>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource('customerResourceName')} value={customerResourceName} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />		        
		          <Form.Field onChange={handleChangeRole} value={role} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeCustomerResource('phone')} value={phone} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeCustomerResource('email')} value={email} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group>
		          <Form.Input onChange={handleChangeCustomerResource('passcode')} value={passcode} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatuscustomerResource} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeCustomerResource('photo')} />

          	</Form.Field>
		      </Form>
				</div>

				{addEmp1()}
				{addEmp2()}
				{addEmp3()}
				{addEmp4()}
				{addEmp5()}
				
				<div id="Rectangle_3366" style={{height: "424px", marginTop: count >= 1 ? "35px" : null}} onClick={() => setCount(count+1)}>
					<div id="Add_another_one">
						<span>Add another one</span>
					</div>
					<svg class="Union_13" viewBox="-1672 -2949 26 26">
						<path id="Union_13" d="M -1661.00048828125 -2923.000244140625 L -1661.00048828125 -2934 L -1672.000244140625 -2934 L -1672.000244140625 -2937.999755859375 L -1661.00048828125 -2937.999755859375 L -1661.00048828125 -2949.00048828125 L -1657 -2949.00048828125 L -1657 -2937.999755859375 L -1646.000122070313 -2937.999755859375 L -1646.000122070313 -2934 L -1657 -2934 L -1657 -2923.000244140625 L -1661.00048828125 -2923.000244140625 Z">
						</path>
					</svg>
				</div>		
		</div>
		

	</React.Fragment>
  	);
}

export default AddCustomer