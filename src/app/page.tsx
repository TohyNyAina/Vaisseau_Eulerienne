import { useState, useRef, useEffect } from "react";
import { eulerMethode } from "@/utils/euler";

export default function Home() {

  const [y0, setY0] = useState(100);
  const [t0, setT0] = useState(0);
  const [tEnd, setTEnd] = useState(10);
  const [step, setStep] = useState(0.1);
  const [speed, setSpeed] = useState(50);
  const [result, setResult] = useState([]);

  const canvasRef = useRef(null);

  const handleCalculate = () => {
    const f = (t, y) => -speed;
    const eulerResult = eulerMethode(f, y0, t0, tEnd, step);

    setResult(eulerResult);
  };

  useEffect(() => {
    if (result.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';

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

  return (
   <div>
      <h1>Explorateur 2D : Vaisseau en mouvement</h1>
      <p>Utilisez la methode d'Euler pour calculer la trajectoir d'un vaisseau.</p>

      <div>
        <label>
          Position initiale (y0 en pixels):
          <input 
            type="number" 
            value={y0} 
            onChange={(e) => setY0(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Vitesse (pixels/s):
          <input
            type="number"
            value={speed} 
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Temps initial (t0):
          <input
            type="number"
            value={t0} 
            onChange={(e) => setT0(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Temps final (tEnd):
          <input
            type="number"
            value={tEnd} 
            onChange={(e) => setTEnd(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Pas de calcul (step):
          <input
            type="number"
            value={step} 
            onChange={(e) => setStep(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <button onClick={handleCalculate}>Lancer la simulation</button>

      <h2>Resultats:</h2>

      <canvas 
        ref={canvasRef}
        width={300}
        height={300}
        style={{ border: '1px solid black', marginTop: '20px' }}
      >
      </canvas>

   </div>
  );
}
