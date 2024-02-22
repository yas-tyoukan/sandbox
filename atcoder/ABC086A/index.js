function Main(input) {
  const [a, b] = input.split(' ').map(Number);
  if (a * b % 2 === 0) {
    console.log('Even');
  } else {
    console.log('Odd');
  }
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));