import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './Layout'
import Companies from './Companies'
import AddCompany from './AddCompany'
import ViewCompany from './ViewCompany'
import Customers from './Customers'
import AddCustomer from './AddCustomer'
import ViewCustomer from './ViewCustomer'
import Tasks from './Tasks'



function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <Switch>
          <Route exact path="/companies" component={Companies} />
          <Route exact path="/create-company" component={AddCompany} />
          <Route exact path="/company/:companyId" component={ViewCompany} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/create-customer" component={AddCustomer} />
          <Route exact path="/customer/:customerId" component={ViewCustomer} />
          <Route exact path="/tasks" component={Tasks} />
        </Switch>
      </Router>
      

    </div>
  );
}

export default App;
