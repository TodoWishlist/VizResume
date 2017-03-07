import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './EorW.css';

const EorW = ({ dataSet }) => (
  <div id={'test'} className={styles.EorWContainer}>
    {console.log(dataSet)}
    <div>Data Engineer  |  June 2015 - Current</div>
    <div className={styles.tooltipRule} />
    <div>Net Esolutions</div>
  </div>
);

EorW.propTypes = {
  dataSet: React.PropTypes.array,
};

export default withStyles(styles)(EorW);
