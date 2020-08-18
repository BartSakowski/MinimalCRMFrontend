import React from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


const ContactRender = (props) => {
  // console.log('render', props)

  const {first_name, last_name, phone_number, email, client_type, transaction_status, referral} = props.contact
  return (
    <div>

    <Grid columns={8} divided onClick={props.handleClick}>
      <Grid.Row>
        <Grid.Column>
          {first_name}
        </Grid.Column>
        <Grid.Column>
          {last_name}
        </Grid.Column>
        <Grid.Column>
          {phone_number}
        </Grid.Column>
        <Grid.Column>
          {email}
        </Grid.Column>
        <Grid.Column>
          {client_type}
        </Grid.Column>
        <Grid.Column>
          {transaction_status}
        </Grid.Column>
        <Grid.Column>
          {referral ? 'Yes' : 'No'}
        </Grid.Column>
        <Grid.Column>
          <Button as={Link} to={`/contact/${props.contact.id}`}>View</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
  )
}

export default ContactRender;


      {/* <Table celled>
      <Table.Body>
        <Table.Cell>{first_name}</Table.Cell>
        <Table.Cell>{last_name}</Table.Cell>
        <Table.Cell>{phone_number}</Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{client_type}</Table.Cell>
        <Table.Cell>{transcaction_status}</Table.Cell>
        <Table.Cell>{referral}</Table.Cell>
        <Table.Cell>{first_name}</Table.Cell>

      </Table.Body>
      </Table> */}