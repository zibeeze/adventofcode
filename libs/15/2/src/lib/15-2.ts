import * as _ from 'lodash';

export function partOne(input: string[]) {
  const boxes = input.filter((x) => !!x).map((x) => new Package(x));
  return _.sumBy(boxes, (x) => x.totalWrappingPaper);
}

export function partTwo(input: string[]) {
  const boxes = input.filter((x) => !!x).map((x) => new Package(x));

  return _.sumBy(boxes, (x) => x.ribbonLength);
}

class Package {
  size: number[];
  get h() {
    return this.size[0];
  }
  get w() {
    return this.size[1];
  }
  get l() {
    return this.size[2];
  }
  constructor(input: string) {
    this.size = input
      .split('x')
      .map((x) => +x)
      .sort((x, y) => x - y);
  }

  get area() {
    return 2 * this.h * this.w + 2 * this.w * this.l + 2 * this.l * this.h;
  }

  get smallestSideArea() {
    return this.size[0] * this.size[1];
  }

  get totalWrappingPaper() {
    return this.area + this.smallestSideArea;
  }

  get ribbonLength() {
    let volume = this.h * this.w * this.l;
    let perimeter = 2 * this.h + 2 * this.w;
    return volume + perimeter;
  }
}
