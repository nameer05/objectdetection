var status="";

object=[];

function setup(){
  canvas= createCanvas(380,380);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  
}

function start(){
  objectDetector=ml5.objectDetector("cocossd",modelLoaded);
  document.getElementById("status").innerHTML="status: detecting objects";
  object_name=document.getElementById("object_name").value
}

function preload(){
    
}

function draw(){
    image(video,0,0,380,380)
    if(status !=""){
      objectDetector.detect(video,gotResults);
      
      for (i=0;i<object.length;i++){
        document.getElementById("status"). innerHTML="status: objects detected"
        
        fill("red")
        percent=floor(object[i].confidence*100)
        
        text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15)
        noFill();
        stroke("red")
        rect(object[i].x,object[i].y,object[i].width,object[i].height)
        if(object[i].label == object_name) {
           video.stop();
            objectDetector.detect(gotResults);
             document.getElementById("object_status").innerHTML = object_name + " Found";
              synth = window.speechSynthesis;
               utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis); 
              } else 
              { 
                document.getElementById("object_status").innerHTML = object_name + " Not Found";
               }
      }
    }
}

function modelLoaded(){
  console.log("model loaded");
  status=true;
  

}

function gotResults(error,results){
  if(error){
    console.log(error)
  }
  console.log(results)
  object=results;
}

