// Javascript for clock project
//alert("Hello from the javascrxipt");

var easternC = document.getElementById("eastern");
var kansasC = document.getElementById("kansas");
var beijingC = document.getElementById("beijing");
var saudiC = document.getElementById("saudi");


var eContext = easternC.getContext("2d");
var kContext = kansasC.getContext("2d");
var bContext = beijingC.getContext("2d");
var sContext = saudiC.getContext("2d");

//they all get the same radius....
var radius = easternC.height / 2;


/* this Remap the (0,0) position (of the drawing object)
to the centers of the canvases */

eContext.translate(radius, radius);
kContext.translate(radius, radius);
bContext.translate(radius, radius);
sContext.translate(radius, radius);

//shrink the clock circle a bit.
radius = radius * 0.90;


//draw all the clocks
//drawAllClocks();

setInterval(drawAllClocks, 1000);



function drawAllClocks() {
	drawClock(eContext);
	drawClock(kContext);
	drawClock(bContext);
	drawClock(sContext);
}




// This draws the basic circle of the clock
function drawClock(whichContext) {
  drawFace(whichContext);
  drawNumbers(whichContext);
  drawTime(whichContext);
}



//This draws a more complex face ...
function drawFace(whichContext) {
  var grad;  //for a gradient...

  whichContext.beginPath();
  whichContext.arc(0, 0, radius, 0, 2 * Math.PI);
  whichContext.fillStyle = 'white';
  whichContext.fill();

  grad = whichContext.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  whichContext.strokeStyle = grad;
  whichContext.lineWidth = radius*0.1;
  whichContext.stroke();

  whichContext.beginPath();
  whichContext.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  whichContext.fillStyle = '#333';
  whichContext.fill();
}



function drawNumbers(whichContext) {
  var ang;
  var num;
  whichContext.font = radius * 0.15 + "px arial";
  //whichContext.font = radius * 0.15 + "px Exo";
  whichContext.textBaseline = "middle";
  whichContext.textAlign = "center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    whichContext.rotate(ang);
    whichContext.translate(0, -radius * 0.85);
    whichContext.rotate(-ang);
    whichContext.fillText(num.toString(), 0, 0);
    whichContext.rotate(ang);
    whichContext.translate(0, radius * 0.85);
    whichContext.rotate(-ang);
  }
}


function drawTime(whichContext){
  var now = new Date();
  var hour = now.getHours();
  console.log("Hour is " + hour);
  //var AM_PM = getAM_PM(whichContext, hour);
  drawAM_PM(whichContext, hour);
  hour = adjustHours(hour, whichContext);
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));

  //drawAM_PM(whichContext, hour, AM_PM);

  drawHand(whichContext, hour, radius*0.5, radius*0.07);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(whichContext, minute, radius*0.8, radius*0.07);
  // second
  second = (second*Math.PI/30);
  drawHand(whichContext, second, radius*0.9, radius*0.02);
}

/*
function getAM_PM(whichContext, hour){
    if(whichContext == eContext) {
      console.log("Hour is " + hour + ", Eastern");
      if(hour < 12) {
        return "AM";
      } else {
        return "PM";
      }

    } else if(whichContext == kContext) {
      if(hour - 1 < 12) {
        return "AM";
      } else {
        return "PM";
      }
    

    } else if(whichContext == bContext) {
      if(hour < 12) {
        return "PM";
      } else {
        return "AM";
      }
      
      
    } else if(whichContext == sContext) {
      if((hour + 7)%24 < 12) {
        return "AM";
      } else {
        return "PM";
      }  
    }
}
*/

function drawAM_PM(whichContext, hour){

    var partOfDay;
    var theH1;
    if(whichContext == eContext) {
      if(hour < 12) {
        partOfDay = "AM";
      } else {
        partOfDay = "PM";
      }
      theH1 = document.getElementById("easternAM");
      theH1.innerHTML = partOfDay;
      return;

    } else if(whichContext == kContext) {
      if(hour - 1 < 12) {
        partOfDay = "AM";
      } else {
        partOfDay = "PM";
      }
      theH1 = document.getElementById("kansasAM");
      theH1.innerHTML = partOfDay;
      return;
    

    } else if(whichContext == bContext) {
      if(hour < 12) {
        partOfDay = "PM";
      } else {
        partOfDay = "AM";
      }
      theH1 = document.getElementById("beijingAM");
      theH1.innerHTML = partOfDay;
      return;
      
      
    } else if(whichContext == sContext) {
      if((hour + 7)%24 < 12) {
        partOfDay = "AM";
      } else {
        partOfDay = "PM";
      }  
      theH1 = document.getElementById("saudiAM");
      theH1.innerHTML = partOfDay;
      return;
    }
}

function adjustHours(hours, whichContext) {
    if(whichContext == eContext) {
    	return hours;

    } else if(whichContext == kContext) {
		return hours - 1;

  	} else if(whichContext == bContext) {
  		if(hours <= 12) {
  			return hours + 12
  		} else {
  			return hours % 12;
  		}
  		
  	} else if(whichContext == sContext) {
  		return (hours+7)%12;
  	}

}

/*
function drawAM_PM(whichContext, AM_PM ) {
  whichContext.fillStyle = 'crimson';
  whichContext.font = radius * 0.25 + "px arial";
  //whichContext.font = radius * 0.15 + "px Exo";
  whichContext.textBaseline = "middle";
  whichContext.textAlign = "center";
  var ang =  Math.PI ;
  whichContext.rotate(ang);
  whichContext.translate(0, -radius * 0.65);
  whichContext.rotate(-ang);
  whichContext.fillText(num.toString(), 0, 0);
  whichContext.rotate(ang);
  whichContext.translate(0, radius * 0.65);
  whichContext.rotate(-ang);

}
*/




function drawHand(whichContext, pos, length, width) {
  whichContext.fillStyle = '#333';
  whichContext.beginPath();
  whichContext.lineWidth = width;
  whichContext.lineCap = "round";
  whichContext.moveTo(0,0);
  whichContext.rotate(pos);
  whichContext.lineTo(0, -length);
  whichContext.stroke();
  whichContext.rotate(-pos);
}











