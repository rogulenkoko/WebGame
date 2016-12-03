var physicManager = {
    update: function(obj) {
        var newX = obj.pos_x;
        var newY = obj.pos_y;
        
        var e = this.entityAtXY(obj, newX, newY);
        if(e !== null) {
            window.location = "/fail.html";
            var record = readCookie("record");  
            var score = document.getElementById("score").innerText;
            createCookie("score",score,1);
            if(record==null || score > record) createCookie("record",score,1);
        }
        var score = this.calculateScore(newY);
        document.getElementById("score").innerText = score;
        
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
    calculateScore: function(y){
        var score = 0;
        gameManager.entities.forEach(function(element) {
            if(element.name[0]=="b" && element.pos_y<y){
                score++;
            }
        }, this);
        return score;
    }
};