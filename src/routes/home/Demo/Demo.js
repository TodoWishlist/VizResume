import React, { Component } from 'react';
import * as d3 from 'd3';
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

  moveDivisor = () => {
    const divisor = d3.select('#divisor');
    const slider = d3.select('#slider');
    divisor.style.width = `${slider.value} %`;
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
              <figure>
                <div id={'divisor'} />
              </figure>
              <input type="range" min="0" max="100" value="50" id={'slider'} onInput={this.moveDivisor} />
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
