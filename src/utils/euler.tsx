export function eulerMethode(f, y0, t0, tEnd, step) {
    let t = t0;
    let y = y0;
    let result = [{ t, y }];

    while(t < tEnd) {
        y = y + step * f(t, y);

        t = t + step;
        result.push({ t, y });
    }

    return result;
}