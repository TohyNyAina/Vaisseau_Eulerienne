'use client'

import { useState, useRef, useEffect } from "react";
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCalculate = () => {
    const f = (t: number, y: number): number => -speed;
    const eulerResult = eulerMethod(f, y0, t0, tEnd, step);
    setResult(eulerResult);
    setShowGraph(true);
  };

  useEffect(() => {
    if (result.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";

      result.forEach((item, index) => {
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.arc(150, item.y, 20, 0, 2 * Math.PI);
          ctx.fill();
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
    <div>
      <h1>
        Explorateurs 2D : Vaisseau en mouvement
      </h1>
      <p>
        Utilisez la méthode d'Euler pour calculer la trajectoire d'un vaisseau.
      </p>

      <div>
        <div>
          <label>Position initiale (y0 en pixels):</label>
          <input
            type="number"
            value={y0}
            onChange={(e) => setY0(parseFloat(e.target.value))}
        />
        </div>
        <div>
          <label>Vitesse (pixels/s):</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Temps initial (t0):</label>
          <input
            type="number"
            value={t0}
            onChange={(e) => setT0(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Temps final (tEnd):</label>
          <input
            type="number"
            value={tEnd}
            onChange={(e) => setTEnd(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Pas de calcul (step):</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
      >
        Lancer la simulation
      </button>

      <h2>Résultats :</h2>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
      ></canvas>

      {showGraph && (
        <div>
          <h2>Graphique de la position du vaisseau</h2>
          <div>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
