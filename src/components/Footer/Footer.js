import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Footer.css';
import FooterGeneral from './components/FooterGeneral/FooterGeneral';
import FooterNavs from './components/FooterNavs/FooterNavs';

const Footer = () => (
  <section className={styles.footerWrapper}>
    <footer className={styles.rowContent}>
      <FooterNavs />
      <FooterGeneral />
    </footer>
  </section>
);

export default withStyles(styles)(Footer);
