import React from 'react'
import { ResponsiveLine as Line } from '@nivo/line'

const ResponsiveLine = ({ data, disableGrids }) => {
  return <Line
    data={data}
    margin={{
      top: disableGrids ? 10 : 50,
      right: disableGrids ? 0 : 30,
      bottom: disableGrids ? 10 : 50,
      left: disableGrids ? 0 : 50
    }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
    curve={disableGrids ? 'natural' : 'linear'}
    axisTop={null}
    axisRight={null}
    axisBottom={disableGrids ? null : {
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'day',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={disableGrids ? null : {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'messages',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    enableArea={false}
    enablePoints={false}
    enableGridX={disableGrids ? false : true}
    enableGridY={disableGrids ? false : true}
    useMesh={true}
  />
}

export default ResponsiveLine
