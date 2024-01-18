import React from "react";
import { scaleLinear, scaleBand, max } from 'd3' 

const BarChart = ({width, height, data}) => {
    const margin = 10
    const lines = [10, 20, 30, 40]

    // scales
    const xScale = scaleLinear()
        .domain([0, max(data, d => d.sunshine)])
        .range([0, width - margin])
    
    const yScale = scaleBand()
        .domain(data)
        .range([0, height - 2 * margin])

    const rectangles = data.map((d) => (
        <rect
            key={d.city} x={margin} y={yScale(d)}
            height={yScale.bandwidth()}
            width={xScale(d.sunshine)}
            fill="darkorange"
            stroke='#FFF'
        ></rect>
    ))

    const labels = data.map((d) => (
        <text
            fill='#FFF'
            textAnchor='end'
            key={d.city}
            x={xScale(d.sunshine)}
            y={yScale(d) + 15}
        >
            {d.city}
        </text>
    ))

    const gridlines = lines.map((l, i) => (
       <g>
            <line
                key={i}
                y1={0}
                y2={height - margin}
                x1={xScale(l)}
                x2={xScale(l)}
                stroke="#FFF"
            ></line>
            <text
                textAnchor='middle'
                fontSize={12}
                x={xScale(l)}
                y={height - margin}
            >{l}</text>
        </g>
    ))

    return <svg viewBox={`0 0 ${width} ${height}`}>
        {rectangles}
        {gridlines}
        {labels}
    </svg>
}

export default BarChart;