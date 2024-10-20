import React from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  iron: number;
  bricks: number;
  cement: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  iron,
  bricks,
  cement,
}) => {
  const { t } = useTranslation();

  const data = {
    labels: [t("iron"), t("bricks"), t("cement")],
    datasets: [
      {
        label: t("materialsRequired"),
        data: [iron, bricks, cement],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "600px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
