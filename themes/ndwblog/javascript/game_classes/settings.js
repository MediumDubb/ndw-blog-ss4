class Settings
{
    constructor(scene) {
        // refer to game scene
        this.scene = scene;

        const font = {font: '32px Arial', fill: '#000000'};
        this.txtPause = scene.add.text(1720, 5, '', font);

        this.show();
    }

    /**
     * SHOW ALL SETTINGS
     */

    show(){
        this.txtPause.text = "[P] Pause";
    }

}
