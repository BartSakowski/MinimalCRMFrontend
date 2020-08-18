import React from 'react';
import { Grid } from 'semantic-ui-react';
// import { Grid } from '@material-ui/core'

const ContactRender = (props) => {
  // console.log('render', props)

  const {date, body} = props.note
  return (
    <div>
    <Grid columns={2} divided onClick={props.handleClick}>
      <Grid.Row>
        <Grid.Column>
          {date}
        </Grid.Column>
        <Grid.Column>
          {body}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
  );
}

export default ContactRender;