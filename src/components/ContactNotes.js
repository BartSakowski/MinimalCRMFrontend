import React, { Component } from 'react'
import { Formik, Field, Form } from 'formik';
import { TextField } from '@material-ui/core';
import { Table, Button } from 'semantic-ui-react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Datepicker } from 'react-formik-ui';
import _ from 'lodash'


export class ContactNotes extends Component {

  constructor() {
    super()
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
      <div id="contact-notes">
        <h3>Contact Notes</h3>
          <Table className='note-table' sortable celled fixed>
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
          <div id="formik-note">
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
                  <Form>
                    <Datepicker
                      className='date-picker'
                      name="date"
                      
                      placeholder='Date of Note' 
                      dateFormat='yyyy.MM.dd'
                    />
                    <Field
                      className='note-field'
                      placeholder="Note"
                      name="body" 
                      type="input" 
                      id="outlined-multiline-flexible"
                      multiline
                      rowsMax={4}
                      variant='outlined'
                      as={TextField}
                    />
                    <Button disabled={isSubmitting} type="submit" variant='outlined'>Submit</Button>
                  </Form>
                )}
              </Formik>
            </div>
          </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default ContactNotes;


