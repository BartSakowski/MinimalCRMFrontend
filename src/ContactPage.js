import React from 'react';
import ContactInfo from './components/ContactInfo'
import ContactNotes from './components/ContactNotes'
import ContactCalendar from './components/ContactCalendar'
import ContactMap from './components/ContactMap'
import { Grid } from 'semantic-ui-react';

class ContactPage extends React.Component{

  constructor() {
    super()
    this.state ={
      id: '',
      contact: []
    }
  }

  componentDidMount(){
    
    const id = this.props.match.params.contactId
    // const getContacts = 'http://localhost:3000/contacts/'
    fetch(`http://localhost:3000/contacts/${id}`)
    .then(resp => resp.json())
    .then(contact =>{
      this.setState({
        id: id,
        contact: contact
      })
    })
    }
  


  render() {
    // console.log(this.state.contact)
    // console.log(this.props)
    console.log(this.props.match.params.contactId)
    // console.log(this.state.id)
    // console.log('key', this.props.key)\

    return(
      <div style = {{ position: 'right', width: '70vw', height: '70vh' }}>
        <h3>Contact Page</h3>
          <Grid celled='internally' centered >
            <Grid.Row>
              <Grid.Column width={5}>
                <ContactInfo contact={this.state.contact}/>
              </Grid.Column>
        
              <Grid.Column width={5}>
               <ContactNotes id={this.state.id}/>
              </Grid.Column>
            </Grid.Row>

            {/* <Grid.Row>
              <Grid.Column width={5}>
               <ContactCalendar/>
              </Grid.Column>

              <Grid.Column width={5}>
                <ContactMap />
              </Grid.Column>
            </Grid.Row> */}
          </Grid>
      </div>
    )
  }


}

export default ContactPage;

