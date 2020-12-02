import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { currentUser } from './actions/auth'
import store from './reducers/index'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const getContacts = 'http://localhost:3000/contacts'

class Home extends React.Component{

  constructor() {
    super()
    this.state ={
      contacts: [],
      direction: 'ascending',
      column: null
    }
  }

  handleDirection = (e, { value }) => this.setState({ direction: value })
  handleColumn = (event, { value }) => this.setState({ column: value })

  handleSort = (clickedColumn) => () => {
    const { column, contacts, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        contacts: _.sortBy(contacts, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      contacts: contacts.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }


  componentDidMount() {
   fetch(getContacts)
   .then(resp => resp.json())
   .then(contacts => {

     this.setState({
       contacts: contacts
     })
   })
  }

  render(){
    console.log("user", store.getState().user.id)
    // console.log(logged_in)
    const user = (store.getState().user)

    const myContacts = this.state.contacts.filter(contact => {
      if (contact.user_id === store.getState().user.id)
        return contact
    })    

    const { column, direction } = this.state

    if (myContacts.length === 0 ) {
    
      return <h2>You have no contacts, click 'Add Contact' above to add some.</h2>
    }
    
    return (

      <div className='table'>
        <h1> Welcome To Minimal CRM </h1>  
        <h3>Contacts</h3>
      
        <Table  sortable celled striped >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'first_name' ? direction : null}
                onClick={this.handleSort('first_name')}
              >
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'last_name' ? direction : null}
                onClick={this.handleSort('last_name')}             
              >
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'email' ? direction : null}
                onClick={this.handleSort('email')}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'client_type' ? direction : null}
                onClick={this.handleSort('client_type')}
              >
                Client Type
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'transaction_type' ? direction : null}
                onClick={this.handleSort('transaction_type')}
              >
                Transaction Type
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'referral' ? direction : null}
                onClick={this.handleSort('referral')}
              >
                Referral
              </Table.HeaderCell>
              <Table.HeaderCell>Click 'View" For More Info</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.state.contacts.map(
                contact => {
                  if (contact.user_id === store.getState().user.id)
                  return(
                  <Table.Row>
                    <Table.Cell>{contact.first_name}</Table.Cell>
                    <Table.Cell>{contact.last_name}</Table.Cell>
                    <Table.Cell>{contact.phone_number}</Table.Cell>
                    <Table.Cell>{contact.email}</Table.Cell>
                    <Table.Cell>{contact.client_type}</Table.Cell>
                    <Table.Cell>{contact.transaction_status}</Table.Cell>
                    <Table.Cell>{contact.referral ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell> <Button as={Link} to={`/contact/${contact.id}`}>View</Button></Table.Cell> 
                  </Table.Row>
                  );
                }
              )
            }
          </Table.Body>
        </Table>
      </div>
      
    )
  }
}

const mapDispatchToProps = {
  currentUser
}

export default connect(null, mapDispatchToProps)(Home);