import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Title } from "./Chart.styled";
import { Bar } from "react-chartjs-2";

const Charts = ({ a, b, population, data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const xValues = Array.from({ length: 100 }, (_, i) => i + 1);
    const lValues = xValues.map(
      (x) => population * Math.exp((-b * (Math.exp(a * x) - 1)) / a)
    );
    const vozLValues = data;
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: "L(x)",
            borderColor: "blue",
            data: lValues,
          },
          {
            label: "ВОЗ L(x)",
            borderColor: "red",
            data: vozLValues,
          },
        ],
      },
    });
    return () => {
      chart.destroy();
    };
  }, [a, b, population, data]);

  const lValues = [];
  for (let x = 1; x <= 100; x++) {
    const s = Math.exp((-b * (Math.exp(a * x) - 1)) / a);
    const l = population * s;
    lValues.push(l.toFixed(1));
  }
  const chartData = {
    labels: Array.from({ length: 100 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: "L(x)",
        data: lValues,
        backgroundColor: "#82b4ec",
        borderColor: "#75abee",
        borderWidth: 0,
      },
    ],
  };
  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Title>
        A graph of the aging process through Hompertz's analytical mortality law
      </Title>
      <Bar data={chartData} options={chartOptions} />
      <Title>
        Comparison of obtained simulation results with real statistical
        mortality
      </Title>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default Charts;
