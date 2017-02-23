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

   constructor(props) {
     super(props);
     this.state = {
       pre: '',
     };
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
   }

   // add viz function
   viz = (dataSet) => {
     const dataSetReformat = this.dataInit(dataSet);
     this.barChart(dataSetReformat);
     this.scatterChart(dataSetReformat);
     this.sunChart();
     this.timeLine();
   };
   // reformat the time
   dataInit = (dataSet) => {
     const parseDate = d3.timeParse('%Y-%m');
     const dataSetReformat = dataSet.map((d) => {
       const rObj = Object.assign({}, d);
       rObj.time = parseDate(rObj.time);
       return rObj;
     });
     return dataSetReformat;
   }
   circlePositionCal = (inputData, category) => {
     inputData.sort((a, b) => {
       const keyA = a.time;
       const keyB = b.time;
       if (keyA < keyB) return -1;
       if (keyA > keyB) return 1;
       return 0;
     });
     // unique function
     function unique(arr) {
       return arr.filter((x, i) => arr.indexOf(x) === i);
     }
     const skillArray = unique(inputData.filter((d) => d.parent === category).map((d) => d.skill))
                        .sort();
     const n = skillArray.length;
     const angleArray = [];
     if (n % 2 === 0) {
       // even number
       const l = (2 * Math.PI) / ((n + 2) * 2);
       const b = (n + 2) / 2;
       for (let i = -b; i < b; i += 1) {
         const angle = ((2 * i) + 1) * l;
         angleArray.push(angle);
       }
     } else {
       // odd number
       const l = (2 * Math.PI) / (n + 2);
       const b = ((n + 2) - 1) / 2;
       for (let i = -b; i <= b; i += 1) {
         const angle = i * l;
         angleArray.push(angle);
       }
     }
    //  console.log(angleArray.map((d) => ((d / (2 * Math.PI)) * 360)));
     const angleArrayMin2Line = angleArray.slice(1, n + 1);
     // create a map which map from skill name to skill angle
     const skillAngleMap = {};
     for (let i = 0; i < n; i += 1) {
       skillAngleMap[skillArray[i]] = angleArrayMin2Line[i];
     }
     // polar line
     const sunChart = d3.select(`.${styles.sunContainer}`);
     const sunPolar = sunChart.selectAll('line')
      .data(angleArray, (d) => `line-${d}`);
    // Enter sunPolar
     sunPolar.enter()
      .append('line')
      .attr('class', (d) => `line-${d}`)
      .attr('x1', 350)
      .attr('y1', 200)
      .attr('x2', 500)
      .attr('y2', 200)
      // .attr('transform', (d) => `rotate(${(d / (2 * Math.PI)) * 360}, 350, 200)`)
      .attr('transform', (d) => `rotate(${((d / (2 * Math.PI)) * 360) - 90}, 350, 200)`)
      .attr('stroke', '#8d8482')
      .attr('stroke-opacity', 0.3);
      // Update sunPolar
     sunPolar.transition()
      .duration(1000)
      .delay(200)
      .attr('transform', (d) => `rotate(${((d / (2 * Math.PI)) * 360) - 90}, 350, 200)`);
      // Exit sunPolar
     sunPolar.exit().remove();
    //  console.log(inputData);
    // create the result object including order number
     const skillFreq = {};
     const result = inputData.filter((d) => d.parent === category).map((d) => {
       const rObj = Object.assign({}, d);
       rObj.angle = skillAngleMap[d.skill];
       if (skillFreq[d.skill]) {
         skillFreq[d.skill] += 1;
       } else {
         skillFreq[d.skill] = 1;
       }
       rObj.order = skillFreq[d.skill];
       return rObj;
     });
     return result;
   }
   // show the tooltip
   showTooltip = (d) => {
     // get current mouse position
     const xPos = d3.event.pageX - 15;
     const yPos = d3.event.pageY - 15;
     // create container for tooltip
     d3.select(`.${styles.tooltipTime}`).text(`${d.time.getFullYear()}-${d.time.getMonth() + 1}`);
     d3.select(`.${styles.tooltipSkill}`).text(d.skill);
     d3.select(`.${styles.tooltipEorwname}`).text(d.EOrWName).style('color', d.EOrW === 'Edu' ? 'steelblue' : '#c15f56');
     d3.select(`.${styles.tooltipShortdescription}`).text(d.ShortDes);
     // transform the tooltip to correct position
     d3.select(`.${styles.tooltip}`)
      .style('top', `${yPos}px`)
      .style('left', `${xPos}px`)
      .transition()
      .duration(0)
      .style('opacity', 1);
   }
   // hide the tooltip
   hideTooltip = () => {
     d3.select(`.${styles.tooltip}`)
       .transition().duration(100)
       .style('opacity', 0);
   }

   scatterChart = (dataSetReformat) => {
     const parseDate = d3.timeParse('%Y-%m');
     const upperContainer = d3.select(`.${styles.scatterChart}`);
     const xScale = d3.scaleTime().range([150, 1200]);
     const yScale = d3.scaleLinear().range([300, 50]);
     const rScale = d3.scaleLinear().range([1, 10]);
    //  xScale.domain(d3.extent(dataSetReformat, (d) => d.time));
     xScale.domain([parseDate('2007-03'), parseDate('2017-02')]);
     yScale.domain([0, d3.max(dataSetReformat, (d) => d.proficiency)]);
     rScale.domain([0, d3.max(dataSetReformat, (d) => d.proficiency)]);
     // add circle
     upperContainer.selectAll('circle')
      .data(dataSetReformat, (d) => `${d.skill}-${d.time}`)
      .enter().append('circle')
      .attr('class', (d) => `${d.skill}-${d.time}`)
      .attr('r', (d) => rScale(d.proficiency))
      .attr('cx', (d) => xScale(d.time))
      .attr('cy', (d) => yScale(d.proficiency))
      .attr('fill', (d) => (d.EOrW === 'Edu' ? 'steelblue' : '#c15f56'))
      .attr('fill-opacity', 0.5)
      .on('mouseover', (d) => this.showTooltip(d))
      .on('mouseout', () => this.hideTooltip());
    // add x Axis
     upperContainer.selectAll('g')
      .data(['xAxis'], (d) => d)
      .enter()
      .append('g')
      .attr('class', styles.upperXAxis)
      .attr('transform', 'translate(0, 30)')
      .call(d3.axisTop(xScale).ticks(4));
    // add y Axis
     upperContainer.selectAll('g')
      .data(['yAxis'], (d) => d)
      .enter()
      .append('g')
      .attr('class', styles.upperYAxis)
      .attr('transform', 'translate(100, 0)')
        .call(d3.axisLeft(yScale).ticks(4));
   }

   timeLine = () => {
     const dataTimeLine = [
       {
         name: 'SHU',
         start: '2007-03',
         end: '2011-03',
         EOrW: 'Edu',
       },
       {
         name: 'PWC',
         start: '2010-09',
         end: '2010-12',
         EOrW: 'Work',
       },
       {
         name: 'Citi/CSC',
         start: '2011-03',
         end: '2012-12',
         EOrW: 'Work',
       },
       {
         name: 'GWU',
         start: '2013-01',
         end: '2014-08',
         EOrW: 'Edu',
       },
       {
         name: 'NETE',
         start: '2014-06',
         end: '2017-02',
         EOrW: 'Work',
       },
     ];
     const parseDate = d3.timeParse('%Y-%m');
     const dataTimeLineReformat = dataTimeLine.map((d) => {
       const rObj = Object.assign({}, d);
       rObj.start = parseDate(rObj.start);
       rObj.end = parseDate(rObj.end);
       return rObj;
     });
     const xScale = d3.scaleTime().range([150, 1200]);
     const yScale = d3.scaleOrdinal().range([30, 60]);
     const yTextScale = d3.scaleOrdinal().range([25, 75]);
     xScale.domain([parseDate('2007-03'), parseDate('2017-02')]);
     yScale.domain(['Work', 'Edu']);
     yTextScale.domain(['Work', 'Edu']);

     const timeLine = d3.select(`.${styles.timeLine}`);
     timeLine.selectAll('line')
      .data(dataTimeLineReformat, (d) => `${d.name}`)
      .enter()
      .append('line')
      .attr('class', styles.line)
      .attr('x1', (d) => xScale(d.start))
      .attr('y1', (d) => yScale(d.EOrW))
      .attr('x2', (d) => xScale(d.end))
      .attr('y2', (d) => yScale(d.EOrW))
      .style('stroke', (d) => (d.EOrW === 'Edu' ? 'steelblue' : '#c15f56'));

     timeLine.selectAll('circle.start')
       .data(dataTimeLineReformat, (d) => `${d.name}-${d.start}`)
       .enter()
       .append('circle')
       .attr('class', 'start')
       .attr('cx', (d) => xScale(d.start))
       .attr('cy', (d) => yScale(d.EOrW))
       .attr('r', 3)
       .attr('fill', (d) => (d.EOrW === 'Edu' ? '#8aae81' : '#c15f56'));

     timeLine.selectAll('circle.end')
         .data(dataTimeLineReformat, (d) => `${d.name}-${d.end}`)
         .enter()
         .append('circle')
         .attr('class', 'end')
         .attr('cx', (d) => xScale(d.end))
         .attr('cy', (d) => yScale(d.EOrW))
         .attr('r', 3)
         .attr('fill', (d) => (d.EOrW === 'Edu' ? '#8aae81' : '#c15f56'));

     timeLine.selectAll('text')
        .data(dataTimeLineReformat, (d) => `${d.name}`)
        .enter()
        .append('text')
        .attr('class', styles.timeLineText)
        .attr('x', (d) => ((xScale(d.start) + xScale(d.end)) / 2) - 10)
        .attr('y', (d) => yTextScale(d.EOrW))
        .text((d) => d.name)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '10px');
   }

   sunChart = () => {
     const sunChart = d3.select(`.${styles.sunContainer}`);
     sunChart.selectAll('.sunChartCenter')
      .data(['sunChartCenter'], (d) => d)
      .enter()
      .append('circle')
      .attr('class', 'sunChartCenter')
      .attr('cx', 350)
      .attr('cy', 200)
      .attr('r', 3)
      .attr('fill', '#8d8482');
   }

   barChart = (dataSetReformat) => {
    //  console.log(dataSet);
    //  const viz = d3.select('#vizSvg');
     const barBackgroundHeight = 25;
     const barHeight = 15;
     const maxBarWeight = 200;
     const actualBarStartXPos = 75;
     const actualBarStartYPos = 20;
     // nest with skill name
     const skillNumberMap = d3.nest()
        .key((d) => d.parent)
        .rollup((leaves) => {
          const map = new Map();
          leaves.forEach(leave => {
            map.set(leave.skill, leave.skill);
          });
          return map.size;
        })
        .entries(dataSetReformat);
     // calculate the bar data with skill and amount
     const dataBar = skillNumberMap.map((d) => {
       const skill = {};
       skill.skill = d.key;
       skill.amount = d.value;
       return skill;
     });

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
     // create the single bar cotainer
     const barWrapper = barBody.selectAll('g')
         .data(dataBar, (d) => d.skill)
         .enter()
         .append('g')
         .attr('class', 'barWrapper')
         .attr('transform',
               (d, i) => (`translate(${actualBarStartXPos} ,${actualBarStartYPos + (barBackgroundHeight * i)})`),
         )
         .on('mouseover', () => {
         })
         .on('mouseout', () => {
         })
         .on('click', (d) => {
           // if first time click or unclick before
           if (this.state[d.skill] === undefined || this.state[d.skill] === -1) {
             // mark this skill has been selected
             this.setState({ [d.skill]: 1 });
             // mark pre selected skill to unselected
             this.setState({ [this.state.pre]: -1 });
             // mark this selected skill to be a pre selected skill
             this.setState({ pre: d.skill });
             // before change color, we make all color back to the default
             d3.selectAll('.barRect')
              .attr('fill', 'rgb(218, 103, 97)');
             // back to default position on the scatterChart
             const parseDate = d3.timeParse('%Y-%m');
             const upperContainer = d3.select(`.${styles.scatterChart}`);
             const xScaleInside = d3.scaleTime().range([150, 1200]);
             const yScaleInside = d3.scaleLinear().range([300, 50]);
             xScaleInside.domain([parseDate('2007-03'), parseDate('2017-02')]);
             yScaleInside.domain([0, d3.max(dataSetReformat, (f) => f.proficiency)]);
             // select all circle and bind the data
             const allCirclePre = upperContainer.selectAll('circle')
              .data(dataSetReformat, (f) => `${f.skill}-${f.time}`);
             // transition all circle to default position
             allCirclePre.transition()
               .duration(1000)
               .attr('cx', (f) => xScaleInside(f.time))
               .attr('cy', (f) => yScaleInside(f.proficiency));
             // transition seleted circle to sunChart
             const centreX = 350;
             const centreY = 500;
             const centreR = 10;
             // select all circle again
             const allCircleAfter = upperContainer.selectAll('circle')
              .data(this.circlePositionCal(dataSetReformat, d.skill), (f) => `${f.skill}-${f.time}`);
             // transition selected circle to centre
             allCircleAfter.transition()
              .duration(1500)
              .attr('cx', (f) => (centreX + (Math.sin(f.angle) * centreR)))
              .attr('cy', (f) => (centreY - (Math.cos(f.angle) * centreR)));
             // transition selected circle to outside to sunChart
             allCircleAfter.transition()
              .duration(1000)
              .delay(1500)
              .attr('cx', (f) => (centreX + (Math.sin(f.angle) * (centreR + (f.order * 20)))))
              .attr('cy', (f) => (centreY - (Math.cos(f.angle) * (centreR + (f.order * 20)))));
            // change color after click
             d3.selectAll(`#${d.skill.replace(/ /g, '-')}-barRect`)
              .attr('fill', 'rgb(229, 190, 157)');
            // console.log(d3.selectAll('.barRect'));
           } else {
             // mark this skill has not been selected
             this.setState({ [d.skill]: -1 });
             // we make all color back to the default
             d3.selectAll('.barRect')
              .attr('fill', 'rgb(218, 103, 97)');
             // back to default position on the scatterChart
             const parseDate = d3.timeParse('%Y-%m');
             const upperContainer = d3.select(`.${styles.scatterChart}`);
             const xScaleInside = d3.scaleTime().range([150, 1200]);
             const yScaleInside = d3.scaleLinear().range([300, 50]);
             //  xScale.domain(d3.extent(dataSetReformat, (d) => d.time));
             xScaleInside.domain([parseDate('2007-03'), parseDate('2017-02')]);
             yScaleInside.domain([0, d3.max(dataSetReformat, (f) => f.proficiency)]);
             const allCircleAfter = upperContainer.selectAll('circle')
              .data(dataSetReformat, (f) => `${f.skill}-${f.time}`);
             allCircleAfter.transition()
               .duration(1000)
               .attr('cx', (f) => xScaleInside(f.time))
               .attr('cy', (f) => yScaleInside(f.proficiency));
           }
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
         .attr('class', 'barRect')
         .attr('id', (d) => `${d.skill.replace(/ /g, '-')}-barRect`)
         .attr('width', (d) => barScale(d.amount))
         .attr('height', barHeight)
         .attr('fill', 'rgb(218, 103, 97)');
         // .style('fill', 'rgb(218, 103, 97)');
     // console.log(d3.select(`.${styles.barRect}`));
     // add bar labels
     barWrapper.append('text')
         .attr('class', styles.barLabels)
         .attr('x', -10)
         .attr('y', 11)
         .text((d) => d.skill);

     // create title
     barBody.selectAll('text')
      .data(['barTitle'], (d) => d)
      .enter()
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
     vizBarAxis.selectAll('g')
      .data(['xAxis'], (d) => d)
      .enter()
      .append('g')
      .attr('class', 'xAxis')
        .call(xAxis);
   }

   render() {
     return (
       <div id={'viz'}>
         <svg id={'vizSvg'}>
           <g className={styles.upperContainer}>
             <g className={styles.timeLine} />
             <g className={styles.scatterChart} />
           </g>
           <g className={styles.lowerContainer}>
             <g className={styles.sunContainer} />
             <g className={styles.barContainer}>
               <g className={styles.barBody} />
               <g className={styles.barAxis} />
             </g>
           </g>
         </svg>
         <div className={styles.tooltip}>
           <div className={styles.tooltipContainer}>
             <div className={styles.tooltipContainerUpper}>
               <div className={styles.tooltipTime} />
               <div className={styles.tooltipSkill} />
             </div>
             <div className={styles.tooltipRule} />
             <div className={styles.tooltipEorwname} />
             <div className={styles.tooltipShortdescription} />
           </div>
         </div>
       </div>
     );
   }
 }

 export default withStyles(styles)(Viz);
