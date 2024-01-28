import React, { useEffect, useState } from 'react';
import { Layout, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import data from './data.json';

const { Content } = Layout;

const App = () => {
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    // Extract relevant data for charts
    const charts = data.map((entry, index) => {
      const goals = entry.goals || {};
      const goalsArray = Object.keys(goals).map((goal) => ({
        goalName: goal,
        conversions: goals[goal].nb_conversions,
      }));

      return {
        entryLabel: entry.label || `Entry ${index + 1}`,
        goalsData: goalsArray,
      };
    });

    setChartsData(charts);
  }, []);

  const getGoalsChartOption = (goalsData) => {
    return {
      title: {
        text: `Conversions by Goal - ${goalsData.entryLabel}`,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: goalsData.goalsData.map((item) => item.goalName),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'blue',
        },
      },
      series: [
        {
          data: goalsData.goalsData.map((item) => item.conversions),
          type: 'bar',
          itemStyle: {
            color: 'green',   
          },
          // Example of adding a label to each bar
          label: {
            show: true,
            position: 'top',
            color: 'red',
          },
        },
      ],
    };
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        {chartsData.map((chartData, index) => (
          <Card key={index} title={`Web Analytics - ${chartData.entryLabel}`}>
            <ReactEcharts option={getGoalsChartOption(chartData)} style={{ height: '400px' , width: '350px'}} />
          </Card>
        ))}
      </Content>
    </Layout>
  );
};

export default App;
