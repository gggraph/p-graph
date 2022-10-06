// @ Contract Reading stuff 
function StorageValueToNumber(storagevalue)
{
    return storagevalue.toNumber();
}
function StorageValueToMutez(storagevalue)
{
    return storagevalue.toNumber();
}
function StorageValueToTez(storagevalue)
{
    return MutezToTez(storagevalue.toNumber());
}
function MutezToTez(mutez)
{
    return mutez / 1000000;
}
function TezToMutez(mutez)
{
    return mutez * 1000000;
}
// @ hash playing
function HexToASCII(s)
{
	var hex  = s.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}
function HexToDec(s)
{
	return parseInt(s, 16);
}
function HashToDecimal8(hashstring)
{
    var str = HexToASCII(hashstring);
    var result = new Array();
    var i;
    for (i = 0 ; i < 32; i+= 4)
    {
        var integer =  ( str.charCodeAt(i) << 24 )
           + ( str.charCodeAt(i+1) << 16 )
           + ( str.charCodeAt(i+2) << 8 )
           + ( str.charCodeAt(i+3) );
        if ( isNaN(integer))
            integer =0;
        result.push(integer);
    }
    return result;
}
function SHA2Binary(hashstring)
{
    /*
    byte[] bytes = new byte[32];
        for (int i = 0; i < 64; i += 2)
            bytes[i / 2] = Convert.ToByte(hexstr.Substring(i, 2), 16);
        return bytes;
    */
    if ( hashstring.indexOf("0x") == 0 )
    {
        hashstring = hashstring.substr(2,hashstring.length-2);
    }
    var r = new Array();
    for (var i = 0; i < 64; i += 2)
    {
        r.push(HexToDec(hashstring.substr(i,2)));
    }
    return r;
  
}
function HashToDecimal32(hashstring)
{
    var str = HexToASCII(hashstring);
    var result = new Array();
    var i;
    for (i = 0 ; i < 32; i++)
    {
        if ( isNaN(str.charCodeAt(i)))
              result.push(0);
        else
            result.push(str.charCodeAt(i));
    }
    return result;
}

function LerpHash(hashstring)
{
    if ( Network == Tezos)
        return LerpB58Hash(hashstring);
    return 0;
}



var B58Map = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function LerpB58Hash(hashstring)
{
    var i;
    var max = 2907; // 57*51
    var v = 0;
    for (i=0;i<hashstring.length;i++)
        v+= B58Map.indexOf(hashstring[i]);
    return v/max;
}

function HashMux32(hashstring)
{
    if ( Network == Tezos)
        return B58mux32(hashstring);
    return 0;
}

function B58mux32(hashstring)
{
    // return a value between 0 & 255 in 32 output 
    // hash length is 51 -> run on all 51 char 
    var r = new Array();
    // getval first 32 char 
    var i;
    for (i=0;i<32;i++)
        r.push(B58Map.indexOf(hashstring[i]));
    // roll last 19 char
    var roll = 0;
    for (i=32; i < 51; i++)
    {
        var val = Math.round((B58Map.indexOf(hashstring[i])+r[roll])/2);
        r[roll]=val;
        roll++; 
    }
    // adjust value between 0 to 255
    var prct = 255/57;
    for (i=0;i<32;i++)
    {
        r[0] = Math.round(r[0]*prct); 
    }
    return r; 
}


function WeiToEther(val)
{
     return Web3.utils.fromWei(val.toString(), 'ether')
}

function EtherToWei(val)
{
    return Web3.utils.toWei(val.toString(), 'ether');
}

function GweiToWei(val)
{
  
   return Web3.utils.toWei(val.toString(), 'gwei')
}
function GweiToWei_Math(value)
{
    parseInt(value);
    return value * 1000000000;
}

function GasToEther(val)
{
    var w = GweiToWei(1); 
    w = WeiToEther(w);
    w = parseFloat(w);
    w *= parseFloat(val); 
    return w;
    
}
function EtherToDollar(val)
{
    val = parseFloat(val); 
    return val * parseFloat(DollarForOneEther);
}
function EtherToEuro(val)
{
    val = parseFloat(val); 
    return val * parseFloat(EuroForOneEther);
}
var DollarForOneEther;
var EuroForOneEther;

async function RequestEtherToRealMoney()
{
    const Http = new XMLHttpRequest();
    const rq = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";
    Http.open("GET", rq);
    Http.send();
    Http.onreadystatechange = (e) => {
        var rsp = Http.responseText;
        if ( rsp.length > 0 )
        {
            var json = JSON.parse(Http.responseText);
            DollarForOneEther = parseFloat(json.USD); 
            EuroForOneEther = parseFloat(json.EUR);
        }
       
    }
}
function GetInputStringToWei(rawinput)
{
    rawinput = rawinput.toLowerCase();
    var nPrice = 0;
    if (rawinput.includes("ether"))
    {
        rawinput = rawinput.replace("ether","");
        rawinput = rawinput.replaceAll(" ","");
        nPrice = Web3.utils.toWei(rawinput, 'ether');
    }
    else if (rawinput.includes("eth"))
    {
        rawinput = rawinput.replace("eth","");
        rawinput = rawinput.replaceAll(" ","");
        nPrice = Web3.utils.toWei(rawinput, 'ether');
    }
    else if (rawinput.includes("gwei"))
    {
        rawinput = rawinput.replace("gwei","");
        rawinput = rawinput.replaceAll(" ","");
        nPrice = Web3.utils.toWei(rawinput, 'gwei');
    }
    else if ( rawinput.includes("wei"))
    {
        rawinput = rawinput.replace("wei","");
        rawinput = rawinput.replaceAll(" ","");
        nPrice = parseInt(rawinput);
    }
    return nPrice;
}