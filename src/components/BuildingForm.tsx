import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MapComponent from "./MapComponent";
import ChartComponent from "./ChartComponent";
import {
  calculateBricks,
  calculateCement,
  calculateIron,
  validateData,
} from "../utils/calculations";

const BuildingForm: React.FC = () => {
  const { t } = useTranslation();

  const [floors, setFloors] = useState<number>(1);
  const [area, setArea] = useState<number>(100);
  const [rooms, setRooms] = useState<number>(3);
  const [doors, setDoors] = useState<number>(5);
  const [windows, setWindows] = useState<number>(8);

  const [chartData, setChartData] = useState({
    floors: 1,
    area: 100,
    rooms: 3,
    doors: 5,
    windows: 8,
    iron: 100,
    bricks: 4700,
    cement: 30,
  });

  const handleSubmit = () => {
    const errorMessage = validateData(floors, area, rooms);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const totalIron = calculateIron(area, floors);
    const totalBricks = calculateBricks(area, floors, doors, windows);
    const totalCement = calculateCement(area, floors, doors, windows);

    setChartData({
      floors,
      area,
      rooms,
      doors,
      windows,
      iron: totalIron,
      bricks: totalBricks,
      cement: totalCement,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">{t("title")}</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t("floors")}:
        </label>
        <input
          type="number"
          value={floors}
          onChange={(e) => setFloors(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t("area")}:
        </label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t("rooms")}:
        </label>
        <input
          type="number"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t("doors")}:
        </label>
        <input
          type="number"
          value={doors}
          onChange={(e) => setDoors(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t("windows")}:
        </label>
        <input
          type="number"
          value={windows}
          onChange={(e) => setWindows(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
      >
        {t("calculate")}
      </button>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">{t("buildingDataTable")}</h3>
        <table className="w-full bg-gray-100 text-left">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2">{t("floors")}</th>
              <th className="px-4 py-2">{t("doors")}</th>
              <th className="px-4 py-2">{t("windows")}</th>
              <th className="px-4 py-2">{t("iron")}</th>
              <th className="px-4 py-2">{t("bricks")}</th>
              <th className="px-4 py-2">{t("cement")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">{chartData.floors}</td>
              <td className="px-4 py-2">{chartData.doors}</td>
              <td className="px-4 py-2">{chartData.windows}</td>
              <td className="px-4 py-2">{chartData.iron}</td>
              <td className="px-4 py-2">{chartData.bricks.toFixed(0)}</td>
              <td className="px-4 py-2">{chartData.cement.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <ChartComponent
          iron={chartData.iron}
          bricks={chartData.bricks}
          cement={chartData.cement}
        />
      </div>

      <div className="mt-8">
        <MapComponent
          floors={floors}
          area={area}
          rooms={rooms}
          doors={doors}
          windows={windows}
        />
      </div>
    </div>
  );
};

export default BuildingForm;
