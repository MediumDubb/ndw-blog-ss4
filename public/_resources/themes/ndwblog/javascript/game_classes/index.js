/************************************************************************************
* Pseudo-3D Skiing Game
*
* @author Noah Whittington
* @copyright 2021 NDWCodes LTD
* @website http://ndwcodes.com*
/************************************************************************************/

//************************************************************************************
// GLOBAL CONSTANTS
//************************************************************************************

// Screen Size
const SCREEN_W = 1920;
const SCREEN_H =1080;

// CENTER SCREEN CORDS
const SCREEN_CX = SCREEN_W / 2;
const SCREEN_CY = SCREEN_H / 2;

// GAME STATES
const STATE_INIT = 1;
const STATE_RESTART = 2;
const STATE_PLAY = 3;
const STATE_GAMEOVER = 4;

//************************************************************************************
// GLOBAL VARS
//************************************************************************************

// CURRENT STATE
let state = STATE_INIT;

// PATH TO ASSETS
const game_assets = "/_resources/themes/ndwblog/images/game_assets"

//************************************************************************************
// MAIN SCENE
//************************************************************************************

class MainScene extends Phaser.Scene
{
    constructor() {
        super({key: 'SceneMain'});
    }

    // LOAD ASSETS
    preload(){
        //background path
        this.load.image('imgBack', game_assets + '/snowmountains.png');
    }

    // CREATE ASSETS
    create(){
        //background img
        this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, 'imgBack');

        // initiate Settings class
        this.settings = new Settings(this);
        this.circuit = new Circuit(this);

        // listen for pause
        this.input.keyboard.on('keydown-P', function (){
            this.settings.txtPause.text = "[P] Resume";
            this.scene.pause();
            this.scene.launch('ScenePause');
        }, this);

        // listener on resume event
        this.events.on('resume', function(){
           this.settings.show();
        }, this);


    }

    // MAIN GAME LOOP
    update(time, delta){
        switch (state){
            case STATE_INIT:
                console.log('Initialize Game.');
                state = STATE_RESTART;
                break;

            case STATE_RESTART:
                console.log('Restart Game.');

                this.circuit.create();

                state = STATE_PLAY;
                break;

            case STATE_PLAY:
                console.log('Playing Game.');

                this.circuit.render2D();

                state = STATE_GAMEOVER;
                break;

            case STATE_GAMEOVER:
                console.log('Game Over!');
                break;
        }
    }
}

//************************************************************************************
// PAUSE SCENE
//************************************************************************************

class Pause extends Phaser.Scene
{
    constructor() {
        super({key: 'ScenePause'});
    }

    create(){
        // listen for resume
        this.input.keyboard.on('keydown-P', function(){
            this.scene.resume('SceneMain');
            this.scene.stop();
        }, this)
    }
}


//************************************************************************************
// INIT PHASER
//************************************************************************************

const config = {
    type: Phaser.AUTO,
    width: SCREEN_W,
    height: SCREEN_H,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    scene: [MainScene, Pause]
}

const game = new Phaser.Game(config);

