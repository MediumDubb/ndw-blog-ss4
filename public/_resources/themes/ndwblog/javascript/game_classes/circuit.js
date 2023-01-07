class Circuit
{
    constructor(scene){
        // ref to game scene
        this.scene = scene;

        // graphics object for drawing road polygons
        this.graphics = scene.add.graphics(0, 0);

        // array of road segments
        this.segments = [];

        // single segment length
        this.segmentLength = 100;

        // total number of road segments
        this.total_segments = null;

        // number of visible segments drawn
        this.visible_segments = 200;

        // road width (actually half of the road)
        this.roadWidth = 1000;

        // total road length
        this.roadLength = 100;
    }

    /**
     * CREATES ENVIRONMENT WITH ROAD AND OBJECTS
     */
    create(){
        // clear arrays
        this.segments = [];

        // creates a road
        this.createRoad();

        // store total number of segments
        this.total_segments = this.segments.length;

        // calculate road length
        this.roadLength = this.total_segments * this.segmentLength;

    }

    /**
     * CREATE ROAD
     */
    createRoad(){
        this.createSection(1000);
    }

    /**
     * CREATES ROAD SECTION
     * @param nSegments = number of segments that make up this section
     */
    createSection(nSegments){
        for (let i=0; i<nSegments; i++){
            this.createSegment();
        }
    }

    /**
     * Creates new segment
     */
    createSegment(){
        // define colors
        const COLORS = {
            LIGHT: {road: 0xffffff, not_path: 0xffffff, ice: 0xDBF1FD},
            DARK: {road: 0xfcfcfc, not_path: 0xfcfcfc, ice: 0xDBF1FD},
        }

        // get the current number of segments
        let n = this.segments.length;

        this.segments.push({
            index: n,

            point: {
                world: {x: 0, y: 0, z: n * this.segmentLength},
                screen: {x: 0, y: 0, w: 0},
                scale: -1
            },

            color: Math.floor(n/5)%2 ? COLORS.DARK : COLORS.LIGHT
        });
    }

    /**
     * Returns a segment at given Z position
     */

    getSegment(positionZ){
        if (positionZ < 0){
            positionZ += this.roadLength;
            let index = Math.floor(positionZ / this.segmentLength) % this.total_segments;

            return this.segments[index];
        }
    }

    /**
     * Project 3D Function
     */

    project3D(point, cameraX, cameraY, cameraZ, cameraDepth){
        // Translating world coordinates to camera coordinates
        let transX = point.world.x - cameraX;
        let transY = point.world.y - cameraY;
        let transZ = point.world.z - cameraZ;

        // Scale factor based on the law of similar triangles
        point.scale = cameraDepth/transZ;

        // Projecting camera coordinates onto a normalized projection plane
        let projectedX = point.scale * transX;
        let projectedY = point.scale * transY;
        let projectedW = point.scale * this.roadWidth;

        // Scaling projected coordinates to the screen coords
        point.screen.x = Math.round((1 + projectedX) * SCREEN_CX);
        point.screen.y = Math.round((1 - projectedY) * SCREEN_CY);
        point.screen.w = Math.round(projectedW * SCREEN_CX);


    }

    /**
     * Renders road (2D view)
     */

    render3D(){
        this.graphics.clear();

        // Get the camera
        let camera = this.scene.camera;

        // get base segment
        let baseSegment = this.getSegment(camera.z);
        let baseIndex = baseSegment.index;

        for (let n=0; n<this.visible_segments; n++){
            // get the current segment
            let currIndex = (baseIndex + n) % this.total_segments;
            let currSegment = this.segments[currIndex];

            // project the segment to the screen space
            this.project3D(currSegment.point, camera.x, camera.y, camera.z, camera.distToPlane)

            if (n>0){
                let prevIndex = (currIndex>0) ? currIndex-1 : this.total_segments-1;
                let prevSegment = this.segments[prevIndex];

                let p1 = prevSegment.point.screen;
                let p2 = currSegment.point.screen;

                this.drawSegment(
                    p1.x, p1.y, p1.w,
                    p2.x, p2.y, p2.w,
                    currSegment.color
                )
            }
        }
    }

    /**
     * drawSegment Draws a segment
     * @param x1
     * @param y1
     * @param w1
     * @param x2
     * @param y2
     * @param w2
     * @param color
     */
    drawSegment(x1, y1, w1, x2, y2, w2, color){
        // draw snow
        this.graphics.fillStyle(color.not_path, 1);
        this.graphics.fillRect(0, y2, SCREEN_W, y1 - y2);
        // draw path
        this.drawPolygon(x1-w1, y1, x1+w1, y1, x2+w2, y2, x2-w2, y2, color.road);
    }

    /**
     * draw polygon Draws polygons on the screen
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param x3
     * @param y3
     * @param x4
     * @param y4
     * @param color
     */
    drawPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color){
        this.graphics.fillStyle(color, 1);
        this.graphics.beginPath();

        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.lineTo(x3, y3);
        this.graphics.lineTo(x4, y4);

        this.graphics.closePath();
        this.graphics.fill();
    }
}

