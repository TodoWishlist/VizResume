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
 import allSKillsDetail from './allSKillsDetail.json';
 import timeline from './timeline.json';

 class Viz extends Component {

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
     this.setState({ scatterChartxScale: d3.scaleTime()
                      .range([40, 1140])  //  total svg is 1200 width
                      .domain([this.state.parseDate('2007-03'), this.state.parseDate('2017-02')]) });
     this.setState({ EOrWColorScale: d3.scaleOrdinal().range(['#c15f56', 'steelblue']).domain(['Work', 'Edu']) });
   }

   componentDidMount() {
     this.init();
     this.viz(allSKillsDetail, timeline);
   }

   componentDidUpdate() {
     this.init();
     this.viz(allSKillsDetail, timeline);
   }

   init = () => {
     d3.select('#vizSvg')
         .attr('width', '1300px')
         .attr('height', '800px');
   }

   // add viz function
   viz = (dataSet, timelineSet) => {
     const dataSetReformat = this.dataInit(dataSet);
     this.barChart(dataSetReformat);
     this.scatterChart(dataSetReformat);
     this.sunChart();
     this.timeLine(timelineSet);
   };
   // reformat the time
   dataInit = (dataSet) => {
     const dataSetReformat = dataSet.map((d) => {
       const rObj = Object.assign({}, d);
       rObj.time = this.state.parseDate(rObj.time);
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
   showTooltip = (d, para) => {
     const tooltipTime = para === 'scatterChart' ? `${d.time.getFullYear()}-${d.time.getMonth() + 1}` : `${d.start.getFullYear()}-${d.end.getFullYear()}`;
     const tooltipSkill = para === 'scatterChart' ? d.skill : d.title;
     const tooltipEorwname = para === 'scatterChart' ? d.EOrWName : d.fullName;
     const tooltipShortdescription = para === 'scatterChart' ? d.ShortDes : d.ShortDes;
     // get current mouse position
     const xPos = d3.event.pageX - 15;
     const yPos = para === 'scatterChart' ? d3.event.pageY - 15 : d3.event.pageY + 150;
     // create container for tooltip
     d3.select(`.${styles.tooltipTime}`).text(tooltipTime);
     d3.select(`.${styles.tooltipSkill}`).text(tooltipSkill);
     d3.select(`.${styles.tooltipEorwname}`).text(tooltipEorwname).style('color', this.state.EOrWColorScale(d.EOrW));
     d3.select(`.${styles.tooltipShortdescription}`).text(tooltipShortdescription);
     // transform the tooltip to correct position
     d3.select(`.${styles.tooltip}`)
      .style('top', `${yPos}px`)
      .style('left', `${xPos}px`)
      .transition()
      .duration(0)
      .style('opacity', 1);
     d3.select(`.${styles.tooltipSkill}`)
     .style('text-align', para === 'scatterChart' ? 'center' : 'right');
   }
   // hide the tooltip
   hideTooltip = () => {
     d3.select(`.${styles.tooltip}`)
       .transition().duration(100)
       .style('opacity', 0);
   }

   scatterChart = (dataSetReformat) => {
     const upperContainer = d3.select(`.${styles.scatterChart}`);
     const xScale = this.state.scatterChartxScale;
     const yScale = d3.scaleLinear().range([300, 50]);
     const rScale = d3.scaleLinear().range([1, 10]);
     yScale.domain([0, d3.max(dataSetReformat, (d) => d.proficiency)]);
     rScale.domain([0, d3.max(dataSetReformat, (d) => d.proficiency)]);
     // add circle
     upperContainer.selectAll('circle')
      .data(dataSetReformat, (d) => `${d.skill}-${d.time}`)
      .enter().append('circle')
      .attr('class', (d) => `${d.EOrWName} ${d.skill}-${d.time} scatterDot`)
      .attr('r', (d) => rScale(d.proficiency))
      .attr('cx', (d) => xScale(d.time))
      .attr('cy', (d) => yScale(d.proficiency))
      .attr('fill', (d) => this.state.EOrWColorScale(d.EOrW))
      .attr('fill-opacity', 0.5)
      .on('mouseover', (d) => this.showTooltip(d, 'scatterChart'))
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
      .attr('transform', 'translate(30, 0)')
        .call(d3.axisLeft(yScale).ticks(4));
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
     const xScale = this.state.scatterChartxScale;
     const yScale = d3.scaleOrdinal().range([30, 60]);
     const yTextScale = d3.scaleOrdinal().range([25, 75]);
     const yRectScale = d3.scaleOrdinal().range([10, 55]);
     yScale.domain(['Work', 'Edu']);
     yTextScale.domain(['Work', 'Edu']);
     yRectScale.domain(['Work', 'Edu']);
     // select the timeLine container
     const timeLine = d3.select(`.${styles.timeLine}`);
     // create rect in order to mouseover
     timeLine.selectAll('rect')
      .data(dataTimeLineReformat, (d) => `${d.name}`)
      .enter()
      .append('rect')
      .attr('class', styles.rect)
      .attr('x', (d) => xScale(d.start))
      .attr('y', (d) => yRectScale(d.EOrW))
      .attr('width', (d) => (xScale(d.end) - xScale(d.start)))
      .attr('height', 30)
      .on('mouseover', (d) => this.showTooltip(d, 'timeline'))
      .on('mouseout', () => this.hideTooltip())
      .on('click', (d) => {
        if (this.state[d.name] === undefined || this.state[d.name] === -1) {
          d3.selectAll('.scatterDot').transition()
           .duration(500).attr('fill-opacity', 0.2);
          d3.selectAll(`.${d.name}`).transition()
           .duration(500).attr('fill-opacity', 0.7);
          this.setState({ [d.name]: 1 });
        } else {
          d3.selectAll('.scatterDot').transition()
           .duration(500).attr('fill-opacity', 0.5);
          this.setState({ [d.name]: -1 });
        }
      });
     // create all lines
     timeLine.selectAll('line')
      .data(dataTimeLineReformat, (d) => `${d.name}`)
      .enter()
      .append('line')
      .attr('class', styles.line)
      .attr('x1', (d) => xScale(d.start))
      .attr('y1', (d) => yScale(d.EOrW))
      .attr('x2', (d) => xScale(d.end))
      .attr('y2', (d) => yScale(d.EOrW))
      .style('stroke', (d) => this.state.EOrWColorScale(d.EOrW));
     // create all start circle
     timeLine.selectAll('circle.start')
       .data(dataTimeLineReformat, (d) => `${d.name}-${d.start}`)
       .enter()
       .append('circle')
       .attr('class', 'start')
       .attr('cx', (d) => xScale(d.start))
       .attr('cy', (d) => yScale(d.EOrW))
       .attr('r', 3)
       .attr('fill', (d) => this.state.EOrWColorScale(d.EOrW));
     // crate all end circle
     timeLine.selectAll('circle.end')
         .data(dataTimeLineReformat, (d) => `${d.name}-${d.end}`)
         .enter()
         .append('circle')
         .attr('class', 'end')
         .attr('cx', (d) => xScale(d.end))
         .attr('cy', (d) => yScale(d.EOrW))
         .attr('r', 3)
         .attr('fill', (d) => this.state.EOrWColorScale(d.EOrW));
     // create the text
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
             const upperContainer = d3.select(`.${styles.scatterChart}`);
             const xScaleInside = this.state.scatterChartxScale;
             const yScaleInside = d3.scaleLinear().range([300, 50]);
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
             const upperContainer = d3.select(`.${styles.scatterChart}`);
             const xScaleInside = this.state.scatterChartxScale;
             const yScaleInside = d3.scaleLinear().range([300, 50]);
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
