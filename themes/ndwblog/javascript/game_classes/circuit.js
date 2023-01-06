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

        // road width (actually half of the road)
        this.roadWidth = 1000;
    }

    /**
     * CREATES ENVIRONMENT WITH ROAD AND OBJECTS
     */
    create(){
        // clear arrays
        this.segments = [];

        // creates a road
        this.createRoad();

    }

    /**
     * CREATE ROAD
     */
    createRoad(){
        this.createSection(10);
    }

    /**
     * CREATES ROAD SECTION
     * @param nSegments = number of segments that make up this section
     */
    createSection(nSegments){
        for (let i=0; i<nSegments; i++){
            this.createSegment();
            console.log("Created Segment", this.segments[i]);
        }
    }

    /**
     * Creates new segment
     */
    createSegment(){
        // get the current number of segments
        let n = this.segments.length;

        this.segments.push({
            index: n,

            point: {
                world: {x: 0, y: 0, z: n * this.segmentLength},
                screen: {x: 0, y: 0, w: 0},
                scale: -1
            },

            color: {road: '0x888888'}
        });
    }

    /**
     *  // projects a point from its world coords to screen coords (2d view)
     * @param point int
     */

    project2D(point){
        this.graphics.clear();

        point.screen.x = SCREEN_CX;
        point.screen.y = SCREEN_H - point.world.z;
        point.screen.w = this.roadWidth;
    }

    /**
     * Renders road (2D view)
     */

    render2D(){
        // get current and prev segments
        let currSegment = this.segments[1];
        let prevSegment = this.segments[0];

        this.project2D(currSegment.point);
        this.project2D(prevSegment.point);

        let p1 = prevSegment.point.screen;
        let p2 = currSegment.point.screen;

        this.drawSegment(
            p1.x, p1.y, p1.w,
            p2.x, p2.y, p2.w,
            currSegment.color
        )

        console.log("Prev segment screen point", p1)
        console.log("Curr segment screen point", p2)
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

