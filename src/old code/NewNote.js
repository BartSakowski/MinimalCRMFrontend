import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Depending on the library you picked
import DateFnsUtils from '@date-io/date-fns';

const postReq = 'http://localhost:3000/notes'

const NewNote = (props) => {
  const id = props.id
  
  // console.log(id)
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div>
    <h4>New Note</h4>
    <Formik enableReinitialize={true} initialValues={{
      contact_id: id,
      date: '',
      body: ''
    }}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      
      setSubmitting(true); 
      resetForm({});
      
      const configObj = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values)
      };
  
      fetch(postReq, configObj)
      .then(resp => resp.json())
      setSubmitting(false);
    }}
    >
      {({ values, isSubmitting })=> (
        <Form >
        {/* {console.log(values)} */}
          <div>
            <Field 
              placeholder="Date"
              name="date" 
              type="input" 
              as={TextField}
            />
          </div>
          <div>
            <Field 
              placeholder="Body"
              name="body" 
              type="input" 
              as={TextField}
            />
            <div>
            <div>
              {/* <Field component={DatePicker} name="date" as={TextField}/> */}
            </div>
            <Button disabled={isSubmitting} type="submit" variant='outlined'>Submit</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  </MuiPickersUtilsProvider>

  );
}


export default NewNote;