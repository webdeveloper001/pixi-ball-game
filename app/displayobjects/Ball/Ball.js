import { Tween } from 'tween.js';
import { Sprite, Texture } from 'pixi.js';
import BALL from './ball.png';

export default class Ball extends Sprite {

  constructor() {
    const texture = Texture.fromImage(BALL);

    super(texture);

    this.tween = new Tween(this);

    this.anchor.x = .5;
    this.anchor.y = .5;

    this.scale.x = .2;
    this.scale.y = .2;

    this.radius = 70;

    this.interactive = true;
    this.on('mouseover', this.startSpin.bind(this));

    console.log(this)

  }

  startSpin() {
    this.tween.to({rotation: Math.PI*2}, 1000);
    this.tween.start();
    this.tween.onComplete(() => this.rotation = 0);
  }

  spinLeft() {
    this.tween.to({rotation: -Math.PI*2}, 1000);
    this.tween.start();
    this.tween.onComplete(() => this.rotation = 0);
  }

  spinRight() {
    this.tween.to({rotation: Math.PI*2}, 1000);
    this.tween.start();
    this.tween.onComplete(() => this.rotation = 0);
  }

}
