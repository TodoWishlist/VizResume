import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './EorW.css';

const EorW = () => (
  <div id={'test'} className={styles.EorWContainer}>
    <div>
      <div>Data Engineer</div>
    </div>
  </div>
);

export default withStyles(styles)(EorW);
