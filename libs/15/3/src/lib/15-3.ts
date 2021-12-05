export class Deliver {
  private input: string;
  private santaX = 0;
  private santaY = 0;
  private roboX = 0;
  private roboY = 0;

  private deliveries: { [name: string]: number } = {};
  constructor(input: any, part: string) {
    this.input = input;
    if (part === 'ONE') {
      this.deliver('santa');
      for (let i = 0; i < this.input.length; i++) {
        const direction = this.input.charAt(i);
        this.move(direction, 'santa');
        this.deliver('santa');
      }
    } else {
      this.deliver('santa');
      this.deliver('robo');
      for (let i = 0; i < this.input.length; i++) {
        const direction = this.input.charAt(i);
        if (i % 2 === 0) {
          this.move(direction, 'robo');
          this.deliver('robo');
        } else {
          this.move(direction, 'santa');
          this.deliver('santa');
        }
      }
    }
  }

  private deliver(who: string) {
    let location = `${this[who + 'X']},${this[who + 'Y']}`;
    if (this.deliveries[location]) {
      this.deliveries[location] = 1;
    } else {
      this.deliveries[location]++;
    }
  }

  private move(direction: string, who: string) {
    switch (direction) {
      case '>':
        this[`${who}X`]++;

        break;
      case '<':
        this[`${who}X`]--;
        break;
      case '^':
        this[`${who}Y`]++;
        break;
      case 'v':
        this[`${who}Y`]--;
        break;

      default:
        break;
    }
  }

  public answer() {
    return Object.keys(this.deliveries).length;
  }
}
