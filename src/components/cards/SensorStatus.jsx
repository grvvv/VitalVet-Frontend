import React from 'react'

const SensorStatus = () => {
  return (
    <>
      <div className="status-title">
        <h1>
          <span className="material-symbols-outlined">sensors</span>
          <span>Sensor Status</span>
        </h1>
      </div>
      <div className="status-description">
        <h3>
          Total Sensors:
          <span>3</span>
        </h3>
        
        <h3>
          Online Sensors:
          <span>1</span>
        </h3>
      </div>
    </>
  )
}

export default SensorStatus