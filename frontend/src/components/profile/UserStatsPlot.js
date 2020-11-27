import React, { useState } from "react";
import styled from "styled-components";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import Box from "../shared/Box";

const StatsPlotContainer = styled.div``;

const categories = ["SPEED", "TEAMWORK", "BRAIN", "BRAVE", "LEAD"];

const initialData = categories.map((cat) => ({
  category: cat,
  score: Math.random() * 101,
}));

function UserStatsPlot() {
  const [data, setdata] = useState(initialData);

  return (
    <Box title="User Stats">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius={100}
        width={600}
        height={300}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="score"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </Box>
  );
}

export default UserStatsPlot;
