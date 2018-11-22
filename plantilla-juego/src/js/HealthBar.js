var HealthBar = function(game, providedConfig) {
    this.game = game;
    this.group = null;

    this.setupConfiguration(providedConfig);
    this.setPosition(this.config.x, this.config.y);
    this.drawBackground();
    this.drawBorder();
    this.drawHealthBar();
    this.setFixedToCamera(this.config.isFixedToCamera);
};
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.setupConfiguration = function (providedConfig) {
    this.config = this.mergeWithDefaultConfiguration(providedConfig);
    this.flipped = this.config.flipped;
};

HealthBar.prototype.mergeWithDefaultConfiguration = function(newConfig) {
    var defaultConfig= {
        width: 250,
        height: 40,
        x: 0,
        y: 0,
        bg: {
            color: '#651828'
        },
        bar: {
            color: '#FEFF03'
        },
        border: {
            color: "#000000",
            width: 1
        },
        animationDuration: 200,
        flipped: false,
        isFixedToCamera: false
    };

    return mergeObjetcs(defaultConfig, newConfig);
};

function mergeObjetcs(targetObj, newObj) {
    for (var p in newObj) {
        try {
            targetObj[p] = newObj[p].constructor==Object ? mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
        } catch(e) {
            targetObj[p] = newObj[p];
        }
    }
    return targetObj;
}

HealthBar.prototype.drawBorder = function() {
    var border = this.config.border.width * 2;

    var bmd = this.game.add.bitmapData(this.config.width + border, this.config.height + border);
    bmd.ctx.fillStyle = this.config.border.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width + border, this.config.height + border);
    bmd.ctx.stroke();
    bmd.update();

    this.borderSprite = this.game.add.sprite(this.x, this.y, bmd);
    this.borderSprite.anchor.set(0.5);
};

HealthBar.prototype.drawBackground = function() {

    var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
    bmd.ctx.fillStyle = this.config.bg.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();
    bmd.update();

    this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
    this.bgSprite.anchor.set(0.5);

    if(this.flipped){
        this.bgSprite.scale.x = -1;
    }
};

HealthBar.prototype.drawHealthBar = function() {
    var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
    bmd.ctx.fillStyle = this.config.bar.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();
    bmd.update();

    this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
    this.barSprite.anchor.y = 0.5;

    if(this.flipped){
        this.barSprite.scale.x = -1;
    }
};

HealthBar.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;

    if(this.bgSprite !== undefined && this.barSprite !== undefined && this.borderSprite !== undefined){
        this.bgSprite.position.x = x;
        this.bgSprite.position.y = y;

        this.barSprite.position.x = x - this.config.width/2;
        this.barSprite.position.y = y;

        this.borderSprite.position.x = x;
        this.borderSprite.position.y = y;
    }
};


HealthBar.prototype.setPercent = function(newValue){
    if(newValue < 0) newValue = 0;
    if(newValue > 100) newValue = 100;

    var newWidth =  (newValue * this.config.width) / 100;

    this.setWidth(newWidth);
};

/*
 Hex format, example #ad3aa3
 */
HealthBar.prototype.setBarColor = function(newColor) {
    var bmd = this.barSprite.key;
    bmd.update();

    var currentRGBColor = bmd.getPixelRGB(0, 0);
    var newRGBColor = hexToRgb(newColor);
    bmd.replaceRGB(currentRGBColor.r,
        currentRGBColor.g,
        currentRGBColor.b,
        255 ,

        newRGBColor.r,
        newRGBColor.g,
        newRGBColor.b,
        255);

};

HealthBar.prototype.setWidth = function(newWidth){
    if(this.flipped) {
        newWidth = -1 * newWidth;
    }
    this.game.add.tween(this.barSprite).to( { width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
};

HealthBar.prototype.setFixedToCamera = function(fixedToCamera) {
    this.bgSprite.fixedToCamera = fixedToCamera;
    this.barSprite.fixedToCamera = fixedToCamera;
    this.borderSprite.fixedToCamera = fixedToCamera;
};

HealthBar.prototype.setAnchor = function(xAnchor, yAnchor) {
    this.bgSprite.anchor.set(xAnchor, yAnchor);
    this.barSprite.position.x = this.bgSprite.position.x - this.config.width * this.bgSprite.anchor.x;
    this.borderSprite.anchor.set(xAnchor, yAnchor);
    this.barSprite.anchor.y = yAnchor;
    if (this.flipped){
        this.barSprite.anchor.x = 1;
        this.barSprite.position.x = this.bgSprite.position.x;
    }
};


HealthBar.prototype.setToGroup = function(group) {
    group.add(this.bgSprite);
    group.add(this.barSprite);

    this.group = group;
};

HealthBar.prototype.removeFromGroup = function() {
    this.game.world.add(this.bgSprite);
    this.game.world.add(this.barSprite);

    this.group = null;
};

HealthBar.prototype.kill = function() {
    this.bgSprite.kill();
    this.barSprite.kill();
    this.borderSprite.kill();
};

module.exports = HealthBar;