import React, { Component } from 'react';
import '../App.css';
import { Button } from 'semantic-ui-react';

import { Link } from 'react-router-dom'



export class ContactInfo extends Component {
  
  render() {
    const {first_name, last_name, phone_number, email, client_type, transaction_status, referral, referral_agent, referral_office, referral_fee} = this.props.contact
    const contact = this.props.contact
    // console.log(contact)

    return (
      <div id='contact-info'>
        <h3>Contact Information</h3>
          <div><strong>First Name:</strong> {first_name}</div>
          <div><strong>Last Name:</strong> {last_name}</div>
          <div><strong>Phone Number:</strong> {phone_number}</div>
          <div><strong>Email:</strong> {email}</div>
          <div><strong>Client Type:</strong> {client_type}</div>
          <div><strong>Transaction Status:</strong> {transaction_status}</div>
          <div><strong>Referral?</strong> {referral ? ' Yes' : ' No'}</div>
          <div>{referral ? `Referral Agent: ${referral_agent}` : ""}</div>
          <div>{referral ? `Referral Office: ${referral_office}` : ""}</div>
          <div>{referral ? `Referral Fee: ${referral_fee}` : ""}</div>
          <Button variant='outlined' as={Link} to={{
            pathname: '/editcontact',
            state: { contact: {contact} }
          }} contactEdit={ contact }>Edit Contact</Button>
      </div>
    )
  }
}

export default ContactInfo
