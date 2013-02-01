$(document).ready(function(){
    
    //try using require js in order to remove this kind of path directive or make some code that can generate the same.
    var path={
    grid:[
    //1st Row
    {'x':0,'y':0},
    {'x':100,'y':0},
    {'x':200,'y':0},
    {'x':300,'y':0},
    {'x':400,'y':0},
    {'x':500,'y':0},
    {'x':600,'y':0},
    {'x':700,'y':0},
    {'x':800,'y':0},
    {'x':900,'y':0},
    //2nd Row
    {'x':900,'y':120},
    {'x':800,'y':120},
    {'x':700,'y':120},
    {'x':600,'y':120},
    {'x':500,'y':120},
    {'x':400,'y':120},
    {'x':300,'y':120},
    {'x':200,'y':120},
    {'x':100,'y':120},
    {'x':0,'y':120},
    //3rd Row
    {'x':0,'y':240},
    {'x':100,'y':240},
    {'x':200,'y':240},
    {'x':300,'y':240},
    {'x':400,'y':240},
    {'x':500,'y':240},
    {'x':600,'y':240},
    {'x':700,'y':240},
    {'x':800,'y':240},
    {'x':900,'y':240},
    //4th Row
    {'x':900,'y':360},
    {'x':800,'y':360},
    {'x':700,'y':360},
    {'x':600,'y':360},
    {'x':500,'y':360},
    {'x':400,'y':360},
    {'x':300,'y':360},
    {'x':200,'y':360},
    {'x':100,'y':360},
    {'x':0,'y':360},
    //5th Row

    {'x':0,'y':480},
    {'x':100,'y':480},
    {'x':200,'y':480},
    {'x':300,'y':480},
    {'x':400,'y':480},
    {'x':500,'y':480},
    {'x':600,'y':480},
    {'x':700,'y':480},
    {'x':800,'y':480},
    {'x':900,'y':480}]
};


    
var Paper = new Raphael('canvas',1000,760);

var elementArray=[];

//Global function to update the car location
CarLocation=function(options){
    for (var i = elementArray.length - 1; i >= 0; i--) {
        elementArray[i].remove();
    };
    for (var i = 0;i<options.cars.length;i++) {
        if(options.cars[i].exist)
        {
            block=options.cars[i].block-1;//Since We are referring to an array and count starts from 0
            var cx=path.grid[block].x+Math.round(Math.random()*80);
            var cy=10+path.grid[block].y+Math.round(Math.random()*80);
            elementArray.push(Paper.image(options.cars[i].src, cx,cy,60,30));


        }
    };

}



//RoadPatch Class that handles most of the functions as well as the Object specific code
var RoadPatch=function(){};
RoadPatch.prototype.settings={
                            'sidewalkWidth': 10,
                            'sidewalkLength': 100,
                            'sidewalkColor': 'brown',
                            'RoadPatchWidth': 100,
                            'RoadPatchLength': 100,
                            'RoadPatchColor': 'black',
                            'roadStripLength': 40,
                            'roadStripWidth': 10,
                            'roadStripColor': '#FFFFFF'
                            };
RoadPatch.prototype.getSettings=function(){return this.settings;};


var upperStrip=function(RoadPatch,Paper,grid){
    //Upper Strip Sidewalk
    Paper.rect(grid.x,grid.y,RoadPatch.getSettings().sidewalkLength,RoadPatch.getSettings().sidewalkWidth).attr({
        'fill':RoadPatch.getSettings().sidewalkColor
    });
}

var lowerStrip=function(RoadPatch,Paper,grid){
    //Lower Strip Sidewalk
    Paper.rect(grid.x,grid.y+RoadPatch.getSettings().sidewalkWidth+RoadPatch.getSettings().RoadPatchWidth,RoadPatch.getSettings().sidewalkLength,RoadPatch.getSettings().sidewalkWidth).attr({
        'fill':RoadPatch.getSettings().sidewalkColor
    });
};

//Generates the Strips on the Road
var stripBuilder=function(RoadPatch,Paper,grid){
                    return Paper.rect((0.2*RoadPatch.getSettings().RoadPatchLength)+grid.x, (0.4*RoadPatch.getSettings().RoadPatchWidth)+grid.y+RoadPatch.getSettings().sidewalkWidth, RoadPatch.getSettings().roadStripLength, RoadPatch.getSettings().roadStripWidth).attr({
                                    'fill': 'white'
                                });
 
                           };
//Generated the Road
var roadBuilder=function(RoadPatch,Paper,grid){
                    return Paper.rect(grid.x,grid.y+RoadPatch.getSettings().sidewalkWidth, RoadPatch.getSettings().RoadPatchLength, RoadPatch.getSettings().RoadPatchWidth).attr({
                            'fill': '#3D6E99',
                            'stroke': '#3D6E99'
                        });
                       
                    };
//Initialization of the Road
var init=function(RoadPatch,Paper,grid){
                roadBuilder(RoadPatch,Paper,grid);
                stripBuilder(RoadPatch,Paper,grid);
                upperStrip(RoadPatch,Paper,grid);
                lowerStrip(RoadPatch,Paper,grid);
}





//Bootstrap the game using this set of code
    
    
    
    
    
    /*API Preperation using the Factory Pattern and Modularization
      In this approach we have one Global Variable called UB alias
      The Urban Traveller and most of the thigs would be handled
      by this global variable. I have to modularize the code for 
      the UI.
    */
    UB={
        //To initialise or Bootstrap the Game.
        init:function(){
            for(var i=0;i<path.grid.length;i++)
            {
                var a = new RoadPatch();
                init(a,Paper,path.grid[i]);
            }
            
                        },
        
        /*
        This is used in order to call the signal object on certain block.
        The signal state should be maintained by usage of a queue and should be updated
        */
        setSignal:function(signalId,signalType){},
        
        /*This is used in order to unset the signal of a specific space and should be called when its required to be updated*/
        unsetSignal:function(){},
        
        /*This would return a boolean value stating whether a specific signal is updated in a certain area*/
        getSignal:function(){},
        
        /*
        This would be there as an observer in order to maintain the fresh score from all the respective units.
        This would serve to update the score of a specific user whereas all the other scores would be taken care
        of from the front end.
        */
        refreshScore:function(){},
        
        /*Get the location of a specific player. This would enable us to get value of any specific player at any point of time*/
        getLocation:function(){},
        
        /*
        This would return all the possible values with respect to the board. Coule be consumed with AJAX or websocket 
        ... not sure about websocket but surely by AJAX. This would return all the realtime values.    
        */
        getAllData:function(){}
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});
