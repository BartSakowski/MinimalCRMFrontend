import React from 'react';
import { Form, Button, Radio } from 'semantic-ui-react'
import { Formik } from 'formik';
import { useFormik } from 'formik';

const clientOptions = [
  { text: 'None', value: 'none', id: 'none', name: 'none' },
  { text: 'Buyer', value: 'buyer', id: 'buyer', name: 'buyer' },
  { text: 'Seller', value: 'seller', id: 'seller', name: 'seller' },
  { text: 'Friend', value: 'friend', id: 'freind', name: 'freind' },
  { text: 'Tenant', value: 'tenant', id: 'tenant', name: 'tenant' },
  { text: 'Landlord', value: 'landlord', id: 'landlord', name: 'landlord' },
  { text: 'Prospect', value: 'prospect', id: 'prospect', name: 'prospect' },
  { text: 'Agent', value: 'agent', id: 'agent', name: 'agent' }
]

const transOpts = [
  { text: 'n/a', value: 'n/a', id: 'n/a', name: 'n/a'},
  { text: 'New Lead', value: 'new lead', id: 'new lead', name: 'new lead'},
  { text: 'Actively Searching', value: 'actively searching', id: 'actively searching', name: 'actively searching'},
  { text: 'Offer Accepted', value: 'offer accepted', id: 'offer accepted', name: 'offer accepted'},
  { text: 'Clear to Close', value: 'clear to close', id: 'clear to close', name: 'clear to close'}
]



const oldAddContact = () => {
  
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      client_type: '',
      transaction_status: '',
      referral: false
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  
  // render(){
    // console.log(this.state)
    console.log('Form Values', formik.values)
    return (
      <Formik>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>First Name</label>
          <input 
            type='text'
            id='first_name'
            placeholder='First Name' 
            value={formik.values.first_name} 
            onChange={formik.handleChange} />
        </Form.Field>

        <Form.Field>
          <label>Last Name</label>
          <input 
            type='text'
            id='last_name'
            placeholder='Last Name' 
            value={formik.values.last_name} 
            onChange={formik.handleChange}/>
        </Form.Field>

        <Form.Field>
          <label>Phone Number</label>
          <input 
            type='text'
            id='phone_number'
            placeholder='Phone Number' 
            value={formik.values.phone_number} 
            onChange={formik.handleChange}/>
        </Form.Field>

        <Form.Field>
          <label>Email</label>
          <input 
            type='email'
            id='email'
            placeholder='Email'
            value={formik.values.email} 
            onChange={formik.handleChange} />
        </Form.Field>

        <Form.Field>
          <label>Client Type</label>
          <Form.Select
            type='text'
            id='client_type'
            placeholder='Client Type' 
            options={clientOptions} 
            value={formik.values.client_type} 
            onChange={formik.handleChange}/>
        </Form.Field>

        <Form.Field>
          <label>Transaction Status</label>
          
          <Form.Select 
            id='transaction_status'
            name='transaction_status'
            placeholder='Transaction Status' 
            options={transOpts} 
            value={formik.values.transaction_status} 
            onChange={formik.handleChange}/>
        </Form.Field>

        <Form.Field>
          Referral? <b>{formik.values.referral}</b>
        </Form.Field>
        <Form.Field name="referral" type='checkbox' />
        <Form.Field>
          <Radio
            id='referral'
            label='Yes'
            name='referral'
            value='Yes'
            checked={formik.values.referral = true}
            onChange={formik.handleChange}/>
        </Form.Field>
        <Form.Field>
          <Radio
            id='referral'
            label='No'
            name='referral'
            value='no'
            checked={formik.values.referral = false}
            onChange={formik.handleChange}
          />
        </Form.Field>



        <Button type='submit'>Submit</Button>
      </Form>
      </Formik>
    )
  }
// }
export default oldAddContact;


//   // constructor(){
//   //   super()
//   //   this.state ={
//   //     first_name: "",
//   //     last_name: "",
//   //     phone_number: "",
//   //     email: "",
//   //     client_type: "",
//   //     transaction_status: "",
//   //     referral: null,
//   //     referral_agent: "",
//   //     referral_office: "",
//   //     referral_fee: ""
//   //   }
//   // }

//   // handleChange = field => (e, { value }) => {
//   //   this.setState({[field]:value})
//   // }

// <div className="newContact">
// <h3>Add Contact</h3>
  
//   <form>
//     First Name:
//     <input
//     type='text'
//     name='first_name'
//     onChange={this.handleChange}
//     value={this.state.first_name}
//     /><br></br>
//     Last Name:
//     <input
//     type='text'
//     name='last_name'
//     onChange={this.handleChange}
//     value={this.state.last_name}
//     /><br></br>
//     Phone Number:
//     <input
//     type='text'
//     name='Phone_Number'
//     onChange={this.handleChange}
//     value={this.state.phone_number}
//     /><br></br>
//     Email:
//     <input
//     type='text'
//     name='email'
//     onChange={this.handleChange}
//     value={this.state.email}
//     /><br></br>
//     Client Type:
//     <input
//     type='text'
//     name='client_type'
//     onChange={this.handleChange}
//     value={this.state.client_type}
//     /><br></br>
//     Transaction Status:
//     <input
//     type='text'
//     name='transaction_status'
//     onChange={this.handleChange}
//     value={this.state.transaction_status}
//     /><br></br>
//     Referral:
//     <input
//     type='text'
//     name='referral'
//     onChange={this.handleChange}
//     value={this.state.referral}
//     /><br></br>
//     Referral Agent:
//     <input
//     type='text'
//     name='referral_agent'
//     onChange={this.handleChange}
//     value={this.state.referral_agent}
//     /><br></br>
//     Referral Office:
//     <input
//     type='text'
//     name='referral_office'
//     onChange={this.handleChange}
//     value={this.state.referral_office}
//     /><br></br>
//     Referral Fee:
//     <input
//     type='text'
//     name='referral_fee'
//     onChange={this.handleChange}
//     value={this.state.referral_fee}
//     /><br></br>
//     <input type='submit' value='Add New Contact'/>


//   </form>

// </div> 

// export default AddContact; 



  // constructor(){
  //   super()
  //   this.state ={
  //     first_name: "",
  //     last_name: "",
  //     phone_number: "",
  //     email: "",
  //     client_type: "",
  //     transaction_status: "",
  //     referral: null,
  //     referral_agent: "",
  //     referral_office: "",
  //     referral_fee: ""
  //   }
  // }

  // handleChange = field => (e, { value }) => {
  //   this.setState({[field]:value})
  // }