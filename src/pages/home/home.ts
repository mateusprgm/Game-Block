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
  estadoAtual;
  
  estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2,
  }
  

  

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
    forcaDoPulo: 25,
    

    atualizar : () => {
      this.bloco.valocidade += this.bloco.gravidade;
      this.bloco.y += this.bloco.valocidade;

      if(this.bloco.y > this.chao.y - this.bloco.altura
        && this.estadoAtual != this.estados.perdeu){
        this.bloco.y = this.chao.y - this.bloco.altura;
        this.bloco.valocidade = 0;
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
      
      

      if(this.obstaculos.tempoInsere == 0){
        this.obstaculos.inserir();
      }else{
        this.obstaculos.tempoInsere--;
      }
      

      for(let i = 0, tam = this.obstaculos._obs.length; i < tam; i++){
        let obs = this.obstaculos._obs[i];

        obs.x -= this.velocidade;

        if(this.bloco.x < obs.x + obs.largura 
          && this.bloco.x + this.bloco.largura >= obs.x 
          && this.bloco.y + this.bloco.altura >= this.chao.y - obs.altura){
            this.estadoAtual = this.estados.perdeu;

        }

        if(obs.x <= -obs.largura){
          this.obstaculos._obs.splice(i, 1);
          tam--;
          i--;
        }
      }
    },

    reset : () => {
      this.obstaculos._obs = [];
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
    if(this.estadoAtual == this.estados.jogando){
      this.bloco.pular();
    }else if(this.estadoAtual == this.estados.jogar){
      this.estadoAtual = this.estados.jogando;
    }else if(this.estadoAtual == this.estados.perdeu){
      this.estadoAtual = this.estados.jogar;
      this.bloco.valocidade = 0;
      this.bloco.y = 0;
    }
    
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
    this.estadoAtual = this.estados.jogar;
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

    if(this.estadoAtual == this.estados.jogando){
      this.obstaculos.atualizar();
    }else if(this.estadoAtual == this.estados.perdeu){
      this.obstaculos.reset();
    }
  };

  desenhar(){
    this.ctx.fillStyle = "#50beff";
    this.ctx.fillRect(0, 0, this.LARGURA, this.ALTURA);

    if(this.estadoAtual == this.estados.jogar){
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.LARGURA / 2, this.ALTURA / 2 - 50, 100, 100);
    }else if(this.estadoAtual == this.estados.perdeu){
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.LARGURA / 2 - 50, this.ALTURA / 2 - 50, 100, 100);
    }else if(this.estadoAtual == this.estados.jogando){
      this.obstaculos.desenhar();
    }

    this.chao.desenhar();
    this.bloco.desenhar();
  }

}
