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

  chao = {
    y: 550,
    altura:50, 
    cor: "#ffdf70",

     desenhar : () => {
      
       this.ctx.fillStyle = this.chao.cor;
       this.ctx.fillRect(0, this.chao.y, this.LARGURA, this.chao.altura);
    }
  }

  bloco = {
    x: 50,
    y: 0,
    altura: 50,
    largura: 50,
    cor: "#ff4e4e",
    gravidade: 1.5,
    valocidade: 0,
    forcaDoPulo: 15,

    atualizar : () => {
      this.bloco.valocidade += this.bloco.gravidade;
      this.bloco.y += this.bloco.valocidade;

      if(this.bloco.y > this.chao.y - this.bloco.altura){
        this.bloco.y = this.chao.y - this.bloco.altura;
      }
    },

    pular : () => {
      this.bloco.valocidade = -this.bloco.forcaDoPulo;
    },

    desenhar : () => {
      this.ctx.fillStyle = this.bloco.cor;
      this.ctx.fillRect(this.bloco.x, this.bloco.y, this.bloco.largura, this.bloco.altura);
    }

  }

  constructor(public navCtrl: NavController) {
    this.main();
  }
  clique = (event) => {
    this.bloco.pular();
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
 
  rodar = () => {
    this.atualizar();
    this.desenhar();

    window.requestAnimationFrame(this.rodar);
  };

  atualizar(){
    this.frames++;
    this.bloco.atualizar();
  };

  desenhar(){
    this.ctx.fillStyle = "#50beff";
    this.ctx.fillRect(0, 0, this.LARGURA, this.ALTURA);
    this.chao.desenhar();
    this.bloco.desenhar();
  }

}
