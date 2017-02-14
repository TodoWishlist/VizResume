import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Vizresume from '../../components/VizResume';
import styles from './Example.css';

class Example extends Component {
  render() {
    return (
      <div>
        <Vizresume />
      </div>
    );
  }
}


// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Example);
