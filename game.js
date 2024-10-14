//our only scene called mainScene
class mainScene{
//preload() → create() → update() → update() → update() → etc.

preload(){
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds  

    // Parameters: name of the sprite, path of the image
    //a sprite refers to a 2D image or animation that represents an object in the game
    this.preload.image('player','assets/alien.svg');

    this.load.image('coin','assets/coin.jpg');
}


    create(){
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    
    // Parameters: x position, y position, name of the sprite
    this.player=this.physics.add.sprite(100,100,'player');

    this.coin=this.physics.add.sprite(300,300,'coin');


}


    update(){
    // This method is called 60 times per second after create() 
    // It will handle all the game's logic, like movements

}
}

new Phaser.Game({
    width:700,
    height:400,
    backgroundColor:'#3498db',
    scene:mainScene,
    physics:{default:'arcade'},
    parent:'game',//Create the game inside the <div id="game"> 
});
