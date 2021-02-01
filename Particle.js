import * as PIXI from 'pixi.js';

function rand(min, max) {
  return min + (max - min)*Math.random();
}

export default class Particle {
  constructor(x,y,texture,size) {
    this.sprite = new PIXI.Sprite(texture);

    this.size = size;
    this.sprite.height = this.size;
    this.sprite.width = this.size;

    this.sprite.x = x;
    this.sprite.y = y;

    this.gravity = 0.7;

    this.bounce = -rand(0.5,0.1);

    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

    this.vxb = rand(-2,2);
    this.mode = 0;

    this.bottom = window.innerHeight;
  }

  update() {
    
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;

    if(this.mode) {
      this.x += this.vxb;
    }

    if(this.y + this.size>this.bottom) {
      this.mode = 1;
      this.y = this.bottom - this.size;
      this.vy *= this.bounce;
      
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}