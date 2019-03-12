import { Component, enableProdMode } from '@angular/core';
import { NavController } from 'ionic-angular';



enableProdMode()

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
  velocidade = 6;
  

  

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
  
    
    


    obstaculos = {
    _obs : <any>[],
    cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
    tempoInsere: 0,

    inserir:  () => {
     this.obstaculos._obs.push({
        x: this.LARGURA,
        largura: 30 + Math.floor(21 * Math.random()),
        altura: 30 + Math.floor(120 * Math.random()),
        cor: this.obstaculos.cores[Math.floor(5 * Math.random())]
     })

      this.obstaculos.tempoInsere = 30;
      
    },

    atualizar : () => {
      
      console.log(this.obstaculos._obs);

      if(this.obstaculos.tempoInsere == 0){
        this.obstaculos.inserir();
      }else{
        this.obstaculos.tempoInsere--;
      }
      

      for(let i = 0, tam = this.obstaculos._obs.length; i < tam; i++){
        let obs = this.obstaculos._obs[i];

        obs.x -= this.velocidade;

        if(obs.x <= -obs.largura){
          this.obstaculos._obs.splice(i, 1);
          tam--;
          i--;
        }
      }
    },

    desenhar : () => {
      for(let i = 0, tam = this.obstaculos._obs.length; i < tam; i++){
        let obs = this.obstaculos._obs[i];
        this.ctx.fillStyle = obs.cor;
        this.ctx.fillRect(obs.x, (this.chao.y - obs.altura), obs.largura, obs.altura);
      }
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
    this.obstaculos.inserir();
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
    this.obstaculos.atualizar();
  };

  desenhar(){
    this.ctx.fillStyle = "#50beff";
    this.ctx.fillRect(0, 0, this.LARGURA, this.ALTURA);
    this.chao.desenhar();
    this.obstaculos.desenhar();
    this.bloco.desenhar();
  }

}
