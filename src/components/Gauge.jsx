import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Gauge(props) {

  const gaugeText = {
    id: "gaugeText",
    beforeDatasetDraw(chart){
      const { ctx } = chart;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save()
      ctx.fillStyle = "gray"
      ctx.font = "bold 18px Poppins"
      ctx.textAlign = "center"
      ctx.textBaseline = "center"
      ctx.fillText(`${props.text || ''}`, xCenter, yCenter)

    }
  }
  return (
  <div className={`gauge-container ${props.class}`}>
    <div className="gauge-values">
      <h3>
        {props.title}
      </h3>
      <div className="gauge-values avg-value">
        Avg Today: <span style={{display:'block'}}>{props.avg}</span>  
      </div>
    </div>
    
    <div className='gauge-chart'>
      <Doughnut className='gauge-chart' data={
        {
          datasets: [
            {
              data: [props.value, 100 - props.value],
              backgroundColor: [
                `${props.color}`, // Red for temperature value
                'rgba(172, 172, 172, 0.2)',  // Blue for remaining value
              ],
              borderWidth: 0,
                },
              ],
            }
          } options={
            {
              responsive: true,
              aspectRatio: 1,
              cutout: '80%',
              circumference: 360,
              plugins: {
                tooltip: {
                  enabled: false,
                }
              },
              hover: { mode: null },
            }
          } 
          plugins={[gaugeText]}
        />
      </div>
    </div>
    
  );
}

export default Gauge