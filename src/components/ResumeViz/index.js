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
 import project from './project.json';
 import timeline from './timeline.json';
 import EorW from './components/EorW/EorW';

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
     this.projectStartXScale = d3.scaleOrdinal().range([100, 200, 300, 350]).domain(['FOCUS', 'SiteCatalog', 'Others', 'BEFAS']);
     this.projectStartYScale = d3.scaleOrdinal().range([850, 800, 900, 800]).domain(['FOCUS', 'SiteCatalog', 'Others', 'BEFAS']);
     this.projectMiddleXScale = d3.scaleOrdinal().range([100, 100, 100, 100]).domain(['FOCUS', 'SiteCatalog', 'Others', 'BEFAS']);
     this.projectMiddleYScale = d3.scaleOrdinal().range([100, 300, 500, 100]).domain(['FOCUS', 'SiteCatalog', 'Others', 'BEFAS']);
     this.projectEndXScale = d3.scaleOrdinal().range([300, 300, 300, 300]).domain(['FOCUS', 'SiteCatalog', 'Others', 'BEFAS']);
     this.projectEndYScale = d3.scaleOrdinal().range([100, 250, 400, 100]).domain(['FOCUS', 'SiteCatalog', 'Others', 'BEFAS']);
     // prepare the distinctProject
     const hashMap = {};
     this.distinctProject = project.map((d) => {
       if (hashMap[`${d.projectName}-${d.name}`] === undefined) {
         const result = {};
         hashMap[`${d.projectName}-${d.name}`] = 1;
         result.projectName = d.projectName;
         result.name = d.name;
         return result;
       }
       return '';
     }).filter(d => d !== '');
     this.projectDetailData = [
       {
         name: 'NETE',
         projectName: 'FOCUS',
         projectDetail: 'lalalalalalalalalalalalalallalalalala',
       },
       {
         name: 'NETE',
         projectName: 'SiteCatalog',
         projectDetail: 'blblblblblblblbllblblblblblblblblblblb',
       },
       {
         name: 'NETE',
         projectName: 'Others',
         projectDetail: 'dedededeedeeeeeeeeeededededededededededed',
       },
     ];
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
     this.viz(timeline, project);
   }

   componentDidUpdate() {
     this.init();
     this.viz(timeline, project);
   }

   init = () => {
     d3.select('#resumeViz')
         .attr('width', '900px')
         .attr('height', '950px');
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
   viz = (timelineSet, projectSet) => {
     this.timeLine(timelineSet);
     this.skillPieChart();
     this.bioText();
     this.projectCircleChart(projectSet);
     this.projectDetail();
   };

   bioText = () => {
     const dataBio = [
       { key: 'name', value: 'Jiazhen ZHU' },
       { key: 'title', value: 'Data Engineer' },
       { key: 'telephone', value: '(202)802-3368' },
       { key: 'email', value: 'jason.jz.zhu@gmail.com' },
       { key: 'website', value: 'www.vizresume.com/jiazhen' },
       { key: 'address', value: '8235 Crestwood Dr' },
     ];
     // select bioWrapper
     const bioWrapper = d3.select(`.${styles.bioWrapper}`);
     // crate all path for text
     bioWrapper.selectAll('path')
      .data(dataBio, d => `path${d.key}`)
      .enter()
      .append('path')
      .attr('id', d => `path${d.key}`)
      .attr('d', (d, i) => {
        if (d.key === 'name') {
          return 'M0,150 A100,100 0 0,1 200,150';
        } else if (d.key === 'title') {
          return 'M45 120 L 155 120';
        }
        return `M5 ${150 + (i * 25)} L195 ${150 + (i * 25)}`;
      })
     .style('fill', 'none')
     .style('stroke', d => (d.key === 'name' ? '#AAAAAA' : ''))
     .style('stroke-dasharray', '5,5');
     // add all text on the path
     bioWrapper.selectAll('text')
      .data(dataBio, d => `text${d.key}`)
      .enter().append('text')
      .style('text-anchor', 'middle')
      .attr('font-size', (d) => {
        if (d.key === 'name') {
          return '25px';
        } else if (d.key === 'title') {
          return '18px';
        }
        return '14px';
      })
      .append('textPath') // append a textPath to the text element
      .attr('xlink:href', d => `#path${d.key}`) // place the ID of the path here
      .attr('startOffset', '50%') // place the text halfway on the arc
      .text(d => d.value);

     // let name can do the animation
     const repeat = () => {
       bioWrapper.selectAll('#pathname').transition().duration(2000)
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

   projectCircleChart = (projectSet) => {
     const projectData = projectSet;

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

     // create skill circleCover
     skillWrapper.selectAll('.skillCover')
     .data(this.distinctProject, (d) => d)
     .enter()
     .append('circle')
     .attr('class', (d) => `skillCover ${d.name} ${d.projectName}`)
     .attr('cx', d => this.projectStartXScale(d.projectName))
     .attr('cy', d => this.projectStartYScale(d.projectName))
     .attr('r', skillCoverR)
     .style('opacity', 1)
     .style('fill', '#90bfdb');
   }

   projectDetail = () => {
    // // select main wrapper
    //  const mainWrapper = d3.select(`.${styles.mainWrapper}`);
    //  mainWrapper.selectAll('g')
    //    .data(['mainInfo'], d => d)
    //    .enter()
    //    .append('g')
    //    .attr('class', 'mainInfo');
    //
    //  mainWrapper.select('.mainInfo').selectAll('path')
    //    .data(['Data Engineer', 'NETE / McLean, VA, USA'], d => `path${d}`)
    //    .enter()
    //    .append('path')
    //    .attr('id', d => `path${d}`)
    //    .attr('d', (d, i) => {
    //      if (i === 0) {
    //        return 'M90 70 L 300 70';
    //      }
    //      return 'M90 95 L 300 95';
    //    })
    //   .style('fill', 'none')
    //   .style('stroke', (d, i) => (i === 0 ? '' : ''));
    //
    //  // add all text on the path
    //  mainWrapper.select('.mainInfo').selectAll('text')
    //    .data(['Data Engineer', 'NETE / McLean, VA, USA'], d => `text${d}`)
    //    .enter()
    //    .append('text')
    //    .attr('class', styles.projectHeader)
    //    .style('text-anchor', 'start')
    //    .attr('font-size', (d, i) => {
    //      if (i === 0) {
    //        return '18px';
    //      }
    //      return '14px';
    //    })
    //    .append('textPath') // append a textPath to the text element
    //    .attr('xlink:href', d => `#path${d}`) // place the ID of the path here
    //    // .attr('startOffset', '50%') // place the text halfway on the arc
    //    .text(d => d);
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
          if (this.state[d.name] === undefined || this.state[d.name] === -1) {
            this.projectCircleMoveFront(d);
            this.setState({ [d.name]: 1 });
            console.log('click');
          } else {
            this.projectCircleMoveBack(d);
            this.setState({ [d.name]: -1 });
            console.log('unclick');
          }
        });
   }

   projectCircleMoveFront = (data) => {
     const projectNameArray = this.distinctProject
       .filter(d => d.name === data.name)
       .map(d => d.projectName);
     // make animation
     d3.selectAll(`.skillCover.${data.name}`)
       .transition().duration(2000)
       .attr('cx', d => this.projectMiddleXScale(d.projectName))
       .attr('cy', d => this.projectMiddleYScale(d.projectName))
       .on('end', () => {
         d3.selectAll(`.skillCover.${data.name}`)
          .transition().duration(3000)
          .attr('r', 0);
       });
     d3.selectAll(`.skills.${data.name}`)
       .transition().duration(2000)
       .attr('cx', d => this.projectMiddleXScale(d.projectName))
       .attr('cy', d => this.projectMiddleYScale(d.projectName));
     projectNameArray.forEach((p) => {
       d3.selectAll(`.skills.${p}`)
          .transition('move')
          .duration(1000)
          .delay((d, i) => (i * 200) + 2000)
          .attr('cx', (d, i) => (i * 30) + 100)
          .attr('cy', d => this.projectEndYScale(d.projectName));
     });
     // Around the end of the transition above make the circles see-through a bit
     d3.selectAll(`.skills.${data.name}`)
         .transition('dim').duration(2000).delay(3000)
         .style('opacity', 0.8)
         .on('end', () => {
           d3.selectAll('.blurValues')
             .transition().duration(1)
             .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -5');
           d3.selectAll('.skills')
             .transition().duration(1000)
             .style('fill', (d) => this.state.skillColor(d.skill));
         });
     d3.selectAll('.skills').on('mouseover', (d) => console.log(d.skill));
   }

   projectCircleMoveBack = (data) => {
     const skillR = 10;
     // move skillCover back to start position
     d3.selectAll(`.skillCover.${data.name}`)
       .attr('cx', d => this.projectStartXScale(d.projectName))
       .attr('cy', d => this.projectStartYScale(d.projectName));
     // begin dim the skills circle
     d3.selectAll(`.skills.${data.name}`)
       .transition().duration(2000)
       .style('opacity', 0);
     // in the mean time, transition the skillCover's R
     d3.selectAll(`.skillCover.${data.name}`)
       .transition().duration(2000)
       .attr('r', 40);
     // at the end, move the skills back to start position
     d3.selectAll(`.skills.${data.name}`)
       .transition().delay(2000)
        .attr('cx', d => this.projectStartXScale(d.projectName))
        .attr('cy', d => this.projectStartYScale(d.projectName))
        .attr('r', skillR)
        .on('end', () => {
          d3.selectAll(`.skills.${data.name}`)
            .style('opacity', 1)
            .style('fill', '#90bfdb');
        });
   }
   render() {
     return (
       <div className={styles.outerContainer}>
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
         <EorW />
       </div>
     );
   }
 }

 export default withStyles(styles)(ResumeViz);
