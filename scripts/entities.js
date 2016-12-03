var Entity = {
    pos_x: 0,
    pos_y: 0,
    size_x: 0,
    size_y: 0,
    touch: false,
    extend: function(extendProto) {
        var object = Object.create(this);
        for(var property in extendProto) {
            if(this.hasOwnProperty(property) || typeof object[property] === 'undefined') {
                object[property] = extendProto[property];
            }
        }
        return object;
    }
};

var Player = Entity.extend({
    score: 0,
    move_x: 0, 
    move_y: 0,
    speed: 20,
    win: false,
    draw: function(ctx) {
        spriteManager.drawSprite(ctx, "ball", this.pos_x, this.pos_y);
    },
    update: function() {
        physicManager.update(this);
    },
    onTouchEntity: function(obj) {
        
    }
});

var Player1 = Player.extend();
var Player2 = Player.extend();


var BarrierL = Entity.extend({
    draw: function(ctx) {
        spriteManager.drawSprite(ctx, "barierL", this.pos_x, this.pos_y);
    }
});

var BarrierR = Entity.extend({
    draw: function(ctx) {
        spriteManager.drawSprite(ctx, "barierR", this.pos_x, this.pos_y);
    }
});


