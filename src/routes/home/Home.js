import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Home.css';

import HomeHero from './HomeHero/HomeHero';
import HomeStory from './HomeStory/HomeStory';
import HomeBottomSignup from './HomeBottomSignup/HomeBottomSignup';
import Demo from './Demo/Demo';
import ModalExample from '../../components/Email/Email';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div className={styles.supremeContainer}>
        <h1 className={styles.header}>Viz u resume</h1>
        <HomeHero />
        <Demo />
        <HomeStory />
        <HomeBottomSignup />
        <ModalExample />
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Home);
