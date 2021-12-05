export function partOne(input) {
  let x = 0;
  let z = 0;

  input.forEach((direction) => {
    const split = direction.split(' ');
    const command = split[0];
    const value = +split[1];

    switch (command) {
      case 'forward':
        x += value;
        break;

      case 'up':
        z -= value;
        break;

      case 'down':
        z += value;
        break;

      default:
        break;
    }
  });

  return x * z;
}

export function partTwo(input) {
  let x = 0;
  let z = 0;
  let aim = 0;

  input.forEach((direction) => {
    const split = direction.split(' ');
    const command = split[0];
    const value = +split[1];

    switch (command) {
      case 'forward':
        x += value;
        z += aim * value;
        break;

      case 'up':
        aim -= value;
        break;

      case 'down':
        aim += value;
        break;

      default:
        break;
    }
  });

  return x * z;
}
