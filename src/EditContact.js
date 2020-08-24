import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, Checkbox, Select, MenuItem } from '@material-ui/core';
import { getCurrentUser} from './actions/user';
import { connect } from 'react-redux';
import store from './reducers/index'


const EditContact = (props) => {

  const contact = props.location.state.contact.contact.id
  const postReq = `http://localhost:3000/contacts/${contact}`;
  console.log(props.location.state)
  const {first_name, last_name, phone_number, email, client_type, transaction_status, referral, referral_agent, referral_office, referral_fee} = props.location.state.contact.contact
  console.log(first_name)

  return(
    <div>
      <h3>Edit Your Contact's Information</h3>
      <Formik initialValues={{
          first_name: `${first_name}`,
          last_name: `${last_name}`,
          phone_number: `${phone_number}`,
          email: `${email}`,
          client_type: `${client_type}`,
          transaction_status: `${transaction_status}`,
          referral: `${referral}`,
          referral_agent: `${referral_agent}`,
          referral_office: `${referral_office}`,
          referral_fee: `${referral_fee}`,
          user_id: store.getState().user.id
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {

          resetForm({})
          setSubmitting(true);
          const configObj = {
            method: 'PATCH',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(values)
          };
      
          fetch(postReq, configObj)
          // console.log(reqObj)
          .then(resp => resp.json())
          console.log('submit:', values);
          setSubmitting(false);
          // history.replace('/home');
          // setToNext(true)
        //  return (props.push('/home'))
        }}
        >
        {({ values, isSubmitting })=> (
          <Form className='formik'>
          <div className='formik-field'>
            <Field 
              style = {{width: 600}}
              placeholder={first_name}
              name="first_name" 
              type="input" 
              variant='outlined'
              as={TextField}
            />
          </div>
          <div className='formik-field'>
            <Field 
              style = {{width: 600}}
              placeholder="Last Name"
              name="last_name" 
              type="input" 
              variant='outlined'
              as={TextField}
            />
          </div>
          <div className='formik-field'>
          <Field 
              style = {{width: 600}}
              placeholder="Phone Number"
              name="phone_number" 
              type="input" 
              variant='outlined'
              as={TextField}
            />
          </div>
          <div className='formik-field'>
          <Field 
              style = {{width: 600}}
              placeholder="Email"
              name="email" 
              type="input" 
              variant='outlined'
              as={TextField}
            />
          </div>


          Client Type: 
          <Field className="select-field" type="select" placeholder="Client Type" as={Select} name="client_type">
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
            <MenuItem value="friend">Friend</MenuItem>
            <MenuItem value="tenant">Tenant</MenuItem>
            <MenuItem value="landlord">Landlord</MenuItem>
            <MenuItem value="prospect">Prospect</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Field>
          <div>
            Transaction Status: 
            <Field className="select-field" type="select" placeholder="Transaction Status" as={Select} name="transaction_status">
              <MenuItem value="n/a">N/A</MenuItem>
              <MenuItem value="new lead">New Lead</MenuItem>
              <MenuItem value="actively searching">Actively Searching</MenuItem>
              <MenuItem value="offer accepted">Offer Accepted</MenuItem>
              <MenuItem value="clear to close">Clear to Close</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Field>
          </div>


          <div>
            Is this a referral?
            <Field name="referral" type="checkbox" as={Checkbox} />
          </div>

          <div className='formik-field'>
            {values.referral ?
              (
              <Field 
                  style = {{width: 600}}
                  placeholder="Referral Agent's Name"
                  name="referral_agent" 
                  type="input" 
                  variant='outlined'
                  as={TextField}
                />
                ) : (<div></div>)
              }
          </div>

          <div className='formik-field'>
            {values.referral ?
              (
              <Field 
                className='formik-field'
                style = {{width: 600}}
                placeholder="Referral Agent's Office"
                name="referral_office" 
                type="input" 
                variant='outlined'
                as={TextField}
              />
                ) : (<div></div>)
              }
          </div>

          <div className='formik-field'>
            {values.referral ?
              (
              <Field 
                
                style = {{width: 600}}
                placeholder="Referral Fee"
                name="referral_fee" 
                type="input" 
                variant='outlined'
                as={TextField}
              />
                ) : (<div></div>)
              }
          </div>

          <div>
            <Button disabled={isSubmitting} type="submit" variant='outlined'>Submit</Button>
          </div>

          </Form >
      )}
      </Formik>
          
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (token) => dispatch(getCurrentUser(token)),

  };
};



export default connect(null, mapDispatchToProps)(EditContact);






