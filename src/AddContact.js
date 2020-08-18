import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, Checkbox, Select, MenuItem } from '@material-ui/core';
import { getCurrentUser} from './actions/user';
// import { Button, Checkbox, Form } from 'semantic-ui-react'

import { connect } from 'react-redux';
import store from './reducers/index'


const postReq = 'http://localhost:3000/contacts';

const AddContact = () => {
  console.log(store.getState().user.id)
  return(
    <div>
      <h3 >Add a New Contact</h3>
      <Formik initialValues={{
          first_name: '',
          last_name: '',
          phone_number: '',
          email: '',
          client_type: '',
          transaction_status: '',
          referral: false,
          referral_agent: "",
          referral_office: "",
          referral_fee: "",
          user_id: store.getState().user.id
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          
          resetForm({})
          setSubmitting(true);
          const configObj = {
            method: 'POST',
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
        }}
        >
        {({ values, isSubmitting })=> (
          <Form className='formik'>
          <div className='formik-field'>
            <Field 
              style = {{width: 600}}
              placeholder="First Name"
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

          <div >
          <p>
            Client Type:
          <Field className="select-field" type="select" placeholder="Client Type" as={Select} name="client_type">
            <MenuItem value="Buyer">Buyer</MenuItem>
            <MenuItem value="Seller">Seller</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Tenant">Tenant</MenuItem>
            <MenuItem value="Landlord">Landlord</MenuItem>
            <MenuItem value="Prospect">Prospect</MenuItem>
            <MenuItem value="Agent">Agent</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Field>
          </p>
          </div>
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
            {/* {console.log(values)} */}
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

          </Form>
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

export default connect(null, mapDispatchToProps)(AddContact);






