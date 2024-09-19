'use client';

import { useState, useEffect } from "react";
import { eulerMethod } from "@/utils/euler";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EulerResult {
  t: number;
  y: number;
}

const Home: React.FC = () => {
  const [y0, setY0] = useState<number>(100);
  const [t0, setT0] = useState<number>(0);
  const [tEnd, setTEnd] = useState<number>(10);
  const [step, setStep] = useState<number>(0.1);
  const [speed, setSpeed] = useState<number>(50);
  const [result, setResult] = useState<EulerResult[]>([]);
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [shipPosition, setShipPosition] = useState<number>(y0);

  const handleCalculate = () => {
    const f = (t: number, y: number): number => -speed;
    const eulerResult = eulerMethod(f, y0, t0, tEnd, step);
    setResult(eulerResult);
    setShowGraph(true);
  };

  useEffect(() => {
    if (result.length > 0) {
      result.forEach((item, index) => {
        setTimeout(() => {
          setShipPosition(item.y);
        }, index * 100);
      });
    }
  }, [result]);

  const chartData = {
    labels: result.map((item) => item.t.toFixed(2)),
    datasets: [
      {
        label: "Position du vaisseau (y)",
        data: result.map((item) => item.y.toFixed(2)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Évolution de la position du vaisseau en fonction du temps",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Position (y)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Temps (t)",
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Explorateurs 2D : Vaisseau en mouvement
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Utilisez la méthode d'Euler pour calculer la trajectoire d'un vaisseau.
      </p>
      
      {/* Formulaire */}
      <div className="form-container bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-8">
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-4">
            <label className="text-gray-600">Position initiale (y0 en pixels):</label>
            <input
              type="number"
              value={y0}
              onChange={(e) => setY0(parseFloat(e.target.value))}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-600">Vitesse (pixels/s):</label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-600">Temps initial (t0):</label>
            <input
              type="number"
              value={t0}
              onChange={(e) => setT0(parseFloat(e.target.value))}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-600">Temps final (tEnd):</label>
            <input
              type="number"
              value={tEnd}
              onChange={(e) => setTEnd(parseFloat(e.target.value))}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-600">Pas de calcul (step):</label>
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(parseFloat(e.target.value))}
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Lancer la simulation
        </button>
      </div>

      {/* Résultats de la simulation */}
      <div className="results-container">
        {/* Conteneur de simulation */}
        <div className="simulation-container bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Simulation :</h2>
          <div className="canvas-container relative h-96 w-full border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden">
            {/* Image du vaisseau */}
            <img
              src="/img/vaisseau.png"
              alt="Vaisseau"
              className="vaisseau absolute transition-transform duration-100"
              style={{
                top: `${shipPosition}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
              }}
            />
          </div>
        </div>

        {/* Graphique */}
        {showGraph && (
          <div className="graph-container w-full max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Graphique de la position du vaisseau</h2>
            <div>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
