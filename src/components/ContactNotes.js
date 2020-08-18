import React, { Component } from 'react'
import { Formik, Field, Form } from 'formik';
import { TextField } from '@material-ui/core';
import { Table, Button } from 'semantic-ui-react';
import 'react-day-picker/lib/style.css';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Datepicker } from 'react-formik-ui';
import _ from 'lodash'
// import store from '../reducers/index'
// imports

export class ContactNotes extends Component {

  constructor() {
    super()
    // this.handleDayChange = this.handleDayChange.bind(this);
    this.state ={
      notes: [],
      direction: 'ascending',
      column: null
    };
  }

  handleDirection = (e, { value }) => this.setState({ direction: value })
  handleColumn = (event, { value }) => this.setState({ column: value })

  handleSort = (clickedColumn) => () => {
    const { column, notes, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        notes: _.sortBy(notes, [clickedColumn]),
        direction: 'ascending',
      })
      return
    }
    this.setState({
      notes: notes.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/notes/')
    .then(resp => resp.json())
    .then(notes => {
      // console.log("log", notes.map(note => {
      //   return( note)}),
      console.log('props', this.props.id)
      this.setState({
        notes: notes
      })
    })
  }
  
  render() {
    console.log(this.state.notes)
    const contactId = this.props.id
    const postReq = 'http://localhost:3000/notes'
    const { column, direction } = this.state


    const filteredNotes = this.state.notes.filter(note => {
      return (note.contact_id == contactId)
    }) 

    console.log(filteredNotes)

    const datesOnly = filteredNotes.map(note => {
      const date = new Date(note.date)
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    })
    console.log(datesOnly)

    return (
      <div className="Notes">
      <h3>Contact Notes</h3>

        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'date' ? direction : null}
                onClick={this.handleSort('date')}
              >Date</Table.HeaderCell>
              <Table.HeaderCell>Note Body</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          { 
            filteredNotes.map(
              (note) => {
                const funDate = new Date(note.date) 
                return(
                  <Table.Row>
                    <Table.Cell>
                      { 
                        
                         (funDate.getMonth() + 1) + '/' + funDate.getDate() + '/' + funDate.getFullYear()
                      }
                      </Table.Cell> 
                    <Table.Cell>{note.body}</Table.Cell>
                  </Table.Row>
                )
              }
            )
          }
          </Table.Body>
        </Table>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        <h4>New Note</h4>
          <Formik 
            enableReinitialize={true}
            initialValues={{
            contact_id: contactId,
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
            // console.log(configObj)
            .then(resp => resp.json())
            .then(data => {
              fetch('http://localhost:3000/notes/')
              .then(resp => resp.json())
              .then(newNotes => {
                this.setState({
                  notes: newNotes
                })
              })
            })
            setSubmitting(false);
           }}
          >
            
            {({ values, isSubmitting })=> (
              <Form >
                <div>
                <Datepicker 
                  name="date" 
                  label='Select date of note' 
                  placeholder='YYYY.MM.DD' 
                  dateFormat='yyyy.MM.dd'
                  />
                  <br></br>
                </div>
                <div>
                  <Field 
                    placeholder="Note"
                    name="body" 
                    type="input" 
                    id="outlined-multiline-flexible"
                    
                    multiline
                    rowsMax={4}
                    variant='outlined'
                    as={TextField}
                  />
                  <div><br></br>

                  <Button disabled={isSubmitting} type="submit" variant='outlined'>Submit</Button>
                  
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        </MuiPickersUtilsProvider>
    </div>
    )
  }
}

{/* <Table.Body> 
    <Table.Row>
    {datesOnly.map(
      date => {
        return(
        <Table.Cell>{date}</Table.Cell>
        )
      })
    }
   { filteredNotes.map(
      ({date, body}) => {
        return(
          <Table.Cell>{body}</Table.Cell>
        )
      }
    )}
  </Table.Row>
</Table.Body> */}
export default ContactNotes;
