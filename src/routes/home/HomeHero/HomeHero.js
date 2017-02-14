import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HomeHero.css';

import SignupForm from '../components/SignupForm/SignupForm';

class HomeHero extends Component {
  constructor(props) {
    super(props);
    this.state = { position: 'top' };
  }

  render() {
    return (
      <section>
        <div className={styles.image} />
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <h1 className={styles.header1}>Dare To Act&Think</h1>
            <p className={styles.subCopy}>
                Anytime, Anywhere, Anthing, Todo&Wish lets your life easier.
            </p>
          </div>
          <SignupForm dataSet={this.state} />
        </div>
      </section>
    );
  }
}

export default withStyles(styles)(HomeHero);
