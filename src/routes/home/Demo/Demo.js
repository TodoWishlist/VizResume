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
        <div className={styles.sectionWrapper}>
          <div className={styles.headerWrapper}>
            <h1>vizresume</h1>
          </div>
          <div>
            <div className={styles.imageWrapper}>
              <div>
                <img alt="" className={styles.imageContainer} src="http://2.bp.blogspot.com/-VUtyA1E1LXs/U-tG_FPz0UI/AAAAAAAAIHc/dXifHfeBCUQ/s1600/face-before.jpg" />
              </div>
              <img alt="" className={styles.imageContainer} src="http://1.bp.blogspot.com/-bEQl5-KrxHY/U-tG9gPXbZI/AAAAAAAAIHU/JEI5b_YRpjY/s1600/face-after.jpg" />
            </div>
          </div>
          <div className={styles.contentWrapper}>
            lalala
          </div>
        </div>
        <div className={styles.sectionWrapper}>
          <div className={styles.headerWrapper}>
            <h1>resumeviz</h1>
          </div>
          <div className={styles.imageWrapper}>
            <img alt="" className={styles.imageContainer} src="https://static1.squarespace.com/static/55523fe4e4b07975f178746a/t/55958c04e4b0edd30aa374a6/1435864070125/" />
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(styles)(Demo);
