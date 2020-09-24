import { API } from './config'

export const createTask = (task) => {
    return fetch(`${API}/task/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCompany = (company) => {
    return fetch(`${API}/company/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(company)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCustomer = (customer) => {
    return fetch(`${API}/customer/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(customer)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getCompanies = () => {
    return fetch(`${API}/companies`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTasks = () => {
    return fetch(`${API}/tasks`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCustomers = () => {
    return fetch(`${API}/customers`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCompany = companyId => {
    return fetch(`${API}/company/${companyId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTask = taskId => {
    return fetch(`${API}/task/${taskId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCustomer = customerId => {
    return fetch(`${API}/customer/${customerId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateCustomer = (customerId, customer) => {
    return fetch(`${API}/customer/${customerId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(customer)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateTask = (taskId, task) => {
    return fetch(`${API}/task/${taskId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(task)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getResources = () => {
    return fetch(`${API}/resources`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCustomerResources = () => {
    return fetch(`${API}/customerResources`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getResource = resourceId => {
    return fetch(`${API}/resource/${resourceId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCustomerResource = customerResourceId => {
    return fetch(`${API}/customerResource/${customerResourceId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getResourcePhoto = resourceId => {
    return fetch(`${API}/resource/photo/${resourceId}`, {
        method: 'GET'
    })
        .then(response => {
            return console.log(response)
        })
        .catch(err => console.log(err));
};

export const getCustomerResourcePhoto = customerResourceId => {
    return fetch(`${API}/customerResource/photo/${customerResourceId}`, {
        method: 'GET'
    })
        .then(response => {
            return console.log(response)
        })
        .catch(err => console.log(err));
};

export const updateResource = (resourceId, resource) => {
    return fetch(`${API}/resource/${resourceId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
        },
        body: resource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateCustomerResource = (customerResourceId, customerResource) => {
    return fetch(`${API}/customerResource/${customerResourceId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
        },
        body: customerResource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteResource = (resourceId) => {
    return fetch(`${API}/resource/${resourceId}/`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteCustomerResource = (customerResourceId) => {
    return fetch(`${API}/customerResource/${customerResourceId}/`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createResource = (resource) => {
    return fetch(`${API}/resource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            
            // Authorization: `Bearer ${token}`
        },
        body: resource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createResource1 = (resource) => {
    return fetch(`${API}/resource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: resource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createResource2 = (resource) => {
    return fetch(`${API}/resource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: resource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createResource3 = (resource) => {
    return fetch(`${API}/resource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: resource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createResource4 = (resource) => {
    return fetch(`${API}/resource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: resource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createResource5 = (resource) => {
    return fetch(`${API}/resource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: resource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCustomerResource = (customerResource) => {
    return fetch(`${API}/customerResource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            
            // Authorization: `Bearer ${token}`
        },
        body: customerResource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCustomerResource1 = (customerResource) => {
    return fetch(`${API}/customerResource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: customerResource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCustomerResource2 = (customerResource) => {
    return fetch(`${API}/customerResource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: customerResource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCustomerResource3 = (customerResource) => {
    return fetch(`${API}/customerResource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: customerResource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCustomerResource4 = (customerResource) => {
    return fetch(`${API}/customerResource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: customerResource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCustomerResource5 = (customerResource) => {
    return fetch(`${API}/customerResource/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: customerResource
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};