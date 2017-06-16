import React from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate(roomId) {
    console.log(this.props);
    console.log(roomId);
    console.log(this.props.history);
    this.props.history.push(`dashboard/${roomId}`);
  }

  render() {
    const props = this.props;
    return (
      <div>
        <ListItem key={props.id} primaryText={props.name} onClick={() => this.navigate(props.name)}>
        </ListItem>
        <Divider inset={false} />
      </div>
    )
  }
}
