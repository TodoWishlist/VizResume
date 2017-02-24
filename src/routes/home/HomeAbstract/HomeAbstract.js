import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HomeAbstract.css';

const FooterGeneral = () => (
  <div className={styles.HomeAbstractWrapper}>
    <div className={styles.textContainer}>
      <h1 className={styles.header}>
        <strong>
          Vizume is a resume visualization firm
          <br />
          in Washington DC
        </strong>
      </h1>
      <h2 className={styles.subHeader}>
        <br />
        Vizume helps college/master/phd candidates and experienced job seekers to get
         a reasonable career guidance and develop their resume
         in order to draw the attention from HR and companes.
      </h2>
    </div>
  </div>
);

export default withStyles(styles)(FooterGeneral);
