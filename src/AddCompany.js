import React, { useState, useEffect } from 'react'
import './App.css'
import { Button, Form, Checkbox, Label, Select} from 'semantic-ui-react'
import { createCompany, createResource, createResource1, createResource2, createResource3, createResource4, createResource5 } from './apiAdmin'
import { useHistory } from "react-router"

const options = [
  { key: 'superadmin', text: 'Super Admin', value: 'Super Admin' },
  { key: 'moderator', text: 'Moderator', value: 'Moderator' },
  
]

const AddCompany = () => {
	let history = useHistory()
	const [company, setCompany] = useState({
		companyName: '',
		shortName: '',
		companyCode: '',
		companyStatus: true
	})
	const [count, setCount] = useState(0)
	const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState({company:''})
	const [resource, setResource] = useState([{
			resourceName: '',
			resourceCode: '',
			designation: '',
			role: '',
			phone: '',
			email: '',
			passcode: '',
			resourceStatus: true,
			photo: '',
			formData: ''
				}])
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
	const [resource2, setResource2] = useState([{
			resourceName2: '',
			resourceCode2: '',
			designation2: '',
			role2: '',
			phone2: '',
			email2: '',
			passcode2: '',
			resourceStatus2: true,
			photo2: '',
			formData2: ''
				}])
	const [resource3, setResource3] = useState([{
			resourceName3: '',
			resourceCode3: '',
			designation3: '',
			role3: '',
			phone3: '',
			email3: '',
			passcode3: '',
			resourceStatus3: true,
			photo3: '',
			formData3: ''
				}])
	const [resource4, setResource4] = useState([{
			resourceName4: '',
			resourceCode4: '',
			designation4: '',
			role4: '',
			phone4: '',
			email4: '',
			passcode4: '',
			resourceStatus4: true,
			photo4: '',
			formData4: ''
				}])
	const [resource5, setResource5] = useState([{
			resourceName5: '',
			resourceCode5: '',
			designation5: '',
			role5: '',
			phone5: '',
			email5: '',
			passcode5: '',
			resourceStatus5: true,
			photo5: '',
			formData5: ''
				}])

	const {
    companyName,
		shortName,
		companyCode,
		companyStatus
    } = company;

  const {
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
    } = resource;

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
  const {
    resourceName2,
		resourceCode2,
		designation2,
		role2,
		phone2,
		email2,
		passcode2,
		resourceStatus2,
		photo2,
		formData2
    } = resource2;

  const {
    resourceName3,
		resourceCode3,
		designation3,
		role3,
		phone3,
		email3,
		passcode3,
		resourceStatus3,
		photo3,
		formData3
    } = resource3;  

  const {
    resourceName4,
		resourceCode4,
		designation4,
		role4,
		phone4,
		email4,
		passcode4,
		resourceStatus4,
		photo4,
		formData4
    } = resource4;

  const {
    resourceName5,
		resourceCode5,
		designation5,
		role5,
		phone5,
		email5,
		passcode5,
		resourceStatus5,
		photo5,
		formData5
    } = resource5;

    useEffect(() => {
    	setResource({...resource, formData: new FormData()});
    	setResource1({...resource1, formData1: new FormData()})
    	setResource2({...resource2, formData2: new FormData()})
    	setResource3({...resource3, formData3: new FormData()})
    	setResource4({...resource4, formData4: new FormData()})
    	setResource5({...resource5, formData5: new FormData()})
    }, [])


  const handleChange = name => event => {
      setCompany({ ...company, [name]: event.target.value });
      if (name == 'companyCode') setUser({...user, company: event.target.value})   
  };

  const handleStatus = event => {
  	setCompany({...company, companyStatus: !companyStatus})
	};

	const handleChangeResource = name => event => {
			const value = name === 'photo' ? event.target.files[0] : event.target.value;
			formData.append(name, value)
			formData.append('company', user.company)
      setResource({ ...resource, [name]: value }); 
      console.log(value)
  };
  const handleChangeResource1 = name => event => {
			const value = name === 'photo1' ? event.target.files[0] : event.target.value;
			formData1.append(name.slice(0, -1), value)
			formData1.append('company', user.company)
      setResource1({ ...resource1, [name]: value });   
  };
  const handleChangeResource2 = name => event => {
			const value = name === 'photo2' ? event.target.files[0] : event.target.value;
			formData2.append(name.slice(0, -1), value)
			formData2.append('company', user.company)
      setResource2({ ...resource2, [name]: value });   
  };
  const handleChangeResource3 = name => event => {
			const value = name === 'photo3' ? event.target.files[0] : event.target.value;
			formData3.append(name.slice(0, -1), value)
			formData3.append('company', user.company)
      setResource3({ ...resource3, [name]: value });   
  };
  const handleChangeResource4 = name => event => {
			const value = name === 'photo4' ? event.target.files[0] : event.target.value;
			formData4.append(name.slice(0, -1), value)
			formData4.append('company', user.company)
      setResource4({ ...resource4, [name]: value });   
  };
  const handleChangeResource5 = name => event => {
			const value = name === 'photo5' ? event.target.files[0] : event.target.value;
			formData5.append(name.slice(0, -1), value)
			formData5.append('company', user.company)
      setResource5({ ...resource5, [name]: value });   
  };

  const handleChangeRole = (event, {value}) => {
  	formData.append('role', value)
  	setResource({...resource, role: value})
  }
  const handleChangeRole1 = (event, {value}) => {
  	formData1.append('role', value)
  	setResource1({...resource1, role1: value})
  }
  const handleChangeRole2 = (event, {value}) => {
  	formData2.append('role', value)
  	setResource2({...resource2, role2: value})
  }
  const handleChangeRole3 = (event, {value}) => {
  	formData3.append('role', value)
  	setResource3({...resource3, role3: value})
  }
  const handleChangeRole4 = (event, {value}) => {
  	formData4.append('role', value)
  	setResource4({...resource4, role4: value})
  }
  const handleChangeRole5 = (event, {value}) => {
  	formData5.append('role', value)
  	setResource5({...resource5, role5: value})
  }

	const handleStatusResource = (event, {checked}) => {
		formData.append('resourceStatus', checked)
  	setResource({...resource, resourceStatus: checked})     
	};
	const handleStatusResource1 = (event, {checked}) => {
		formData1.append('resourceStatus', checked)
  	setResource1({...resource1, resourceStatus1: checked})     
	};
	const handleStatusResource2 = (event, {checked}) => {
		formData2.append('resourceStatus', checked)
  	setResource2({...resource2, resourceStatus2: checked})      
	};
	const handleStatusResource3 = (event, {checked}) => {
		formData3.append('resourceStatus', checked)
  	setResource3({...resource3, resourceStatus3: checked})      
	};
	const handleStatusResource4 = (event, {checked}) => {
		formData4.append('resourceStatus', checked)
  	setResource4({...resource4, resourceStatus4: checked})      
	};
	const handleStatusResource5 = (event, {checked}) => {
		formData5.append('resourceStatus', checked)
  	setResource5({...resource5, resourceStatus5: checked})      
	};

	const handleSubmit = event => {
		event.preventDefault();
    	console.log(user.company, company)
    	createCompany(company).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setError("");
              setSuccess(true);
              setCompany({
                  ...company,
                  companyName: '',
				shortName: '',
				companyCode: '',
				companyStatus: true
              });
          }
          console.log(data)
      });
      createResource(formData).then(data => {
      	console.log(data)
        if (data.error) {
            console.log(error)
        } else {
          setResource({
            ...resource,
            resourceName: '',
						resourceCode: '',
						designation: '',
						role: '',
						phone: '',
						email: '',
						passcode: '',
						resourceStatus: true,
						photo: ''
          });
        }
      });
      
      	createResource1(formData1).then(data => {
      		console.log(data)
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

      
     createResource2(formData2).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setResource2({
	            ...resource2,
	            resourceName2: '',
							resourceCode2: '',
							designation2: '',
							role2: '',
							phone2: '',
							email2: '',
							passcode2: '',
							resourceStatus2: true,
							photo2: ''
	          });
	        }
      	});
      
				createResource3(formData3).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setResource3({
	            ...resource3,
	            resourceName3: '',
							resourceCode3: '',
							designation3: '',
							role3: '',
							phone3: '',
							email3: '',
							passcode3: '',
							resourceStatus3: true,
							photo3: ''
	          });
	        }
	      });

      
     createResource4(formData4).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setResource4({
	            ...resource4,
	            resourceName4: '',
							resourceCode4: '',
							designation4: '',
							role4: '',
							phone4: '',
							email4: '',
							passcode4: '',
							resourceStatus4: true,
							photo4: ''
	          });
	        }
	      });

      
      createResource5(formData5).then(data => {
	        if (data.error) {
	            console.log(error)
	        } else {
	          setResource5({
	            ...resource5,
	            resourceName5: '',
							resourceCode5: '',
							designation5: '',
							role5: '',
							phone5: '',
							email5: '',
							passcode5: '',
							resourceStatus5: true,
							photo5: ''
	          });
	        }
	      });

      setCount(count-count)
      history.push('/companies')
  }

	const addEmp1 = () => {
    if (count >= 1) {
      return (
        <div id="Rectangle_3365">
					<Form style={{ padding: "25px"}}>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource1('resourceName1')} value={resourceName1} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
		          <Form.Input onChange={handleChangeResource1('resourceCode1')} value={resourceCode1} style={{width: "16.27vw"}} fluid label='Employee Code *' placeholder='Employee Code' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource1('designation1')} value={designation1} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
		          <Form.Field onChange={handleChangeRole1} value={role1} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource1('phone1')} value={phone1} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeResource1('email1')} value={email1} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "1em"}}>
		          <Form.Input onChange={handleChangeResource1('passcode1')} value={passcode1} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatusResource1} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource1('photo1')} />

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
		          <Form.Input onChange={handleChangeResource2('resourceName2')} value={resourceName2} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
		          <Form.Input onChange={handleChangeResource2('resourceCode2')} value={resourceCode2} style={{width: "16.27vw"}} fluid label='Employee Code *' placeholder='Employee Code' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource2('designation2')} value={designation2} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
		          <Form.Field onChange={handleChangeRole2} value={role2} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource2('phone2')} value={phone2} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeResource2('email2')} value={email2} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "1em"}}>
		          <Form.Input onChange={handleChangeResource2('passcode2')} value={passcode2} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatusResource2} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource2('photo2')} />

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
		          <Form.Input onChange={handleChangeResource3('resourceName3')} value={resourceName3} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
		          <Form.Input onChange={handleChangeResource3('resourceCode3')} value={resourceCode3} style={{width: "16.27vw"}} fluid label='Employee Code *' placeholder='Employee Code' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource3('designation3')} value={designation3} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
		          <Form.Field onChange={handleChangeRole3} value={role3} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource3('phone3')} value={phone3} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeResource3('email3')} value={email3} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "1em"}}>
		          <Form.Input onChange={handleChangeResource3('passcode3')} value={passcode3} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatusResource3} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource3('photo3')} />

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
		          <Form.Input onChange={handleChangeResource4('resourceName4')} value={resourceName4} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
		          <Form.Input onChange={handleChangeResource4('resourceCode4')} value={resourceCode4} style={{width: "16.27vw"}} fluid label='Employee Code *' placeholder='Employee Code' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource4('designation4')} value={designation4} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
		          <Form.Field onChange={handleChangeRole4} value={role4} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource4('phone4')} value={phone4} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeResource4('email4')} value={email4} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "1em"}}>
		          <Form.Input onChange={handleChangeResource4('passcode4')} value={passcode4} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatusResource4} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource4('photo4')} />

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
		          <Form.Input onChange={handleChangeResource5('resourceName5')} value={resourceName5} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
		          <Form.Input onChange={handleChangeResource5('resourceCode5')} value={resourceCode5} style={{width: "16.27vw"}} fluid label='Employee Code *' placeholder='Employee Code' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource5('designation5')} value={designation5} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
		          <Form.Field onChange={handleChangeRole5} value={role5} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource5('phone5')} value={phone5} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeResource5('email5')} value={email5} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "1em"}}>
		          <Form.Input onChange={handleChangeResource5('passcode5')} value={passcode5} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatusResource5} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource5('photo5')} />

          	</Form.Field>
		      </Form>
				</div>
      )
    } else return null
  }
  return (
  	<React.Fragment>
	  	<div id="Add_new_company">
			<span>Add new company</span>
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
	          <Form.Input onChange={handleChange('companyName')} value={companyName} style={{width: "550px", marginRight:'20px'}} fluid label='	Company name *' placeholder='Company name' />
	          <Form.Input onChange={handleChange('shortName')} value={shortName} style={{width: "260px", marginRight:'20px'}} fluid label='Company Short Name *' placeholder='Company Short Name' />
	          <Form.Input onChange={handleChange('companyCode')} value={companyCode} style={{width: "260px"}} fluid label='Company code *' placeholder='Company code' />
	        </Form.Group>
	        <Label style={{paddingLeft:"inherit"}}> Status </Label><br/>
	        <Checkbox onClick={handleStatus} toggle checked={companyStatus} />
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
		          <Form.Input onChange={handleChangeResource('resourceName')} value={resourceName} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Employee name *' placeholder='Employee name' />
		          <Form.Input onChange={handleChangeResource('resourceCode')} value={resourceCode} style={{width: "16.27vw"}} fluid label='Employee Code *' placeholder='Employee Code' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource('designation')} value={designation} style={{width: "16.27vw", marginRight:'20px'}} fluid label='	Designation *' placeholder='Designation' />
		          <Form.Field onChange={handleChangeRole} value={role} control={Select} style={{width: "16.27vw"}} label='Role *' options={options} placeholder='Select'/>   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "2em"}}>
		          <Form.Input onChange={handleChangeResource('phone')} value={phone} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Phone No*' placeholder='Phone No' />
		          <Form.Input onChange={handleChangeResource('email')} value={email} style={{width: "16.27vw"}} fluid label='Email *' placeholder='Email' />   
		        </Form.Group>
		        <Form.Group style={{ marginBottom: "1em"}}>
		          <Form.Input onChange={handleChangeResource('passcode')} value={passcode} style={{width: "16.27vw", marginRight:'20px'}} fluid label='Passcode*' placeholder='Passcode' />
		        		
	        			<Checkbox onClick={handleStatusResource} toggle defaultChecked style ={{paddingTop: "30px", paddingLeft: "10px"}}label="Status"/>
		        </Form.Group>
		        <Label style={{paddingLeft:0}}> Profile Picture *</Label>
		        <Form.Field>
              <Button className="dropzone" as="label" htmlFor="file" type="button">
                  Drag & Drop or Click to Upload
              </Button>
              <input type="file" id="file" accept="image/*" hidden onChange={handleChangeResource('photo')} />

          	</Form.Field>
		      </Form>
				</div>

				{addEmp1()}
				{addEmp2()}
				{addEmp3()}
				{addEmp4()}
				{addEmp5()}
				
				<div id="Rectangle_3366" style={{height:"512px", marginTop: count >= 1 ? "35px" : null}} onClick={() => setCount(count+1)}>
					<div id="Add_another_one" style={{top: "240px"}}>
						<span>Add another one</span>
					</div>
					<svg class="Union_13" style={{top: "215px"}} viewBox="-1672 -2949 26 26">
						<path id="Union_13" d="M -1661.00048828125 -2923.000244140625 L -1661.00048828125 -2934 L -1672.000244140625 -2934 L -1672.000244140625 -2937.999755859375 L -1661.00048828125 -2937.999755859375 L -1661.00048828125 -2949.00048828125 L -1657 -2949.00048828125 L -1657 -2937.999755859375 L -1646.000122070313 -2937.999755859375 L -1646.000122070313 -2934 L -1657 -2934 L -1657 -2923.000244140625 L -1661.00048828125 -2923.000244140625 Z">
						</path>
					</svg>
				</div>		
		</div>
		

	</React.Fragment>
  	);
}

export default AddCompany