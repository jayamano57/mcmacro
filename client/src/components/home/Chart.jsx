import React from "react";
import { Pie } from "react-chartjs-2";

function Chart(props) {
  return (
    <div className="chart">
      <Pie
        data={props.data}
        // width={0}
        // height={0}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}

export default React.memo(Chart);
