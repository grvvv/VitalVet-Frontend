import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughNut(props) {


  const [counts, setCounts] = useState({ weak: 0, moderate: 0, healthy: 0 });

  useEffect(() => {
    const cattlesArray = props.cattles;
    let newCounts = { weak: 0, moderate: 0, healthy: 0 };

    cattlesArray.forEach(cattle => {
      if (cattle.healthStatus === 'Weak') {
        newCounts.weak++;
      } else if (cattle.healthStatus === 'Moderate') {
        newCounts.moderate++;
      } else {
        newCounts.healthy++;
      }
    });

    setCounts(newCounts);
  }, [props.cattles]);

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
  <div>
    <Doughnut data={
      { 
        labels: [
          'Healthy',
          'Moderate',
          'Weak'
        ],
        datasets: [
          {
            data: [counts.healthy, counts.moderate, counts.weak],
            backgroundColor: [
              'rgba(90, 200, 30, 0.8)', // Green for strong value
              'rgba(255, 225, 50, 0.8)',  // Yellow for moderate value
              'rgba(255, 8, 8, 0.8)'  // 
            ],
            borderWidth: 0,
              },
            ],
          }
        } options={
          {
            responsive: true,
            aspectRatio: 1,
            cutout: '70%',
            circumference: 360,
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  padding: 40,
                  boxWidth: 20,
                  boxHeight: 20,
                }
            }
            },
            hover: { mode: null },
          }
        } 
    plugins={[gaugeText]}
    />
  </div>
    
  );
}

export default DoughNut;