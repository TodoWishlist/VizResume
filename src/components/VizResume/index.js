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

 class Viz extends Component {

   static propTypes = {
     data: PropTypes.any,
   }

   componentDidMount() {
     this.viz();
     console.log('alalal');
   }

   componentDidUpdate() {
     this.viz();
   }

   // add viz function
   viz = () => {
     console.log('lalala');
     d3.select('#vizSvg')
         .attr('width', '1500px')
         .attr('height', '800px');
     const allCategoryValue = [4.6, 2, 4];
     allCategoryValue.push(allCategoryValue[0]);
     //
     this.radarChartDrawBase(allCategoryValue);
     this.radarChartDrawLine([['a', 'b', 'c'], allCategoryValue]);
     this.barChart();
   };

   radarChart = () => {

   }

   radarChartDrawBase = (selection, inputData) => {
     const viz = d3.select('#vizSvg');
     const vizRadarBody = viz.select('#radarBody');

     const cfg = {
       w: 1200,
       h: 800,
       vizPaddingTop: 20,
       vizPaddingRight: 100,
       vizPaddingBottom: 180,
       vizPaddingLeft: 150,
       ruleColor: '#d9dfe1',
     };

     const heightCircleConstraint = cfg.h - cfg.vizPaddingTop - cfg.vizPaddingBottom;
     const widthCircleConstraint = (cfg.w * 0.6) - cfg.vizPaddingLeft - cfg.vizPaddingRight;
     const circleConstraint = d3.min([heightCircleConstraint, widthCircleConstraint]);

     const allSkillsValueInside = inputData;

     const minVal = 0;
     const maxVal = 5;

     // set scales
     const radius = d3.scaleLinear()
         .domain([minVal, maxVal])
         .range([0, (circleConstraint / 2)]);

     // build base

     // attach everything to the group that is centered around middle
     const centerXPos = (widthCircleConstraint / 2) + cfg.vizPaddingLeft + 220;
     const centerYPos = (heightCircleConstraint / 2) + cfg.vizPaddingTop + 40;
     // transform the center to this postion
     vizRadarBody.attr('transform',
                       `translate(${centerXPos} ,${centerYPos})`);

     // add axes
     // add circle axes container
     const circleAxes = vizRadarBody.append('g')
         .attr('class', 'circleAxes')
         .selectAll('g')
         .data(radius.ticks(5).slice(1))
         .enter()
         .append('g');
         // add circle axes
     circleAxes.append('svg:circle')
         .attr('r', (d) => radius(d))
         .style('stroke', cfg.ruleColor)
         .style('fill', 'none');
     // add circle legend
     circleAxes.append('svg:text')
         .attr('text-anchor', 'middle')
         .attr('dy', (d) => -1 * radius(d))
         .text(String)
         .style('font-family', 'sans-serif')
         .style('font-size', '11px');

     // create a container for polar line
     vizRadarBody.append('g')
         .attr('class', 'lineAxes');

     // create a container for outerline
     const outerLine = vizRadarBody.selectAll('.outerline')
         .data([allSkillsValueInside]);

     outerLine.enter()
         .append('g')
         .attr('class', 'outerline')
         .style('stroke', 'steelblue')
         .attr('transform', 'rotate(90)');
   }

   radarChartDrawLine = (inputData) => {
     const viz = d3.select('#vizSvg');
     const vizRadarBody = viz.select('#radarBody');
     const cfg = {
       w: 1200,
       h: 800,
       vizPaddingTop: 20,
       vizPaddingRight: 100,
       vizPaddingBottom: 180,
       vizPaddingLeft: 150,
       ruleColor: '#d9dfe1',
     };
     const heightCircleConstraint = cfg.h - cfg.vizPaddingTop - cfg.vizPaddingBottom;
     const widthCircleConstraint = (cfg.w * 0.6) - cfg.vizPaddingLeft - cfg.vizPaddingRight;
     const circleConstraint = d3.min([heightCircleConstraint, widthCircleConstraint]);

     const allSkillsInside = inputData[0];
     const allSkillsValueInside = inputData[1];
     // const subcategoryDescription = inputData[2];
     const skillSum = allSkillsInside.length;
     const minVal = 0;
     const maxVal = 5;
     const radius = d3.scaleLinear()
         .domain([minVal, maxVal])
         .range([0, (circleConstraint / 2)]);
     const radiusLength = radius(maxVal);
     // Begin: polar line
     // add line axes
     const lineAxesLine = vizRadarBody.select('.lineAxes')
             .selectAll('.line')
             .data(allSkillsInside);

     // Exit
     lineAxesLine.exit()
         .transition()
         .duration(500)
         .remove();
     // Update
     lineAxesLine.transition()
         .duration(1000)
         .delay(200)
         .attr('x2', radiusLength + 5)
         .style('stroke', '#a1a4a5')
         .style('fill', 'none')
         .attr('transform', (d, i) => `rotate(${-((i / skillSum) * 360)})`);
     // Enter
     lineAxesLine.enter()
         .append('svg:line')
         .transition()
         .duration(300)
         .attr('class', 'line')
         .attr('x2', radiusLength + 5)
         .style('stroke', '#a1a4a5')
         .style('fill', 'none')
         .attr('transform', (d, i) => `rotate(${-((i / skillSum) * 360)})`);

     // add line legend
     const lineAxesLegend = vizRadarBody.select('.lineAxes')
             .selectAll('.legend')
             .data(allSkillsInside);
     // Exit
     lineAxesLegend.exit()
         .transition()
         .duration(1000)
         .attr('x', 1000)
         .remove();
     // Update
     lineAxesLegend.transition()
         .duration(1000)
         .delay(200)
         .attr('x', (d, i) => {
           const ang = (i / skillSum) * 360;
           return ang > 90 && ang < 270 ? radiusLength : radiusLength + 50;
         })
         .attr('dy', (d, i) => {
           const ang = (i / skillSum) * 360;
           if (ang === 90) {
             return '50';
           } else if (ang === 270) {
             return '-45';
           }
           return '.35em';
         })
         .text(String)
         .style('font-family', 'sans-serif')
         .style('font-size', '11px')
         .attr('text-anchor', (d, i) => {
           const ang = (i / skillSum) * 360;
           if (ang < 90 || ang > 270) {
             return 'middle';
           } else if (ang === 90 || ang === 270) {
             return 'start';
           }
           return 'end';
         })
         .attr('transform', (d, i) => {
           const ang = (i / skillSum) * 360;
           let legendDis = 0;
           if (ang === 90 || ang === 270) {
             legendDis = 335;
           } else {
             legendDis = radiusLength;
           }
           return `rotate(${-(i / skillSum) * 360}) rotate(${ang} ${(legendDis + 6)},0)`;
         });
     // Enter
     lineAxesLegend.enter()
         .append('svg:text')
         .attr('class', 'legend')
         .attr('x', (d, i) => {
           const ang = (i / skillSum) * 360;
           return ang > 90 && ang < 270 ? radiusLength : radiusLength + 50;
         })
         .attr('dy', (d, i) => {
           const ang = (i / skillSum) * 360;
           if (ang === 90) {
             return '50';
           } else if (ang === 270) {
             return '-45';
           }
           return '.35em';
         })
         .text(String)
         .style('font-family', 'sans-serif')
         .style('font-size', '11px')
         .attr('text-anchor', (d, i) => {
           const ang = (i / skillSum) * 360;
           if (ang < 90 || ang > 270) {
             return 'middle';
           } else if (ang === 90 || ang === 270) {
             return 'start';
           }
           return 'end';
         })
         .attr('transform', (d, i) => {
           const ang = (i / skillSum) * 360;
           let legendDis = 0;
           if (ang === 90 || ang === 270) {
             legendDis = 335;
           } else {
             legendDis = radiusLength;
           }
           return `rotate(${-(i / skillSum) * 360}) rotate(${ang} ${(legendDis + 6)},0)`;
         });
     // End: polar line

     // Begin: draw line
     // define line path function
     d3.radialLine()
         .radius((d) => radius(d))
         .angle((d, i) => {
           const index = i === skillSum ? 0 : i;
           return -(index / skillSum) * 2 * Math.PI;
         });

     vizRadarBody
         .select('.outerline')
         .selectAll('.line')
         .data([allSkillsValueInside]);

     // // UPDATE
     // lines.transition()
     //     .delay(100)
     //     .duration(800)
     //     .ease('linear')
     //     .attr('d', line);
     //
     // // ENTER
     // lines.enter()
     //     .append('svg:path')
     //     .attr('class', 'line')
     //     .attr('d', line)
     //     .style('stroke-width', 3)
     //     .style('fill', 'rgb(31, 119, 180)')
     //     .style('fill-opacity', '0.3')
     //     .on('mouseover', () => {
     //       // lines.transition(200)
     //       //     .style('fill-opacity', '0.7');
     //     })
     //     .on('mouseout', () => {
     //       // lines.transition(200)
     //       //     .style('fill-opacity', '0.3');
     //     });
     // End: draw line

     // // Begin: circle points
     // // calculate the circle points positions
     // skillPointPositions = [];
     // var skillPointPosition = [];
     // skillPointsPositionRaw = line(allSkillsValueInside).slice(1).split('L');
     // var allSkillsInsideIndex = 0;
     // skillPointsPositionRaw.forEach(function(x) {
     //     skillPointPosition[0] = x.split(',')[0];
     //     skillPointPosition[1] = x.split(',')[1];
     //     skillPointPosition[2] = allSkillsInside[allSkillsInsideIndex];
     //     if (skillPointsPositionRaw.length == 8) {
     //         skillPointPosition[3] = subcategoryDescription[allSkillsInsideIndex];
     //     } else {
     //         // skillPointPosition[3] = allSkillsInside[allSkillsInsideIndex];
     //         skillPointPosition[3] = '';
     //     }
     //     allSkillsInsideIndex = allSkillsInsideIndex + 1;
     //     skillPointPositions.push(skillPointPosition);
     //     skillPointPosition = [];
     // });
     // skillPointPositions[0][0] = 0;
     // skillPointPositions[skillPointPositions.length - 1][0] = 0;
     // skillPointPositions.pop();
     // // Join new data with old elements
     // var circlePoints = vizRadarBody
     //     .select('.outerline')
     //     .selectAll('.circle-point')
     //     .data(skillPointPositions);
     // // create a gobal var to let tooltip use
     // skillPointPositionsGobal = skillPointPositions;
     // // Exit old elements not present in new data.
     // circlePoints.exit()
     //     .style('fill-opacity', 1e-6)
     //     .remove();
     // // Update
     // circlePoints.transition()
     //     .duration(1000)
     //     .delay(100)
     //     .attr('cx', function(d) {
     //         return d[0];
     //     })
     //     .attr('cy', function(d) {
     //         return d[1];
     //     })
     //     .attr('id', function(d) {
     //         var name = d[2].split(' ').join('-');
     //         return name + '-circle-point';
     //     });
     // // Enter
     // circlePoints.enter().append('svg:circle')
     //     .attr('class', 'circle-point')
     //     .attr('id', function(d) {
     //         var name = d[2].split(' ').join('-');
     //         return name + '-circle-point';
     //     })
     //     .attr('cx', function(d) {
     //         return d[0];
     //     })
     //     .attr('cy', function(d) {
     //         return d[1];
     //     })
     //     .attr('r', 5)
     //     .style('stroke', 'steelblue')
     //     .style('fill', 'steelblue');
     // // End: circle points
   }

   barChart = () => {
     const viz = d3.select('#vizSvg');
     const barBackgroundHeight = 25;
     const barHeight = 15;
     const maxBarWeight = 200;
     const actualBarStartXPos = 75;
     const actualBarStartYPos = 20;

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
     const barBody = viz.select('#barBody')
         .attr('width', '300px')
         .attr('height', '330px');
     // set and transform the start point positation
     const barXPos = 1000;
     const barYPos = 300;
     barBody.attr('transform',
         `translate(${barXPos}, ${barYPos})`);
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
     const vizBarAxis = viz.select('#barAxis');

     // transform to x axis pos
     const barAxisXPos = barXPos + actualBarStartXPos;
     const barAxisYPos = barYPos + actualBarStartYPos + (barBackgroundHeight * allAmountLength);
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
           <g id={'upperContainer'} />
           <g id={'lowerContainer'}>
             <g id={'radarBody'} />
             <g id={'barBody'} />
             <g id={'barAxis'} />
             <g id={'section'} />
           </g>
         </svg>
       </div>
     );
   }
 }

 export default withStyles(styles)(Viz);
