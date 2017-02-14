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
 import styles from './Vizresume.css';
 import data from './data.json';

 class Viz extends Component {

   static propTypes = {
     data: PropTypes.any,
   }

   componentDidMount() {
    //  console.log(data);
     this.init();
     this.viz(data);
   }

   componentDidUpdate() {
     this.init();
     this.viz(data);
   }

   init = () => {
     d3.select('#vizSvg')
         .attr('width', '1500px')
         .attr('height', '800px');

    // d3.select('#upperContainer')
   }

   // add viz function
   viz = (dataSet) => {
     const allCategoryValue = [4.6, 2, 4];
     allCategoryValue.push(allCategoryValue[0]);
     //
    //  this.radarChartDrawBase(allCategoryValue);
    //  this.radarChartDrawLine([['a', 'b', 'c'], allCategoryValue]);
     this.barChart(dataSet);
   };

   radarChart = () => {

   }

   barChart = (dataSet) => {
    //  console.log(dataSet);
    //  const viz = d3.select('#vizSvg');
     const barBackgroundHeight = 25;
     const barHeight = 15;
     const maxBarWeight = 200;
     const actualBarStartXPos = 75;
     const actualBarStartYPos = 20;
     const temp = d3.nest()
                    .key((d) => d.parent)
                    .rollup((leaves) => leaves.length)
                    .map(dataSet);
     console.log(temp);
     const dataBar = [
       {
         skill: 'ETL',
         amount: 3,
       }, {
         skill: 'Machine Learning',
         amount: 4,
       }, {
         skill: 'Data Mining',
         amount: 5,
       }, {
         skill: 'Data Viz Interact',
         amount: 5,
       }, {
         skill: 'Big Data',
         amount: 3,
       }, {
         skill: 'Cloud Server',
         amount: 1,
       }, {
         skill: 'Database',
         amount: 7,
       }];

     // sort dataBar by amount
     dataBar.sort((x, y) => y.amount - x.amount);

     const allAmount = dataBar.map((i) => i.amount);
     const allAmountLength = allAmount.length;
     // const minAmount = d3.min(allAmount);
     const maxAmount = d3.max(allAmount);
     // create scale functions
     const barScale = d3.scaleLinear()
         .domain([0, maxAmount])
         .range([0, maxBarWeight]);

     const xScale = barScale;
     // define X axis
     const xAxis = d3.axisBottom(xScale)
         .ticks(maxAmount < 11 ? maxAmount : maxAmount / 2);
     // create the whole Bar Chart container
     const barBody = d3.select(`.${styles.barBody}`)
         .attr('width', '300px')
         .attr('height', '330px');
     // set and transform the start point positation
    //  const barXPos = 1000;
    //  const barYPos = 300;
    //  barBody.attr('transform',
    //      `translate(${barXPos}, 0)`);
     // create the single bar cotainer
     const barWrapper = barBody.selectAll('g')
         .data(dataBar)
         .enter()
         .append('g')
         .attr('class', 'barWrapper')
         .attr('transform',
               (d, i) => (`translate(${actualBarStartXPos} ,${actualBarStartYPos + (barBackgroundHeight * i)})`),
         )
         .on('mouseover', () => {
           // console.log(this);
             // RadarChart.drawLine(RadarChart.getRadarDataUsingSubcategory(d.skill));
           // d3.select(this)
           //     .select('.barRect')
           //     .transition()
           //     .duration(300)
           //     .style('fill', 'rgb(229,190,157)');
         })
         .on('mouseout', () => {
             // RadarChart.drawLine(allSubcategoryData);
           // d3.select(this)
           //     .select('.barRect')
           //     .transition()
           //     .duration(300)
           //     .style('fill', 'rgb(218, 103, 97)');
         });
     // add background for bar
     barWrapper.append('rect')
         .attr('class', 'background')
         .attr('x', -100)
         .attr('width', 300)
         .attr('height', barBackgroundHeight)
         .style('fill', 'white');
     // add actual bar
     barWrapper.append('rect')
         .attr('class', styles.barRect)
         .attr('width', (d) => barScale(d.amount))
         .attr('height', barHeight);
         // .style('fill', 'rgb(218, 103, 97)');
     // console.log(d3.select(`.${styles.barRect}`));
     // add bar labels
     barWrapper.append('text')
         .attr('class', styles.barLabels)
         .attr('x', -10)
         .attr('y', 11)
         .text((d) => d.skill);

     // create title
     barBody.append('g')
         .append('text')
         .attr('class', styles.barTitle)
         .attr('transform', 'translate(175, 5)')
         .text('Quantity - Skills number in each Subcategory');

       // create the x axis container
     const vizBarAxis = d3.select(`.${styles.barAxis}`);

     // transform to x axis pos
     const barAxisXPos = actualBarStartXPos;
     const barAxisYPos = actualBarStartYPos + (barBackgroundHeight * allAmountLength);
     vizBarAxis.attr('transform', `translate(${barAxisXPos} ,${barAxisYPos})`);
     // call xAxis
     vizBarAxis.append('g')
         .attr('class', 'xAxis')
         .call(xAxis);
   }

   render() {
     return (
       <div id={'viz'}>
         <svg id={'vizSvg'}>
           <g className={styles.upperContainer} />
           <g className={styles.lowerContainer}>
             <g className={styles.sunContainer} />
             <g className={styles.barContainer}>
               <g className={styles.barBody} />
               <g className={styles.barAxis} />
             </g>
           </g>
         </svg>
       </div>
     );
   }
 }

 export default withStyles(styles)(Viz);
