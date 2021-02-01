import * as PIXI from 'pixi.js';
import radial from './img/circle.png';
import LeonSans from './leon';
import Particle from './Particle';
import Wave from './Wave'

const loader = PIXI.Loader.shared;

console.log(radial);

class Sketch {
  constructor() {
    this.number = 50;
    this.particleSize = 30;
    this.app = new PIXI.Application({
      width: window.innerWidth, 
      height: window.innerHeight, 
      resizeTo: window,
      backgroundColor: 0x1099bb, 
      resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(this.app.view);
    this.container = new PIXI.ParticleContainer(1000);
    this.app.stage.addChild(this.container);

    this.drops = [];
    this.waves = [];

    this.addFilters();  
    this.addObjects();
    
  }

  addFilters() {
    this.blurFilter = new PIXI.filters.BlurFilter();
    this.blurFilter.blur = 20;

    let shader = `precision mediump float; 
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;
      void main(void) {
        vec4 color = texture2D(uSampler, vTextureCoord);
        if(color.a > 0.1) {
          gl_FragColor = vec4(1.,1.,1.,1.);
        } else {
          gl_FragColor = vec4(0.,0.,0.,1.);
        }
        // gl_FragColor = texture2D(uSampler, vTextureCoord);
      }`;
    this.thresholdFilter = new PIXI.Filter(undefined, shader, {});

    this.app.stage.filters = [this.blurFilter, this.thresholdFilter];
    this.app.stage.filterArea = this.app.renderer.screen;

  }

  addObjects() {

    loader.add('drop', radial).load((loader, resources) => {
      // console.log(resources.drop.texture);

    let leon = new LeonSans({
      text: 'HELLO',
      color: ['#000000'],
      size: 200,
      weight: 100,
      isPath: true,
      tracking: 6
    });
    console.log(leon);

      // for(let i = 0; i < this.number; i++) {
        // let x = Math.random()*600;
        // let y = Math.random()*100;

        leon.paths.forEach(p => {

          let particle = new Particle(p.x,p.y,resources.drop.texture, this.particleSize);
          this.drops.push(particle);

          this.container.addChild(particle.sprite);
        });

        for(let i = 0; i < 20; i++) {
          let wave = new Wave(resources.drop.texture,i)
          this.waves.push(
            wave
          )
          this.container.addChild(wave.sprite);
        }

        // circle particles
        // let theta = 2*Math.PI*i/this.number;
        // let x = 200 + 100*Math.sin(theta);
        // let y = 200 + 100*Math.cos(theta);

        // let particle = new Particle(x,y,resources.drop.texture, this.particleSize);
        // this.drops.push(particle);

        // this.container.addChild(particle.sprite);
      // }
      
      
    });

    this.animate();
  }

    animate() {
    this.app.ticker.add((delta) => {
      this.drops.forEach(d => {
        d.update();
      });
      this.waves.forEach(d => {
        d.update(window.innerHeight);
      })
    });
  }
}

const b = new Sketch
