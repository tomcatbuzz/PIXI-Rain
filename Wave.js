import * as PIXI from 'pixi.js';

function rand(min, max) {
  return min + (max - min)*Math.random();
}

export default class Wave {
  constructor(texture,i) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.width = 300;
    this.sprite.height = 300;

    this.x = i*70 - 150;

    this.y = 0;

    this.speed = 0.05;

    this.moving = rand(0,50);
  }

  update(bottom) {

    this.moving += this.speed;

    this.y += 0.1*Math.sin(this.moving);
    
    this.sprite.y = bottom - 90 + this.y;
    this.sprite.x = this.x;
  }
}