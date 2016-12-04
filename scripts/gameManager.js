var gameManager = {
    factory: {},
    entities: [],
    player1: null,
    player2: null,
    loadAll: function() {
        mapManager.loadMap("map/map.json");
        spriteManager.loadAtlas("map/sprites.json", "map/spritesheet.png");
        gameManager.factory['Player1'] = Player1;
        gameManager.factory['Player2'] = Player2;
        gameManager.factory['BarrierL'] = BarrierL;
        gameManager.factory['BarrierR'] = BarrierR;
        mapManager.parseEntities();
        mapManager.draw(ctx);
        eventManager.setup(canvas);
    },
    play: function(){
        setInterval(updateWorld, 50);
    },
    update: function() {
        checkEvent();
        this.entities.forEach(function(e) {
            try{
                e.update();
            } catch(ex){
            }
        });
        mapManager.draw(ctx);

        mapManager.move(velocity);
        if(this.player2!=null) this.player2.pos_y+=velocity;
        if(this.player2!=null) this.player1.pos_y+=velocity;

        this.draw(ctx);
    },
    draw: function(ctx) {
        for(var e = 0; e < this.entities.length; e++)
            this.entities[e].draw(ctx);
    }
};

function updateWorld(){
    ctx.clearRect(0,0,900,7000);
    gameManager.update();
}

function checkEvent(){
    if(eventManager.action["left1"]){
        if(gameManager.player1.pos_x == 674){
            var timer1 = setInterval(()=>{
                gameManager.player1.pos_x-=2;
                if(gameManager.player1.pos_x == 446) clearInterval(timer1);
            },2)
        }
        eventManager.action["left1"]=false;
    }

    if(eventManager.action["right1"]){
        if(gameManager.player1.pos_x == 446){
            var timer1 = setInterval(()=>{
                gameManager.player1.pos_x+=2;
                if(gameManager.player1.pos_x == 674) clearInterval(timer1);
            },2)
        }
        eventManager.action["right1"]=false;
    }

    if(eventManager.action["left2"]){
        if(gameManager.player2.pos_x == 296){
            var timer1 = setInterval(()=>{
                gameManager.player2.pos_x-=2;
                if(gameManager.player2.pos_x == 60) clearInterval(timer1);
            },2)
        }
        eventManager.action["left2"]=false;
    }

    if(eventManager.action["right2"]){
        if(gameManager.player2.pos_x == 60){
            var timer2 = setInterval(()=>{
                gameManager.player2.pos_x+=2;
                if(gameManager.player2.pos_x == 296) clearInterval(timer2);
            },2)
        }
        eventManager.action["right2"]=false;
    }
}

function loadAudio(){
    var mainAudio = new Audio("audio/play2.wav");
    mainAudio.autoplay = true;
    mainAudio.loop = true;
}

var velocity = 10;
var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d"); 
//loadAudio();
gameManager.loadAll();
gameManager.play();
