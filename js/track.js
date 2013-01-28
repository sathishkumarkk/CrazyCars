$(document).ready(function(){
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
/*
{
'cars': [{
        'block':5,
        'exist':true,
        'color':'yellow'
    },
    {
        'block':5,
        'exist':true,
        'color':'green'
    },
    {
        'block':5,
        'exist':true,
        'color':'orange'
    },
    {
        'block':5,
        'exist':true,
        'color':'white'
    },
    {
        'block':5,
        'exist':true,
        'color':'grey'
    },
    {
        'block':5,
        'exist':true,
        'color':'pink'
    }]

}
*/

    
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
            elementArray.push(Paper.rect(cx,cy,10,10).attr({'fill':options.cars[i].color}));


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



    for(var i=0;i<path.grid.length;i++)
    {
    var a = new RoadPatch();
    init(a,Paper,path.grid[i]);
    }
});
