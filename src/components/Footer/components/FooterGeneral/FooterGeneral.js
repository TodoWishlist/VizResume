import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FooterGeneral.css';

const FooterGeneral = () => (
  <div className={styles.FooterGeneralWrapper}>
    <small>© Copyright 2017. Crafted with love by <a>@Viz U Resume</a></small>
  </div>
);

export default withStyles(styles)(FooterGeneral);
