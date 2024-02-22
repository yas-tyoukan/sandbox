function Main(input) {
  const inputArray = input.split('\n');
  const n = parseInt(inputArray[0], 10);
  const plans = inputArray.slice(1).map(plan => plan.split(' ').map(Number));
  let t = 0;
  let x = 0;
  let y = 0;
  let i = 1;
  while(i <= n) {
    const [nt, nx, ny] = plans[i - 1];
    const dt = nt - t;
    const dx = Math.abs(nx - x);
    const dy = Math.abs(ny - y);
    const dist = dx + dy;
    if (dist > dt || dist % 2 !== dt % 2) {
      console.log('No');
      return;
    }
    t = nt;
    x = nx;
    y = ny;
    i++;
  }
  console.log('Yes');
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));