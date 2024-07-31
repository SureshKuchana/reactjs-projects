import PropTypes from 'prop-types';

import { useState } from "react"
import './chart.css'
import CHART_DATA from "./data";

const Bar = ({
  name, color, ticketCount
}) => {
  return (
    <div key={name} className="bar" style={{
      height: `${ticketCount}%`,
      backgroundColor: color,
    }}>

    </div>
  )
}


const VelocityChart = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <>
    <button className="barChart" onClick={() => setShowChart(prev => !prev)}>Toggle Chart</button>
    {showChart ? 
      <div className="chart-container">
        <div className="chart">
          {
            CHART_DATA.map((item) => {
              return <Bar key={item.id} {...item}/>
            })
          }
        </div>
        <div className="y-axis-label">Number of tickets</div>
        <div className="x-axis-label">Departments</div>
      </div>
    : null}
    </>
  )
}

Bar.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  ticketCount: PropTypes.number.isRequired
}

export default VelocityChart