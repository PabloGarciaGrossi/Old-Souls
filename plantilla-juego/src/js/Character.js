'use strict';
function Character(game, speed, x, y, spritename,audio)
  {
    Phaser.Sprite.call(this, game, x, y, spritename)
    this.anchor.setTo(0.5,0.5);
    this.speed = speed;
    this.direction = 0;
    this.invincible = false;
    this.moving = true;
    this.knockback = false;
    this.hurt = this.game.add.audio(audio);
  }

  Character.prototype = Object.create(Phaser.Sprite.prototype);
  Character.prototype.constructor = Character;
  Character.prototype.moveY = function(speed)
    {
      this.body.velocity.y = speed;
      this.body.velocity.x = 0;
    }
  Character.prototype.moveX = function(speed)
    {
      this.body.velocity.x = speed;
      this.body.velocity.y = 0;
    }
  Character.prototype.distanceToXY = function (x, y) {

      var dx =  this.x - x;
      var dy =  this.y - y;
  
      return Math.sqrt(dx * dx + dy * dy);
  }
  Character.prototype.knock = function(enemy, dmg, knockpower){
    this.salud -= dmg;
    this.hurt.play();
    switch(enemy.direction)
    {
      case 0:
        this.body.velocity.y = knockpower;
        this.body.velocity.x = 0;
        break;
      case 1:
        this.body.velocity.y = 0;
        this.body.velocity.x = -knockpower;
        break;
      case 2:
        this.body.velocity.y = -knockpower;
        this.body.velocity.x = 0;
        break;
      case 3:
        this.body.velocity.y = 0;
        this.body.velocity.x = knockpower;
        break;
    }
  this.moving = false;
  this.knockback = true;
  this.game.time.events.add(Phaser.Timer.SECOND * 0.1, function() {this.moving = true;this.knockback = false;}, this);
    }
    module.exports = Character;