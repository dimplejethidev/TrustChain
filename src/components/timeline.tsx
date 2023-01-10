import React from "react";

interface TimelineProps {
  title: string;
  subtitle: string;
  des: string;
}

const TimelineItem = ({ title }: TimelineProps) => {
  return (
    <li>
      <div className="right_content">
        <h2 className="text-[#008dff]">{title}</h2>
      </div>
    </li>
  );
};

const Timeline = ({ points }: any) => {
  const pointers = points
    ? points.map(({ title, des, subtitle }: TimelineProps) => (
        <TimelineItem key={title} title={title} des={des} subtitle={subtitle} />
      ))
    : "";

  return (
    <div className="timeline">
      <ul>
        {pointers}
        <div style={{ clear: "both" }}></div>
      </ul>
    </div>
  );
};

export default Timeline;
