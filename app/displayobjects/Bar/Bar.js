import { Tween } from 'tween.js';
import { Sprite, Texture } from 'pixi.js';
import BAR0 from './bar0.png';

import BAR1 from './bar1.png';
import BAR2 from './bar2.png';
import BAR3 from './bar3.png';
import BAR4 from './bar4.png';

/**
 * A bunny which spins on it's feet when moused over
 *
 * @exports Bunny
 * @extends Sprite
 */
export default class Bar extends Sprite {

  constructor(type) {
  	let texture;
  	switch(type) {
  		case 1:  texture = Texture.fromImage(BAR1); break;
  		case 2:  texture = Texture.fromImage(BAR2); break;
  		case 3:  texture = Texture.fromImage(BAR3); break;
  		case 4:  texture = Texture.fromImage(BAR4); break;
  		default:  texture = Texture.fromImage(BAR0);;
  	}

    super(texture);

    this.tween = new Tween(this);

    this.anchor.x = .5;
    this.anchor.y = .5;

    this.width = 300;
    this.height = 20;

    this.scale.x = 1;
    this.scale.y = 1;

    this.step = 5;

    this.interactive = true;

    this.move = false;

    // this.on('mouseover', this.startSpin.bind(this));

    console.log(this)

  }

}
