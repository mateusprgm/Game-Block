import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  canvas; 
  ctx; 
  ALTURA; 
  LARGURA; 
  frames = 0;

  constructor(public navCtrl: NavController) {
    this.main();
  }
  clique(event){
    alert('oi');
  }

  main(){
    this.ALTURA = window.innerHeight;
    this.LARGURA = window.innerWidth;

    if(this.LARGURA >= 500){
      this.LARGURA = 600;
      this.ALTURA = 600;
    }

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.LARGURA;
    this.canvas.height = this.ALTURA;
    this.canvas.style.border = "1px solid #000";

    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);
    document.addEventListener("mousedown", this.clique);

    this.rodar();
  }
 
  rodar(){
    // this.atualizar();
    // this.desenhar();

    // window.requestAnimationFrame(this.rodar);
  };

  atualizar(){
    this.frames++;
  };

  desenhar(){
    this.ctx.fillStyle = "#50beff";
    this.ctx.fillRect(0, 0, this.LARGURA, this.ALTURA);
  }

}
