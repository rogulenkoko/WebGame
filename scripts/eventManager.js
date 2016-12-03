var eventManager = {
    bind: [],
    action: [],
    setup: function(canvas) {
        this.bind[37] = 'left1';
        this.bind[39] = 'right1';
        this.bind[65] = 'left2';
        this.bind[68] = 'right2';
        document.body.addEventListener("keydown", this.onKeyDown);
    },
    onKeyDown: function(event) {
        var action = eventManager.bind[event.keyCode];
        if(action)
            eventManager.action[action] = true;
    }
}