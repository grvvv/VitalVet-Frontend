import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart(props) {
  const labels = props.labels;

  return (
    <div className={props.class}>   
          <Line options={
            {
              scales: {
                y: {
                  title: {
                    display: true,
                    text: `${props.title}`
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Date'
                  }
                }
              },
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }
          }
          data={
            {
              labels,
              datasets: [
                {
                  label: 'Cow',
                  data: props.avgdata,
                  borderColor: `${props.color}`,
                  backgroundColor: `${props.color}`,
                  lineTension: 0.17,
                },
              ],
            }
          }
          />
        </div>
  )
}

export default LineChart