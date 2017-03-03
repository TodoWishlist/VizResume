import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Home.css';
import HomeAbstract from './HomeAbstract/HomeAbstract';
// import HomeHero from './HomeHero/HomeHero';
import Vizresume from '../../components/VizResume';
import HomeStory from './HomeStory/HomeStory';
import HomeBottomSignup from './HomeBottomSignup/HomeBottomSignup';
import Demo from './Demo/Demo';

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
        <HomeAbstract />
        <div className={styles.image} />
        <Demo />
        <HomeStory />
        <HomeBottomSignup />
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
