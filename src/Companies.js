import React, { useState, useEffect } from 'react'
import './App.css'
import { Link, Redirect } from 'react-router-dom';
import { Button, Checkbox} from 'semantic-ui-react'
import { getCompanies, getResources } from './apiAdmin'


const Companies = () => {
	const [company, setCompany] = useState([]);
	const [error, setError] = useState(false);
	const [resourceCount, setResourceCount] = useState([]);

	const loadCompanies = () => {
		getCompanies().then(data => {
			if (data.error) {
	            setError(data.error);
	        } else {
	            setCompany(data);
	        }
        })
	}

	const loadResourcesByCompany = () => {
		getResources().then(data => {
			if (data.error) {
	            setError(data.error)
	            console.log(data.error)
	        } else {
	        	setResourceCount(data)
	        }
        })
	}

	useEffect(() => {
        loadCompanies()
        loadResourcesByCompany()
    }, [])

	let countResource = [];	
    const resourceTotal = companyCode => {
    	countResource = resourceCount.filter(r=> {
    		if(r.company==companyCode) return r
    		else return null
    		})
    	return countResource.length
    }

	return (
		<React.Fragment>
			<div id="All_Companies">
				<span>All Companies</span>
			</div>
			<div id="Component_1262__1" class="Component_1262___1">
				<Link to="/create-company"><Button primary content='Submit'>Add New Company</Button></Link>
			</div>
			<div className="Rectangle_3325">
				<div>
					<table className="resourceList">
						<tr>
							<th className="listHeader" style={{textAlign:"left"}}>Company Name</th>
							<th className="listHeader" style={{textAlign:"left"}}>Company Short Name</th>
							<th className="listHeader" style={{textAlign:"left"}}>Company Code</th>
							<th className="listHeader" style={{textAlign:"left"}}>Status</th>
							<th className="listHeader" style={{textAlign:"left"}}>Users</th>
						</tr>
						{company.map((user, i) => (
							<tr key={i}>
								<Link to={`/company/${user._id}`}><td className="listData">{user.companyName}</td></Link>
								<td className="listData" style={{textAlign:"left"}}>{user.shortName}</td>
								<td className="listData" style={{textAlign:"left"}}>{user.companyCode}</td>
								<td className="listData" style={{textAlign:"left"}}><Checkbox toggle checked={user.companyStatus} /></td>
								<td className="listData" style={{textAlign:"left"}}>{resourceTotal(user.companyCode)}</td>
							</tr>
							))}
					</table>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Companies