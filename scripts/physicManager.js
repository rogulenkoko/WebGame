var physicManager = {
    scoreUpAudio: new Audio("audio/success.wav"),
    update: function(obj) {
        var newX = obj.pos_x;
        var newY = obj.pos_y;
        
        var e = this.entityAtXY(obj, newX, newY);
        if(e !== null) {
            window.location = "/fail.html";
            var record = Number(readCookie("record"));  
            var score = Number(document.getElementById("score").innerText);
            createCookie("score",score,1);
            if(record==null || score > record) createCookie("record",score,1);
        }
        console.log(velocity);
        var currentScore = document.getElementById("score").innerText;
        var score = this.calculateScore(newY,currentScore);
        document.getElementById("score").innerText = score;

        if(score>=15) velocity=11;
        if(score>=35) velocity=14;
        if(score>=65) velocity=17;
        if(score>=80) velocity=20;       
    },
    entityAtXY: function(obj, x, y) {
        for(var i = 0; i < gameManager.entities.length; i++) {
            var e = gameManager.entities[i];
            if(e.name !== obj.name) {
                if(x + obj.size_x < e.pos_x || y + obj.size_y < e.pos_y
                    || x > e.pos_x + e.size_x  || y > e.pos_y + e.size_y )
                    continue;
                return e;
            }
        }
        return null;
    },
    calculateScore: function(y,currentScore){
        var score = 0;
        gameManager.entities.forEach(function(element) {
            if(element.name[0]=="b" && element.pos_y<y){
                score++;
            }
        }, this);
        if(currentScore < score) this.scoreUpAudio.play();
        return score;
    }
};