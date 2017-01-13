var urlencode = require('urlencode');
var regx = require('verbal-expressions');

var injectionAlert = false;
var IsInjected= function()
{
    return injectionAlert;
}
var controlData =function(data)
{
    var querystring= urlencode.decode(data, "utf8");
    querystring= querystring.split("+").join(' ');
    console.log(decodeURI(querystring)); 

//    var tester= regx()  
//     .startOfLine()
//     .maybe('select')
//     .then('--')
//     .maybe('\'1=')
//     .endOfLine();

    var d1 = regx()
            .then("'") 
            .maybe(' or ');

    var d2 = regx()
            .then("'") 
            .maybe(' and ')

    var d3 = regx() 
            .then("'")
            .maybe('=');
  
    var d4 = regx()
           .maybe('--')
           .then('select ');
    
    var d6 = regx()
             .maybe("'") 
           .then('union ');
         
    var d7 = regx()
           .maybe('--')
           .then('union ');

    var d8 = regx()
        .maybe("'")
        .then('select ');
    
    var d9 = regx()
      .maybe("'") 
    .then('delete ');    

    var d10 = regx()
    .maybe("'")
    .then('update ');   

    var d10 = regx()
    .maybe("'")
    .then('insert ');   

     var d11 = regx()
    .maybe("or ")
    .then(' 1=1--');  

    var d12 = regx()
    .maybe("\x27\x4F\x52")
    .then('select ');

    var d13 = regx()
    .maybe("\x27\x6F\x72")
    .then('select ');
     var ts=querystring.toLowerCase();

    regExTest(d1,ts);
    regExTest(d2,ts);
    regExTest(d3,ts);    
    regExTest(d4,ts);
   // rTest(d5,ts);
    regExTest(d6,ts); 
    regExTest(d7,ts);
    regExTest(d8,ts);
    regExTest(d9,ts); 
    regExTest(d10,ts);
    regExTest(d11,ts);
    regExTest(d12,ts); 
    regExTest(d13,ts);
    // rTest(d14,ts);
    // rTest(d15,ts);  
} 


var regExTest =function (pattern,injectionString)
{
    if(pattern.test(injectionString))
    {
       injectionAlert=true;  
       console.log("Yakalandı! >>>>>>"+ injectionString);
    }
}


module.exports = function()
{
    return {
            rTest: regExTest,
            controlData : controlData,
            injectionAlert : injectionAlert,
            IsInjected :IsInjected
    }
}