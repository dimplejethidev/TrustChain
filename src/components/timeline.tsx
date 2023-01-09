import React from 'react';

interface TimelineProps {
  title: string,
  subtitle: string,
  des:string
}

const TimelineItem = ({title, subtitle, des}: TimelineProps) => {
  return (
    <li>
      <div className="right_content">
        <h2 className="text-[#D27D2D]">{title}</h2>
        <p className="text-gray-700 dark:text-white">{des}</p>
      </div>
      <div className="left_content">
        <h3 className="text-gray-700 dark:text-white">{subtitle}</h3>
      </div>
    </li>
  )
}

  const Timeline = ({points}: any) => {
  const pointers = points ? 
    points.map(({title, des, subtitle}: TimelineProps) => 
      <TimelineItem key={title} title={title} des={des} subtitle={subtitle} /> 
      ) : ''

  return (
    <div className="timeline">
    <ul>
      {pointers}
      <div style={{clear:'both'}}></div>
    </ul>
  </div>
  )
}

export default Timeline