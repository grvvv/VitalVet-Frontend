import React from 'react'
import DoughNut from '../Charts/Doughnut'

const StatusCard = (props) => (
  <>
    <div className="status-title">
      <h1>
        <span className="material-symbols-outlined">health_metrics</span>
        <span>Health Status</span>
      </h1>
      <h2>Total Cows: {props.totalCattles}</h2>
    </div>
    <div className="status-chart">
      <DoughNut cattles = {props.cattles}/>
    </div>
  </>
)

export default StatusCard