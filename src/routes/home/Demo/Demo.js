import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Demo.css';


class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      extendDataSet: [],
    };
  }


  render() {
    return (
      <section className={styles.demoWrapper}>
        <div className={styles.vizresume}>vizresume</div>
        <div className={styles.resumeviz}>resumeviz</div>
      </section>
    );
  }
}

export default withStyles(styles)(Demo);
