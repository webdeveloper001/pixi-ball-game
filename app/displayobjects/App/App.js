import ScaledContainer from '../ScaledContainer/ScaledContainer.js';
import BunnyGroup from '../BunnyGroup/BunnyGroup.js';
import Bunny from '../Bunny/Bunny.js';
import Ball from '../Ball/Ball.js';
import Bar from '../Bar/Bar.js'; 
import Background from '../Background/Background.js';
import RendererStore from '../../stores/RendererStore.js';


var self = null;
export default class App extends ScaledContainer {

  constructor(...args) {

    super(...args);

    this.bg = new Background();
    this.ball = new Ball(); 
    this.bar = new Bar(0); 
    this.bar0 = new Bar(0); 
    this.movebars = [new Bar(1), new Bar(2), new Bar(3), new Bar(4)];

    this.vx = 1;
    this.vy = -1;

    this.ax = 0;
    this.ay = 0;

    this.min_limit = 1;

    this.gravity = 2.00000001;

    this.addBunnies();

    this.win = false;

    self = this

    setTimeout(this.gameOver, 10000);
  }

  reset() {
    for (var i = this.children.length - 1; i >= 0; i--) {  this.removeChild(this.children[i]);};
    this.addBunnies();
  }

  gameOver() {
    if(self.win == false) {
      let gameover = new PIXI.Text("GAME OVER! press 'R' to start again");
      gameover.x = 100;
      gameover.y = 100;
      self.addChild(gameover); 
    } else {
      let winner = new PIXI.Text("WINNER!");
      winner.x = RendererStore.get('stageWidth') - 300; 
      winner.y = 100;
      self.addChild(winner);
    }
  }

  addBunnies() {
    console.log("ball", this.ball);
    const cx = RendererStore.get('stageCenter').x;
    const cy = RendererStore.get('stageCenter').y;

    let group1 = new BunnyGroup();
    let b1 = new Bunny();

    this.addChild(this.bg);

    this.ball.position.y = cy - RendererStore.get('stageHeight')*.4;
    this.ball.position.x = cx - RendererStore.get('stageWidth')*.5 + this.ball.radius;

    this.bar.position.x = this.ball.position.x;
    this.bar.position.y = cy;
    this.bar0.position.x = RendererStore.get('stageWidth') - this.ball.position.x;
    this.bar0.position.y = cy;

    b1.position.x = cx;
    b1.position.y = cy;

    group1.position.x = cx;
    group1.position.y = cy + (RendererStore.get('stageHeight')*.25);

    this.addChild(b1);
    this.addChild(this.ball);
    this.addChild(this.bar);
    this.addChild(this.bar0);
    this.addChild(group1);

    let len = this.movebars.length;

    for(var i = 0; i < len; i ++) {
      this.movebars[i].position.y = Math.random() * RendererStore.get('stageHeight') * .5 + RendererStore.get('stageHeight') * .25;
      this.movebars[i].position.x = cx + (len*.5 - i - .5) * RendererStore.get('stageWidth') * .8 / len;
      this.addChild(this.movebars[i]);
    }

    document.addEventListener('keydown', this.onKeyDown);
  }

  update() {

    this.vx = this.vx * 0.8;
    this.vy = this.vy * 0.8;

    let bounceX = false;
    let bounceY = false;

    if(this.ball.position.x < this.ball.radius || this.ball.position.x > RendererStore.get('stageWidth') - this.ball.radius){
      bounceX = true;
    }
    if(this.ball.position.y < this.ball.radius || this.ball.position.y > RendererStore.get('stageHeight') - this.ball.radius){
      this.gameOver();
      bounceY = true;
    }

    if(this.ball.position.x > this.bar.position.x-this.bar.width*.5 && this.ball.position.x < this.bar.position.x+this.bar.width*.5) {
      let bally = this.ball.position.y + this.ball.radius
      if(bally > this.bar.position.y - this.bar.height*.5 && bally < this.bar.position.y + this.bar.height*.5) {
        bounceY = true;
      }
    }

    if(this.ball.position.x > this.bar0.position.x-this.bar0.width*.5 && this.ball.position.x < this.bar0.position.x+this.bar0.width*.5) {
      let bally = this.ball.position.y + this.ball.radius
      if(bally > this.bar0.position.y - this.bar0.height*.5 && bally < this.bar0.position.y + this.bar0.height*.5) {
        bounceY = true;
        this.win = true;
        this.gameOver(); 
      }
    }

    let len = this.movebars.length;

    for(var i = 0; i < len; i ++) {
      let mbar = this.movebars[i];
      mbar.position.y += mbar.step;
      if(mbar.position.y < RendererStore.get('stageHeight')*.3 || mbar.position.y > RendererStore.get('stageHeight')*.8)
        mbar.step = -mbar.step;
      if(this.ball.position.x > mbar.position.x-mbar.width*.5 && this.ball.position.x < mbar.position.x+mbar.width*.5) {
        let bally = this.ball.position.y + this.ball.radius
        if(bally > mbar.position.y - mbar.height*.5 && bally < mbar.position.y + mbar.height*.5) {
          bounceY = true;
          this.ball.position.y += mbar.step > 0? 0: mbar.step;
        }
      }
    }

    if(bounceX){
      this.vx = -0.8*this.vx;
      this.ball.position.x += this.vx;
    }
    if(bounceY){
      this.vy = -0.6*this.vy;
      // this.ball.position.y += this.vy * 1.000000000001;
    }


    this.ball.position.x += this.vx;
    this.ball.position.y += this.vy;

    this.vx += this.ax;
    this.vy += (this.ay + this.gravity);
    this.ay = this.ay * 0.5;
    this.ax = this.ax * 0.5

    if(Math.abs(this.ax) < this.min_limit) this.ax = 0;
    if(Math.abs(this.ay) < this.min_limit) this.ay = 0;
    if(Math.abs(this.vx) < this.min_limit) this.vx = 0;
    if(Math.abs(this.vy) < this.min_limit) this.vy = 0;
    // console.log(this.vx + this.vy);
  }

  onKeyDown(key) {

      if (key.keyCode == 82) {
        self.reset();
      }

      if (key.keyCode === 65 || key.keyCode === 37) {
          self.ax = -10;
          self.ball.spinLeft();
      }
      if (key.keyCode === 68 || key.keyCode === 39) {
          self.ax = 10;
          self.ball.spinRight();
      }
  }

}
