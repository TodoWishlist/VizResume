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
     this.setState({ timeLineyScale: d3.scaleTime()
                      .range([900, 40])  //  total svg is 1024 height
                      .domain([this.state.parseDate('2007-03'), this.state.parseDate('2017-02')]) });
     this.setState({ EOrWColorScale: d3.scaleOrdinal().range(['#c15f56', 'steelblue']).domain(['Work', 'Edu']) });
   }

   componentDidMount() {
     this.init();
     this.viz(timeline);
   }

   componentDidUpdate() {
     this.init();
     this.viz(timeline);
   }

   init = () => {
     d3.select('#resumeViz')
         .attr('width', '900px')
         .attr('height', '1152px');
     d3.select(styles.wrapper)
      .attr('width', '800px')
      .attr('height', '1024px');
   }

   // add viz function
   viz = (timelineSet) => {
     this.timeLine(timelineSet);
   };

   skillPieChart = () => {
     const data = [
       { skill: 'python', weigth: 80 },
       { skill: 'MySQL', weigth: 90 },
       { skill: 'ETL', weigth: 80 },
       { skill: 'Post', weigth: 90 },
       { skill: 'python', weigth: 90 },
     ];
   }

   timeLine = (timelineSet) => {
     // get the timeline data
     const dataTimeLine = timelineSet;
     // clean and format the date
     const dataTimeLineReformat = dataTimeLine.map((d) => {
       const rObj = Object.assign({}, d);
       rObj.start = this.state.parseDate(rObj.start);
       rObj.end = this.state.parseDate(rObj.end);
       return rObj;
     });
     // set scales
     const xScale = d3.scaleOrdinal().range([30, 60]);
     const yScale = this.state.timeLineyScale;
    //  const yTextScale = d3.scaleOrdinal().range([25, 75]);
    //  const yRectScale = d3.scaleOrdinal().range([10, 55]);
     xScale.domain(['Work', 'Edu']);
    //  yTextScale.domain(['Work', 'Edu']);
    //  yRectScale.domain(['Work', 'Edu']);
     // select the timeLine container
     const timeLine = d3.select(`.${styles.timeWrapper}`);
     // create rect in order to mouseover
    //  timeLine.selectAll('rect')
    //   .data(dataTimeLineReformat, (d) => `${d.name}`)
    //   .enter()
    //   .append('rect')
    //   .attr('class', styles.rect)
    //   .attr('x', (d) => xScale(d.start))
    //   .attr('y', (d) => yRectScale(d.EOrW))
    //   .attr('width', (d) => (xScale(d.end) - xScale(d.start)))
    //   .attr('height', 30)
    //   .on('mouseover', (d) => this.showTooltip(d, 'timeline'))
    //   .on('mouseout', () => this.hideTooltip());
     // create all lines
     timeLine.selectAll('line')
      .data(dataTimeLineReformat, (d) => `${d.name}`)
      .enter()
      .append('line')
      .attr('class', (d) => `${styles.line} timeLine ${d.name}-line`)
      .attr('x1', (d) => xScale(d.EOrW))
      .attr('y1', (d) => yScale(d.start))
      .attr('x2', (d) => xScale(d.EOrW))
      .attr('y2', (d) => yScale(d.end))
      .style('stroke', (d) => this.state.EOrWColorScale(d.EOrW));
     // create all start circle
     timeLine.selectAll('circle.start')
       .data(dataTimeLineReformat, (d) => `${d.name}-${d.start}`)
       .enter()
       .append('circle')
       .attr('class', 'start')
       .attr('cx', (d) => xScale(d.EOrW))
       .attr('cy', (d) => yScale(d.start))
       .attr('r', 3)
       .attr('fill', (d) => this.state.EOrWColorScale(d.EOrW));
     // crate all end circle
     timeLine.selectAll('circle.end')
         .data(dataTimeLineReformat, (d) => `${d.name}-${d.end}`)
         .enter()
         .append('circle')
         .attr('class', 'end')
         .attr('cx', (d) => xScale(d.EOrW))
         .attr('cy', (d) => yScale(d.end))
         .attr('r', 3)
         .attr('fill', (d) => this.state.EOrWColorScale(d.EOrW));
     // create the text
    //  timeLine.selectAll('text')
    //     .data(dataTimeLineReformat, (d) => `${d.name}`)
    //     .enter()
    //     .append('text')
    //     .attr('class', styles.timeLineText)
    //     .attr('x', (d) => ((xScale(d.start) + xScale(d.end)) / 2) - 10)
    //     .attr('y', (d) => yTextScale(d.EOrW))
    //     .text((d) => d.name)
    //     .attr('font-family', 'sans-serif')
    //     .attr('font-size', '10px')
    //     .on('click', () => {
    //     });
   }

   render() {
     return (
       <div>
         <div className={styles.baseboard}>
           <svg id={'resumeViz'}>
             <g className={styles.wrapper}>
               <g className={styles.leftWrapper} />
               <g className={styles.mainWrapper} />
               <g className={styles.timeWrapper} />
             </g>
           </svg>
         </div>
       </div>
     );
   }
 }

 export default withStyles(styles)(ResumeViz);
