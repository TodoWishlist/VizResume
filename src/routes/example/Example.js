import React, { Component } from 'react';
import { Container } from 'reactstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import vizresume from '../../components/VizResume';
import styles from './Example.css';

class Example extends Component {
  render() {
    return (
      <Container>
        xxx
        <vizresume />
      </Container>
    );
  }
}


// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Example);
