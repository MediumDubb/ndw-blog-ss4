class Camera
{
    constructor(scene) {
        // reference to the main scene
        this.scene = scene;

        // Cam world coords
        this.x = 0;
        this.y = 1000;
        this.z = 0;

        // Z-distance between camera and player
        this.distToPlayer = 500;

        // Z-distance between camera and normalized projection plane
        this.distToPlane = null;
    }

    /**
     * Init camera (must be called when initializing game or changing settings)
     */
    init(){
        this.distToPlane = 1 / (this.y / this.distToPlayer);
    }

    /**
     * Update camera position
     */
    update(){
        // Place camera behind player at desired distance
        this.z = -this.distToPlayer;
    }
}
