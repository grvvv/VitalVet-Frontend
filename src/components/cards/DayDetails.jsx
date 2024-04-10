import React from 'react'

const DayDetails = (props) => {

  return (
    <div>
      <h2>Today's Data</h2>
      <table>
        <tr>
          <th></th>
          <th>Max</th>
          <th>Min</th>
        </tr>
        <tr>
          <td className='property'>Temperature</td>
          <td>{props.maxTemp}</td>
          <td>{props.minTemp}</td>
        </tr>
        <tr>
          <td className='property'>Pulse</td>
          <td>{props.maxPulse}</td>
          <td>{props.minPulse}</td>
        </tr>
        <tr>
          <td className='property'>Oxygen</td>
          <td>{props.maxOxy}</td>
          <td>{props.minOxy}</td>
        </tr>
      </table>
      <span></span>
    </div>
  )
}

export default DayDetails