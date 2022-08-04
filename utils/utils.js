
// @ Class 
class Canvas 
{ 
    constructor(canvas, div, box ){
        this.general = canvas;
        this.div     = div;
        this.context = this.general.getContext('2d'); 
        this.mouseisover = false;
        this.mousepressed = false;
        this.hasdoubleclicked = false;
        this.box= box;
        this.focusPosition = 0;
        this.SetPositionAndDimension();
    }
    SetPosition()
    {
        this.div.style = "position:absolute; top:"+this.box.y+"px; left:"+this.box.x+"px; z-index:" + this.focusPosition; 
    }
    SetPositionAndDimension()
    {
        this.div.style = "position:absolute; top:"+this.box.y+"px; left:"+this.box.x+"px; z-index:" + this.focusPosition; 
        this.general.width = this.box.w;
        this.general.height = this.box.h;
    }
    Blank()
    {
       var _g = this.context;
        var tempstyle = 'rgb(255,255,255)';
       _g.fillStyle = 'rgb(255,255,255)'
      _g.fillRect(0,0,this.box.w, this.box.h);
        _g.fillStyle = tempstyle;
    }
    Fill()
    {
       var _g = this.context;
      _g.fillRect(0,0,this.box.w, this.box.h);
    }
}

class Vector2
{
    constructor(X=0,Y=0)
    {
        this.x = X;
        this.y = Y;
    }
}
// @ Can be usefull to detect clicking and other stuff
class Box
{
    constructor(X=0,Y=0,W=0,H=0)
    {
        this.x = X;
        this.y = Y;
        this.w = W;
        this.h = H;
    }
}

// @ String
function genrandomstring(size){
    randoms = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789                           ';
    var charactersLength = characters.length;
     for (  n = 0; n < size; n++ ) {
        randoms += characters.charAt(Math.floor(Math.random() * charactersLength));
        
     }
  
   return randoms;   
}

// @ Arithmetic

function IsMouseInsideBox(box, canvas)
{
    return mouseX-canvas.box.x > box.x && mouseX-canvas.box.x < box.x + box.w
           && mouseY-canvas.box.y > box.y  && mouseY-canvas.box.y < box.y + box.h;
}
function IsVectorInsideBox(v,b, canvas)
{
    if ( v.x >= b.x && v.x <= b.x+b.w && v.y >= b.y && v.y <= b.y+b.h) {return true;}
    return false;
}
function getAngle (x1, y1, x2, y2) {
    var Vx = Math.round(x1 - x2);
	var Vy = Math.round(y2 - y1);
	var radians = Math.atan2(Vy, Vx);
	if (radians < 0) radians += 2*Math.PI;
	var degrees = Math.round(radians*180/Math.PI);
    return degrees;
}
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
function RoundDecimalPlace(num)
{
    return Math.round(num * 100) / 100;
}
 

// @ Async logic
function wait(mili) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, mili);
  });
}

// @ Object 

function GetObjectKeyValueAtIndex(object, index)
{
     return object[Object.keys(object)[index]];
}
function GetObjectKeyAtIndex(object, index)
{
     return Object.keys(object)[index];
}

// @parsing
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

// parsing date 
function SecondsToDHMS(seconds) 
{
    
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    return dDisplay + hDisplay + mDisplay + sDisplay;

}
function GetYMDHMNFromString(s)
{
    var y, m, d, h, mn; 
    s = s.toLowerCase();
    
    // year, y, month,minute, mn, m, day, d, hour, h
    y = GetNumberBeforeToken(s, "year"); 
    if ( y == 0 ){ y= GetNumberBeforeToken(s,"y ");}
    m = GetNumberBeforeToken(s, "month"); 
    mn = GetNumberBeforeToken(s, "minute");
    if ( mn == 0 ){mn = GetNumberBeforeToken(s, "mn ");}
    if ( m == 0 ){m = GetNumberBeforeToken(s, "m ");}
    d = GetNumberBeforeToken(s, "day"); 
    if ( d == 0 ){ d= GetNumberBeforeToken(s,"d ");}
    h = GetNumberBeforeToken(s, "hour"); 
    if ( h == 0 ){h= GetNumberBeforeToken(s,"h ");}
    return new Array(y,m,d,h,mn);
   
}
function LogYMDHMN(YMDHMN)
{
    console.log(YMDHMN[0] +" Years " +YMDHMN[1]+ " Months " +YMDHMN[2]+ " Days " +YMDHMN[3]+ " Hours " +YMDHMN[4] +" Minutes " );    
}
// parsing labels
function GetNumberBeforeToken(s, token)
{
    var r = s.indexOf(token);
    if ( r > 0 )
    {
        s = s.substring(0, r);
    }
    var sp = s.split(" ");
    for ( var i = sp.length-1 ; i >=0; i-- )
    {
        if ( sp[i].length > 0 )
        {
            if ( isNumeric(sp[i])){
                return parseInt(sp[i]);
            }
            else
                return 0;
        }
    }
    return 0;
}
function GetTextInsideLabel(label, labeldeclarator, script)
{
    var result = ""; 
    // find first label line offset ... 
    var labelLine = -1;
    var i; 
    for ( i = 0 ; i < script.length; i++ )
    {
        if ( script[i].includes(label))
        {
            labelLine = i;
            break;
        }
    }
    if ( labelLine == -1 ){return "";}
    // find next label Line Offset
    var nextlabelLine = script.length  ; 
    for ( i = labelLine + 1 ; i < script.length; i++ )
    {
        if ( script[i].includes(labeldeclarator)) 
        {
            nextlabelLine = i; 
        } 
    }

    for ( i = labelLine + 1; i < nextlabelLine; i++ )
    {
        result += script[i] + "[rn]" ;
        
    }
   return result;
}

    function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
    }

//@IO
function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
      if ( input.files[0].name.endsWith(".lib")){
         readFileContent(input.files[0]).then(content => { var arg = content.split("\r\n"); LoadLibraryFromTextFile(arg);  }).catch(error => console.log(error)) 
      }
      if ( input.files[0].name.endsWith(".map")){
         readFileContent(input.files[0]).then(content => { var arg = content.split("\r\n"); LoadMapFromFile(arg); }).catch(error => console.log(error))
      }
      if ( input.files[0].name.endsWith(".tezgraph")){
         readFileContent(input.files[0]).then(content => { var arg = content.split("\r\n"); LoadProjectFromFile(arg); }).catch(error => console.log(error))
      }
      if ( input.files[0].name.endsWith(".json")){
         readFileContent(input.files[0]).then(content => { var arg = content.split("\r\n"); LoadContractABI(content); }).catch(error => console.log(error))
      }
	
  }
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}
