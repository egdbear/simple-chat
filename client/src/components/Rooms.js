import React from 'react';
import { map } from 'lodash';
import Room from './Room';
import { List } from 'material-ui/List';
import './Rooms.css';

export default class Rooms extends React.Component {
  render() {
    const { rooms, history} = this.props;

    const roomsList = map(rooms, r => {
      return <Room {...r} history={history} />
    });

    return (
      <List className={'rooms-list'}>
        {roomsList}
      </List>
    )
  }
}
