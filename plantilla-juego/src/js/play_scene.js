'use strict';
var Player = require('./player.js');
var Enemy = require('./Enemy.js');
var PlayScene = {

  create: function () {
    this.game.stage.backgroundColor = '#787878';
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tileset');
    this.map.setCollisionBetween(0,23);
    this.layer = this.map.createLayer(0);
   // this.map.setCollisionBetween(1, 5000, true, 0);
    this.layer.resizeWorld();
    this.layer.debug = true;
    
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jugador = new Player(this.game,300,this.game.world.centerX,this.game.world.centerY,"player",this.cursors);
    this.enemy = new Enemy(this.game, 75, 150,150,"esqueleto");
    this.jugador.create();
    this.enemy.create();
    this.camera.follow(this.jugador);

  },

  update: function() {
    this.physics.arcade.collide(this.jugador,this.layer);
    this.physics.arcade.collide(this.enemy, this.layer);

    this.physics.arcade.overlap(this.jugador, this.enemy, this.collision, null, this);

    //this.cosa.sprite.rotation += 0.01;
    this.jugador.update();
    this.enemy.update(this.jugador.x, this.jugador.y);

  },

  collision : function (jugador, enemy) {

    if (enemy.x > jugador.x)
    {
      jugador.x -= 20;
    }
    else{
      jugador.x += 20;
    }
    if (enemy.y > jugador.y)
    {
      jugador.y += 20;
    }
    else
    {
      jugador.y -= 20;
    }

    //this.game.state.start(this.game.state.current);

  }

};
module.exports = PlayScene;