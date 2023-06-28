Status = "";
Bottle_image = "";
objects=[];
function preload(){
    Bottle_image = loadImage("Bottle.jpg");
}

function setup(){
    canvas = createCanvas(440,350);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(Bottle_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(Bottle_image,0,0,440,350);
    if (Status !="")
    {
        for(i=0;i<objects.length;i++)
    {
        document.getElementById("status").innerHTML="Status:Object Detected";
        fill("red");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+40,objects[i].y+20);
        noFill();
        stroke("red");
        rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height);
    }
}
}