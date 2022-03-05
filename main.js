
status="";
objects=[];
function preload(){
}
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects:";
}

function ModelLoaded(){
    console.log("Model Loaded");
    status=true;
    
}
function gotResult(error,result){
    if(error){
        console.error(error);

    }
        else{
            console.log(result);
            objects=result;
        }
}

function draw(){
    image(video,0,0,300,300);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
     for(i=0;i<objects.length;i++){
         document.getElementById("status").innerHTML="Status:Object Detected";
         document.getElementById("number_objects_count").innerHTML="Objects Count are:"+objects.length;
         percent=floor(objects[i].confidence*100);
         fill(r,g,b);
         text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
         noFill();
         stroke(r,g,b);
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
     }  
     
    }
}
//ends here
