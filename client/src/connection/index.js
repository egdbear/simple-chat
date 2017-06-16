import React from 'react';
import fetch from './fetch';

export default (Component) => {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {data: []};
    }

    componentDidMount() {
      const id = this.props.match.params.id;
      fetch(`/room/${id}`).then(function (response) {
        this.state = response;
      }).catch(function(err) {
        console.log(err);
      })
    }

    render() {
      return (
        <div><Component /> test</div>
      );
    }
  }
}
