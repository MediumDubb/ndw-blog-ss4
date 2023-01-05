class Circuit
{
    construct(scene){
        // ref to game scene
        this.scene = scene;

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
    }
}
