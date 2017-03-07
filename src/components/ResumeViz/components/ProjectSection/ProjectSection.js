import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ProjectSection.css';

const ProjectSection = () => (
  <div id={'test2'} className={styles.projectContainer}>
    <div>
      <div>Project</div>
    </div>
  </div>
);

export default withStyles(styles)(ProjectSection);
