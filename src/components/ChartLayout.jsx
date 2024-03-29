import React from 'react'
import LineChart from './LineChart';
import Loader from './alerts/Loader';

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const ChartLayout = (props) => {
  const chartType = props.type;
  const dataArray = props.data;

  // const labels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
  const labels = dataArray.map(item => item._id.date)

  let chartComponent;

  if (chartType === 'temperature') {
    chartComponent = (
      <LineChart 
        class="temperature-chart"  // class prop
        title="Temperature"
        color='rgba(255, 64, 100, 0.8)'
        labels = {labels}
        avgdata= {dataArray.map(item => item.avgTemp)}
      />
    );
  } else if (chartType === 'pulse') {
    chartComponent = (
      <LineChart 
        class="pulse-chart"  // class prop
        title="Pulse"
        color='rgba(255, 180, 27, 0.8)'
        labels = {labels}
        avgdata= {dataArray.map(item => item.avgPulse)}
      />
    );
  } else if (chartType === 'oxygen') {
    chartComponent = (
      <LineChart 
        class="oxygen-chart"  // class prop
        title="Oxygen Saturation"
        color='rgba(125, 125, 225, 0.8)'
        labels = {labels}
        avgdata= {dataArray.map(item => item.avgOxy)}
      />
    );
  } else {
    // Default case if chartType is not recognized
    chartComponent = <Loader />
  }

  return (
    <div className='data-charts'>
      {chartComponent}
    </div>
  );
};


export default ChartLayout;