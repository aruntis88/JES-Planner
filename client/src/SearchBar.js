import React from 'react'
import { Search } from 'semantic-ui-react'

function SearchBar () {
	return (
		<React.Fragment>
			<Search size="large" icon="search" placeholder="Search tasks...."/>
		</React.Fragment>
	)
}

export default SearchBar

