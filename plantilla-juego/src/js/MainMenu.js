'use strict'

var MainMenu = {

    create:function (game) {

        var titlescreen;
        var music;

        music = game.add.audio('musicmenu');
        music.play();

        
        this.createButton(game, "Play", game.world.centerX, game.world.centerY + 150, 300, 100,
        function(){
            this.state.start('play');
        });

        titlescreen = game.add.sprite(game.world.centerX, game.world.centerY, 'menu');
        titlescreen.anchor.setTo(0.5,0.5);
        

    },

    update:function (game) {


    },

    createButton : function(game, string, x, y, w, h, callback){
        var button1 = game.add.button(x,y,'button', callback, this, 2,1);

        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;

        var text = game.add.text(button1.x, button1.y, string, {
            font: "14px Arial", 
            fill: "#fff",
            align: "center"
        });

        text.anchor.setTo(0.5,0.5);
    }



};
module.exports = MainMenu;