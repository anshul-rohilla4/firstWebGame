//our only scene called mainScene
class mainScene{
//preload() → create() → update() → update() → update() → etc.

preload(){
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds  

    // Parameters: name of the sprite, path of the image
    //a sprite refers to a 2D image or animation that represents an object in the game
    this.load.image('player','assets/alien.svg');

    this.load.image('coin','assets/coin.jpg');
}


    create(){
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    
    // Parameters: x position, y position, name of the sprite
    this.player=this.physics.add.sprite(100,100,'player');

    this.coin=this.physics.add.sprite(300,300,'coin');

    this.player.setDisplaySize(30,30);
    this.coin.setDisplaySize(20,20);


    this.score=0;
    let style={font:'20px Arial',fill:'#fff'};
    this.scoreText=this.add.text(20,20,'score: '+this.score,style);

    this.arrow=this.input.keyboard.createCursorKeys();
}


    update(){
    // This method is called 60 times per second after create() 
    // It will handle all the game's logic, like movements

    //horizontal movements
    if(this.arrow.right.isDown){
        this.player.x+=3;
    }
    else if(this.arrow.left.isDown){
        this.player.x-=3;
    }

    //vertical movements
    if(this.arrow.down.isDown){
        this.player.y+=3;
    }
    else if(this.arrow.up.isDown){
        this.player.y-=3;
    }

    //check if the alien inside the boundary
    this.checkBounds();

    //collision hit()
    if(this.physics.overlap(this.player,this.coin)){
        this.hit();
    }
}

    checkBounds(){
        const width =this.game.config.width;
        const height=this.game.config.height;

        if(this.player.x<0){
            this.player.x=0;
        }else if(this.player.x > width){
            this.player.x=width;
        }

        if(this.player.y<0){
            this.player.y=0;
        }else if(this.player.y > height){
            this.player.y=height;
        }
    }


    hit(){
        //when alien touches coin, randomize coin
        this.coin.x=Phaser.Math.Between(100,600);
        this.coin.y=Phaser.Math.Between(100,300);

        //increase score when collision with coin
        this.score+=10;

        this.scoreText.setText('score: '+this.score);
        
        this.tweens.add({
            targets: this.player, 
            duration: 200, //for 200ms
            scaleX: 1.2, //20% increase
            scaleY: 1.2, 
            yoyo: true, //at end goes back to original scale
            onComplete:()=>{
                this.player.setDisplaySize(30,30);
            }
        });
}
}

new Phaser.Game({
    width:700,
    height:400,
    backgroundColor: '#3498db',
    scene:mainScene,
    physics:{default:'arcade'},
    parent:'game',//Create the game inside the <div id="game"> 
});
