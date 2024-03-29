import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Gauge from '../components/Gauge';
import ChartLayout from '../components/ChartLayout';
import CattleCard from '../components/CattleCard';
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from '../components/alerts/Loader';

function Health() {
  const location = useLocation();
  
  const [cattleId, setCattleId] = useState(null);
  const [tagNumber, setTagNumber] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('cattleId');
    const tag = searchParams.get('tagNumber');
    setCattleId(id);
    setTagNumber(tag);
  }, [location.search]);


  const [chart, setChart] = useState("temperature");
  const { user } = useAuthContext()
  const [data, setData] = useState(null);
  
  const fetchHealthParam = async function() {
    try {
      const response = await fetch(`/api/sensordata/get/${tagNumber}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      
      if (response.ok) {
        setData(json)
      }
    } catch (error) {
        console.log("Error fetching the cattles")
      }
  }

  useEffect(() => {
    if ( tagNumber ){
      fetchHealthParam();
    }
      
    const intervalId = setInterval(() => {
      fetchHealthParam(); // Fetch data every 2 minutes
    }, 120000);

    return () => clearInterval(intervalId);
  }, 
  [tagNumber]);

  return (
    <div className='health-page'>
      {
        data ? 
        <div className="data-gauges">
          <Gauge 
          value={data.selectedCattle[0]?.objectTemp || 0} text={`${data.selectedCattle[0]?.objectTemp} ºC` || 'Null'}
          title="Temperature" avg={data.cattleHealth[data.cattleHealth.length - 1]?.avgTemp}
          color='rgba(255, 64, 100, 0.8)'
          class="temperature-gauge"/>

          <Gauge 
          value={data.selectedCattle[0]?.pulse || 0} text={`${data.selectedCattle[0]?.pulse} bpm` || 'Null'} 
          title="Pulse" 
          avg={data.cattleHealth[data.cattleHealth.length - 1]?.avgPulse}
          color='rgba(255, 180, 27, 0.8)'
          class="pulse-gauge"/>

          <Gauge 
          value={data.selectedCattle[0]?.oxygen || 0} text={`${data.selectedCattle[0]?.oxygen} %` || 'Null'}
          title="Oxygen Saturation" 
          avg={data.cattleHealth[data.cattleHealth.length - 1]?.avgOxy}
          color='rgba(125, 125, 225, 0.8)'
          class="oxygen-gauge"/>
        </div>:
        <div className="data-gauges">
          <Loader />
        </div>
      }
      
      
      <div className="card-component">{
        cattleId ?
        <CattleCard currentCattle={cattleId}/> :
        <Loader />
      }
      </div>

      {
        data ?
        <div className="custom-select">
          <select name="chart_name" id="chart" onChange={(e) => { 
            setChart(e.target.value)
            }}>
            <option value="temperature">Temperature</option>
            <option value="pulse">Pulse</option>
            <option value="oxygen">Oxygen Saturation</option>
          </select>
          
          <ChartLayout 
            type={chart}
            data={data.cattleHealth}
          />
        </div> :
        <div className='custom-select'>
          <Loader />
        </div>
        
      }
      

    </div>
  )
}

export default Health