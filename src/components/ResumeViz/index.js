/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 import React, { PropTypes, Component } from 'react';
 import withStyles from 'isomorphic-style-loader/lib/withStyles';
 import * as d3 from 'd3';
 import styles from './Resumeviz.css';
 import allSKillsDetail from './allSKillsDetail.json';
 import timeline from './timeline.json';

 class ResumeViz extends Component {

   static propTypes = {
     data: PropTypes.any,
   }

   constructor(props) {
     super(props);
     this.state = {
       pre: '',
       parseDate: d3.timeParse('%Y-%m'),
     };
   }

   componentWillMount() {
   }

   componentDidMount() {
   }

   componentDidUpdate() {
   }

   init = () => {
   }

   // add viz function
   viz = () => {

   };

   render() {
     return (
       <div>
         <h1>ddd</h1>
         <svg id={'resumeViz'}>
           <line x1="0" y1="0" x2="200" y2="200" className={styles.line} />
         </svg>
       </div>
     );
   }
 }

 export default withStyles(styles)(ResumeViz);
