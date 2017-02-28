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
    this.click = false;
  }

  startListener = () => {
    this.click = true;
  }

  dragging = (event) => {
    if (this.click) {
      const target = document.getElementsByClassName(styles.container)[0];
      target.style.width = `${event.nativeEvent.offsetX - 5}px`;
    }
  }

  releaseListener = () => {
    this.click = false;
  }

  render() {
    return (
      <section className={styles.demoWrapper}>
        <div className={styles.sectionWrapper}>
          <div className={styles.headerWrapper}>
            <h1>vizresume</h1>
          </div>
          <div className={styles.imageWrapper}>
            <div
              className={styles.imageSlider}
              onMouseMove={this.dragging}
              onMouseUp={this.releaseListener}
            >
              <div className={styles.container}>
                <div className={styles.slider} onMouseDown={this.startListener} />
                <div className={styles.img} />
              </div>
              <div className={styles.img} />
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
