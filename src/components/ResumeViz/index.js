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
 import allSKillScore from './allSkillScore.json';
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
     this.projectStartXScale = d3.scaleOrdinal().range([100, 150]).domain(['FOCUS', 'SiteCatalog']);
     this.projectStartYScale = d3.scaleOrdinal().range([850, 800]).domain(['FOCUS', 'SiteCatalog']);
     this.projectMiddleXScale = d3.scaleOrdinal().range([100, 150]).domain(['FOCUS', 'SiteCatalog']);
     this.projectMiddleYScale = d3.scaleOrdinal().range([100, 300]).domain(['FOCUS', 'SiteCatalog']);
     this.projectEndXScale = d3.scaleOrdinal().range([300, 300]).domain(['FOCUS', 'SiteCatalog']);
     this.projectEndYScale = d3.scaleOrdinal().range([200, 350]).domain(['FOCUS', 'SiteCatalog']);
   }

   componentWillMount() {
     this.setState({ timeLineyScale: d3.scaleTime()
                      .range([900, 40])  //  total svg is 1024 height
                      .domain([this.state.parseDate('2007-03'), this.state.parseDate('2017-02')]) });
     this.setState({ EOrWColorScale: d3.scaleOrdinal().range(['#c15f56', 'steelblue']).domain(['Work', 'Edu']) });
     this.setState({
       skillColor: d3.scaleOrdinal(d3.schemeCategory20c).domain(allSKillScore.map((d) => d.skill)),
     });
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
      .attr('height', '950px');

     d3.select(`.${styles.mainWrapper}`).selectAll('line')
       .data(['leftLine'], (d) => d)
       .enter()
       .append('line')
       .attr('class', 'leftLine')
       .attr('x1', 0)
       .attr('y1', 0)
       .attr('x2', 0)
       .attr('y2', '950px')
       .attr('stroke', 'black');
   }

   // add viz function
   viz = (timelineSet) => {
     this.timeLine(timelineSet);
     this.skillPieChart();
     this.bioText();
     this.projectCircleChart();
   };

   bioText = () => {
     const bioWrapper = d3.select(`.${styles.bioWrapper}`);
     const path = bioWrapper.append('path')
      .attr('id', 'wavy') // A unique ID to reference later
      .attr('d', 'M0,150 A100,100 0 0,1 200,150') // Notation for an SVG path
      .style('fill', 'none')
      .style('stroke', '#AAAAAA')
      .style('stroke-dasharray', '5,5');

    // Create an SVG text element and append a textPath element
     bioWrapper.selectAll('text')
      .data(['name'], (d) => d)
      .enter().append('text')
      .style('text-anchor', 'middle')
      .attr('font-size', '25px')
      .append('textPath') // append a textPath to the text element
      .attr('xlink:href', '#wavy') // place the ID of the path here
      .attr('startOffset', '50%') // place the text halfway on the arc
      .text('Jiazhen ZHU');

     const repeat = () => {
       path.transition().duration(2000)
       .attr('d', 'M25,150 A75,75 0 0,1 175,150')
       .transition()
       .duration(2000)
       .attr('d', 'M0,150 A100,100 0 0,1 200,150');
      //  .each('end', repeat);
     };
     repeat();
     bioWrapper.on('click', repeat);
   }
   skillPieChart = () => {
     const data = [
       { skill: 'SAS', weight: 30 },
       { skill: 'MySQL', weight: 90 },
       { skill: 'ETL', weight: 80 },
       { skill: 'SQL', weight: 90 },
       { skill: 'D3', weight: 90 },
       { skill: 'Tableau', weight: 90 },
       { skill: 'Javascript', weight: 80 },
       { skill: 'HTML', weight: 90 },
       { skill: 'CSS', weight: 90 },
     ];
     const skillPieWrapper = d3.select(`.${styles.skillPieWrapper}`);
     // set arc which miss the endAngle which will be set in the future
     const arc = d3.arc()
               .innerRadius(30)
               .outerRadius(40)
               .startAngle(0)
               .cornerRadius(12);
     // set arcBackground
     const arcBackground = d3.arc()
               .innerRadius(34)
               .outerRadius(36)
               .startAngle(0)
               .endAngle(2 * Math.PI);
     // create the backgound arc circle
     skillPieWrapper.selectAll('.pieBackgroundChart')
       .data(data, (d) => `${d.skill}-background`)
       .enter()
       .append('path')
       .attr('class', 'pieBackgroundChart')
       .attr('d', arcBackground)
       .attr('fill', 'gray')
       .attr('opacity', 0.3)
       .attr('transform', (d, i) => `translate(${i % 2 === 0 ? 50 : 150}, ${(Math.floor(i / 2) * 100) + 50})`);
     // create the skill arc for each

     skillPieWrapper.selectAll('.pieChart')
      .data(data, (d) => `${d.skill}`)
      .enter()
      .append('path')
      .attr('class', 'pieChart')
      .attr('fill', (d) => this.state.skillColor(d.skill))
      .attr('opacity', 0.7)
      .attr('d', (d) => {
        arc.endAngle((d.weight / 50) * Math.PI);
        return arc();
      })
      .attr('transform', (d, i) => `translate(${i % 2 === 0 ? 50 : 150}, ${(Math.floor(i / 2) * 100) + 50})`);
      // create the skill text for each
     skillPieWrapper.selectAll('.pieText')
       .data(data, (d) => `${d.skill}-text`)
       .enter()
       .append('text')
       .attr('class', 'pieText')
       .text((d) => d.skill)
       .attr('text-anchor', 'middle')
       .attr('font-size', '12px')
       .attr('transform', (d, i) => `translate(${i % 2 === 0 ? 50 : 150}, ${(Math.floor(i / 2) * 100) + 53})`);
   }

   projectCircleChart = () => {
     const projectData = [
       {
         projectName: 'FOCUS',
         skill: 'D3',
         name: 'NETE',
       },
       {
         projectName: 'FOCUS',
         skill: 'javascript',
         name: 'NETE',
       },
       {
         projectName: 'FOCUS',
         skill: 'HTML',
         name: 'NETE',
       },
       {
         projectName: 'FOCUS',
         skill: 'CSS',
         name: 'NETE',
       },
       {
         projectName: 'FOCUS',
         skill: 'react',
         name: 'NETE',
       },
       {
         projectName: 'SiteCatalog',
         skill: 'ETL',
         name: 'NETE',
       },
       {
         projectName: 'SiteCatalog',
         skill: 'MySQL',
         name: 'NETE',
       },
       {
         projectName: 'SiteCatalog',
         skill: 'angular',
         name: 'NETE',
       },
     ];
     const distinctProject = [
       {
         projectName: 'FOCUS',
         name: 'NETE',
       },
       {
         projectName: 'SiteCatalog',
         name: 'NETE',
       },
     ];

     const skillR = 10;
     const skillCoverR = 40;
     // select main wrapper
     const mainWrapper = d3.select(`.${styles.mainWrapper}`);
     // set filter
     const defs = mainWrapper.selectAll('defs')
      .data(['defs'], (d) => d)
      .enter()
      .append('defs');
     const filter = defs.append('filter').attr('id', 'gooeyCodeFilter');
     filter.append('feGaussianBlur')
       .attr('in', 'SourceGraphic')
       .attr('stdDeviation', '10')
       .attr('color-interpolation-filters', 'sRGB')
       .attr('result', 'blur');
     filter.append('feColorMatrix')
       .attr('class', 'blurValues')
       .attr('in', 'blur')
       .attr('mode', 'matrix')
       .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5')
       .attr('result', 'gooey');
     filter.append('feBlend')
       .attr('in', 'SourceGraphic')
       .attr('in2', 'gooey')
       .attr('operator', 'atop');
     // skill circles and skillCover circle
     const skillWrapper = mainWrapper.selectAll('.skillWrapper')
      .data(['skillWrapper'], (d) => d)
      .enter()
      .append('g')
      .attr('class', 'skillWrapper')
      .style('filter', 'url(#gooeyCodeFilter)');
     // create skill circles
     skillWrapper.selectAll('.skills')
      .data(projectData, (d) => `${d.projectName}-${d.skill}`)
      .enter()
      .append('circle')
      .attr('class', (d) => `skills ${d.name} ${d.projectName}`)
      .attr('cx', d => this.projectStartXScale(d.projectName))
      .attr('cy', d => this.projectStartYScale(d.projectName))
      .attr('r', skillR)
      .style('opacity', 1)
      .style('fill', '#90bfdb');

     // create skill circles
     skillWrapper.selectAll('.skillCover')
     .data(distinctProject, (d) => d)
     .enter()
     .append('circle')
     .attr('class', (d) => `skillCover ${d.name} ${d.projectName}`)
     .attr('cx', d => this.projectStartXScale(d.projectName))
     .attr('cy', d => this.projectStartYScale(d.projectName))
     .attr('r', skillCoverR)
     .style('opacity', 1)
     .style('fill', '#90bfdb');
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
     const xTextScale = d3.scaleOrdinal().range([20, 70]);

    //  const yTextScale = d3.scaleOrdinal().range([25, 75]);
    //  const yRectScale = d3.scaleOrdinal().range([10, 55]);
     xScale.domain(['Work', 'Edu']);
     xTextScale.domain(['Work', 'Edu']);
    //  yTextScale.domain(['Work', 'Edu']);
    //  yRectScale.domain(['Work', 'Edu']);
     // select the timeLine container
     const timeLine = d3.select(`.${styles.timeWrapper}`);
     // create rect in order to mouseover
    //  timeLine.selectAll('rect')
    //   .data(dataTimeLineReformat, (d) => `${d.name}`)
    //   .enter()
    //   .append('rect')
    //   .attr('class', styles.timeLineRect)
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
     timeLine.selectAll('text')
        .data(dataTimeLineReformat, (d) => `${d.name}`)
        .enter()
        .append('text')
        .attr('class', styles.timeLineText)
        .attr('x', (d) => xTextScale(d.EOrW))
        .attr('y', (d) => ((yScale(d.start) + yScale(d.end)) / 2))
        .text((d) => d.name)
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('writing-mode', 'tb')
        .on('click', (d) => {
          const data = ['FOCUS', 'SiteCatalog'];
          // make animation
          d3.selectAll(`.skillCover.${d.name}`)
            .transition().duration(2000)
            .attr('cx', dd => this.projectMiddleXScale(dd.projectName))
            .attr('cy', dd => this.projectMiddleYScale(dd.projectName))
            .on('end', () => {
              d3.selectAll(`.skillCover.${d.name}`)
               .transition().duration(3000)
               .attr('r', 0);
            });
          d3.selectAll(`.skills.${d.name}`)
            .transition().duration(2000)
            .attr('cx', dd => this.projectMiddleXScale(dd.projectName))
            .attr('cy', dd => this.projectMiddleYScale(dd.projectName));
          d3.selectAll(`.skills.${data[0]}`)
             .transition('move')
             .duration(1000)
             .delay((dd, i) => (i * 200) + 2000)
             .attr('cx', (dd, i) => (i * 30) + 100)
             .attr('cy', dd => this.projectEndYScale(dd.projectName));
          d3.selectAll(`.skills.${data[1]}`)
            .transition('move')
            .duration(1000)
            .delay((dd, i) => (i * 200) + 2000)
            .attr('cx', (dd, i) => (i * 30) + 100)
            .attr('cy', dd => this.projectEndYScale(dd.projectName));
            // Around the end of the transition above make the circles see-through a bit
          d3.selectAll(`.skills.${d.name}`)
              .transition('dim').duration(2000).delay(3000)
              .style('opacity', 0.8)
              .on('end', () => {
                d3.selectAll('.blurValues')
                  .transition().duration(1)
                  .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -5');
                d3.selectAll('.skills')
                  .transition().duration(1000)
                  .style('fill', (dd) => this.state.skillColor(dd.skill));
              });
          d3.selectAll('.skills').on('mouseover', (dd) => console.log(dd.skill));
        });
   }

   render() {
     return (
       <div>
         <div className={styles.baseboard}>
           <svg id={'resumeViz'}>
             <g className={styles.wrapper}>
               <g className={styles.leftWrapper}>
                 <g className={styles.bioWrapper} />
                 <g className={styles.skillPieWrapper} />
               </g>
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
