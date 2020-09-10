import React, { useState, useEffect } from 'react'
import './App.css'
import { Link, Redirect } from 'react-router-dom';
import { Button, Checkbox} from 'semantic-ui-react'
import { getCustomers, getCustomerResources } from './apiAdmin'


const Customers = () => {
	const [customer, setCustomer] = useState([]);
	const [error, setError] = useState(false);
	const [resourceCount, setResourceCount] = useState([]);

	const loadCustomers = () => {
		getCustomers().then(data => {
			if (data.error) {
	            setError(data.error);
	        } else {
	            setCustomer(data);
	        }
        })
	}

	const loadResourcesByCustomer = () => {
		getCustomerResources().then(data => {
			if (data.error) {
	            setError(data.error)
	            console.log(data.error)
	        } else {
	        	setResourceCount(data)
	        }
        })
	}

	useEffect(() => {
        loadCustomers()
        loadResourcesByCustomer()
    }, [])

	let countResource = [];	
    const resourceTotal = customerCode => {
    	countResource = resourceCount.filter(r=> {
    		if(r.customer==customerCode) return r
    		else return null
    		})
    	return countResource.length
    }

	return (
		<React.Fragment>
			<div id="All_Companies">
				<span>All Customers</span>
			</div>
			<div id="Component_1262__1" class="Component_1262___1">
				<Link to="/create-customer"><Button primary content='Submit'>Add New Customer</Button></Link>
			</div>
			<div className="Rectangle_3325">
				<div>
					<table className="resourceList">
						<tr>
							<th className="listHeader" style={{textAlign:"left"}}>Customer Name</th>
							<th className="listHeader" style={{textAlign:"left"}}>Customer Short Name</th>
							<th className="listHeader" style={{textAlign:"left"}}>Customer Code</th>
							<th className="listHeader" style={{textAlign:"left"}}>Status</th>
							<th className="listHeader" style={{textAlign:"left"}}>Users</th>
						</tr>
						{customer.map((user, i) => (
							<tr key={i}>
								<Link to={`/customer/${user._id}`}><td className="listData">{user.customerName}</td></Link>
								<td className="listData" style={{textAlign:"left"}}>{user.shortName}</td>
								<td className="listData" style={{textAlign:"left"}}>{user.customerCode}</td>
								<td className="listData" style={{textAlign:"left"}}><Checkbox toggle checked={user.customerStatus} /></td>
								<td className="listData" style={{textAlign:"left"}}>{resourceTotal(user.customerCode)}</td>
							</tr>
							))}
					</table>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Customers