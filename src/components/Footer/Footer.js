import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Footer.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <small>© Copyright 2017. Crafted with love by <a href="#">@Todo&Wish</a></small>
    </div>
  </footer>
);

export default withStyles(styles)(Footer);
