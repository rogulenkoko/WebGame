var mapManager = {
    mapData: null,
    tLayer: new Array(),
    xCount: 0,
    yCount: 0,
    tSize: {x: 0, y: 0},
    mapSize: {x: 0 , y: 0},
    tilesets: new Array(),
    imgLoadCount: 0,
    imgLoaded: false,
    jsonLoaded: false,
    view: {x: 0, y: 120, w: 1280, h: 1000},
    loadMap: function(path) {
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open("GET", path, true);
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                mapManager.parseMap(request.responseText); 
            }
        };
        request.send();
    },
    draw: function(ctx) {
        if(!mapManager.imgLoaded || !mapManager.jsonLoaded) {
            setTimeout(function() {mapManager.draw(ctx);}, 100);
        } else {
            if (this.tLayer.length === 0)
                for(var id = 0; id < this.mapData.layers.length; id++) {
                    var layer = this.mapData.layers[id];
                    if(layer.type === "tilelayer") {
                        this.tLayer.push(layer);
                    }
                }
            for(var j = 0; j < this.tLayer.length; j++) {
                for(var i = 0; i < this.tLayer[j].data.length; i++) {
                    if(this.tLayer[j].data[i] !== 0) {
                        var tile = this.getTile(this.tLayer[j].data[i]);
                        var pX = (i % this.xCount) * this.tSize.x;
                        var pY = Math.floor(i / this.xCount) * this.tSize.x-80;     
                        pX -= this.view.x;
                        pY -= this.view.y;
                        ctx.drawImage(tile.img, pX, pY, tile.tileW, tile.tileH);
                    }
                }
            }
        }
    },
    parseMap: function(tilesJSON) {
        this.mapData = JSON.parse(tilesJSON);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount * this.tSize.x;
        this.mapSize.y = this.xCount * this.tSize.y;
        for(var i = 0; i < this.mapData.tilesets.length; i++) {
            var img = new Image();
            img.onload = function() {
                mapManager.imgLoadCount++;
                if(mapManager.imgLoadCount === mapManager.mapData.tilesets.length) {
                    mapManager.imgLoaded = true; 
                }
            };
            img.src = this.mapData.tilesets[i].image;
            var t = this.mapData.tilesets[i];
            var ts = {
                firstgid: t.firstgid,
                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth / mapManager.tSize.x),
                yCount: Math.floor(t.imageheight / mapManager.tSize.y),
                tileW: t.imagewidth,
                tileH: t.imageheight
            };
            this.tilesets.push(ts);
        }
        this.jsonLoaded = true;
    },
    getTile: function(tileIndex) {
        var tile = {
            img: null,
            px: 0,
            py: 0,
            tileW: 0,
            tileH: 0,
            name: null
        };
        var tileset = this.getTileset(tileIndex);
        tile.img = tileset.image;
        tile.tileH = tileset.tileH;
        tile.tileW = tileset.tileW;
        tile.name = tileset.name;
        var id = tileIndex - tileset.firstgid;
        var x = id % tileset.xCount;
        var y = Math.floor(id / tileset.xCount);
        tile.px = x * mapManager.tSize.x;
        tile.py = y * mapManager.tSize.y;
        return tile;
        },

        getTileset: function(tileIndex) {
        for(var i = mapManager.tilesets.length - 1; i >=0; i--) {
            if(mapManager.tilesets[i].firstgid <= tileIndex) {
                return mapManager.tilesets[i];
                }
            }
        return null;
    },
    parseEntities: function() {
        if(!mapManager.imgLoaded || !mapManager.jsonLoaded) {
            setTimeout(function() {mapManager.parseEntities();}, 100);
        } else {
            for(var j = 0; j < this.mapData.layers.length; j++){
                if(this.mapData.layers[j].type === 'objectgroup') {
                var entities = this.mapData.layers[j];
                    for(var i = 0; i < entities.objects.length; i++) {
                        var e = entities.objects[i];
                        try {
                            var obj = Object.create(gameManager.factory[e.type]);
                            obj.name = e.name;
                            obj.pos_x = e.x;
                            obj.pos_y = e.y;
                            obj.size_x = e.width-35;
                            obj.size_y = e.height-30;
                            gameManager.entities.push(obj);
                            if(obj.name === "player1") gameManager.player1=obj;
                            if(obj.name === "player2") {
                                gameManager.player2=obj;
                            }

                        } catch(ex) {
                            console.log("" + e.gid + e.type + ex);
                        }
                    }
                }
            }
        }
    },
    getTilesetIdx: function(x, y) {
        var wX = x;
        var wY = y;
        var idx = Math.floor(wY / this.tSize.y) * this.xCount + Math.floor(wX / this.tSize.x);
        return this.tLayer[1].data[idx];
    },
    move: function(velocity) {
        this.view.y+=velocity;
    }
};

