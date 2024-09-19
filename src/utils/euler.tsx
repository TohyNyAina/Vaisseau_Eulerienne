export function eulerMethod(
    f: (t: number, y: number) => number,
    y0: number,
    t0: number,
    tEnd: number,
    step: number
  ): { t: number; y: number }[] {
    let t = t0;
    let y = y0;
    const result: { t: number; y: number }[] = [{ t, y }]; // stocke les résultats à chaque itération
  
    while (t < tEnd) {
      y = y + step * f(t, y); // méthode d'Euler
      t = t + step;
      result.push({ t, y });
    }
  
    return result;
  }