$(document).ready(function(){
  
var firstLine = '';
var secondLine = '';
var result = 0;
var startWithZero = /^0+/;
var ifDecimalIncluded = /\./;
var numberSpaceOnlyReg = /^(\s*|\d+|(\d+\.\d*))$/;
var shouldOperation = /\d+$/;
var shouldDecimal =/\d+$/;
var shouldNotDecimal= /\.\d+$/
var ifResult = /\=\-*(\d+|\d+\.\d+)$/;
var ifDecimal = /\d+\.\d+$/;
var ceRegEx = /(\d+|[\+\-\*\/]|\d+\.\d+|\d+\.)$/;
var endWithOperator = /[\+\-\*\/]$/;
var equalable = /^\D*\d+((\D\d+)*\D)\d+$/;
var getLastSubStr = /\d+$/;
var endWithNum = /\D*\d+$/;
var onlyNum = /[\+\-\*\/]/
var displayFirst =  $('#firstline');
var displaySecond =  $('#secondline');

// .attr('name'));
var checkSpace = function(){
  var firstWidth = displayFirst.width();
  var secondWidth = displaySecond.width();
  var widthMax = 236;

  //max is reached,set to zero
  if (firstWidth >=236 || secondWidth >= 236){
    update('0','max length met');
    firstLine = secondLine = '';
  }
}

var update = function(first,second){
   displayFirst.text(first);
    displaySecond.text(second);
}

//when number pad is click
$('.number').on('click',function(){
   //case when last symbol is '='
  if(ifResult.test(secondLine)){
    firstLine = $(this).attr('name');
     secondLine = $(this).attr('name');
    update(firstLine,secondLine);
    return;
  }
  //case when user enter numbers repetitively
   if(numberSpaceOnlyReg.test(firstLine)){
   //check the edge case if start with number '0'
     if (startWithZero.test(firstLine)&&!ifDecimalIncluded.test(firstLine)){
       if (secondLine =='0'){
         firstLine = secondLine = '';
         return;
       }
       firstLine = $(this).attr('name');
        secondLine = secondLine.replace(ceRegEx,firstLine) == '' ?'0':secondLine.replace(ceRegEx,firstLine);
       update(firstLine,secondLine);
        checkSpace();
       return;
     }
    
     firstLine += $(this).attr('name');
     secondLine += $(this).attr('name');
     update(firstLine,secondLine);
     checkSpace();
     return;
   }
  //case when last input is operators
  if(endWithOperator.test(secondLine)){
     firstLine = $(this).attr('name');
     secondLine += $(this).attr('name');
     update(firstLine,secondLine);
     checkSpace();
    return;
   }
  
})

//when AC(all clear ) is clicked

$('#AC').on('click',function(){
  //clear everything
   update('0','0');
    firstLine = secondLine = '';
})

//when operator is clicked

$('.operator').on('click',function(){
   //new operation after getting results;
  
  if(ifResult.test(secondLine)){
    firstLine = $(this).text();
     secondLine = result + $(this).attr('name');
    update(firstLine,secondLine);
    return;
  }
  
  //do something when the last digit of second line is an operator
  if (shouldOperation .test(secondLine)){
    firstLine = $(this).text();
    secondLine += $(this).attr('name');
    update(firstLine,secondLine)
  }
})

//when the "=" operator is click;
$('.equal').on('click',function(){

 if(equalable.test(secondLine)){
  result = ifDecimal.test(eval(secondLine))? eval(secondLine).toFixed(2):eval(secondLine);
   firstLine = result;
   secondLine += '=' + result;
   update(firstLine,secondLine);
    checkSpace();
 }
})

//when . is clicked
$('#last').on('click',function(){
  //if result
   if(ifResult.test(secondLine)){
    firstLine = secondLine = '0.';
     update(firstLine,secondLine);
     return;
  }
  
  if((shouldDecimal.test(secondLine)&&!shouldNotDecimal.test(secondLine))||secondLine==''){
    firstLine = firstLine == ''? '0.':firstLine+='.';
    secondLine = secondLine == ''? '0.':secondLine+='.';
    update(firstLine,secondLine);
  }
})

// When CE button is clicked, clear the last entry only

$('#CE').on('click',function(){
  //if only num no operator clear all
  
   if(!onlyNum.test(secondLine)){
  update('0','0');
    firstLine = secondLine = '';
     return;
  }
  
  //check if result
   if(ifResult.test(secondLine)){
    update('0','0');
    firstLine = secondLine = '';
     return;
  }
  
  //clear last entry only
    secondLine = secondLine.replace(ceRegEx,'') == '' ?'0':secondLine.replace(ceRegEx,'');
  
  firstLine = '';
update('0',secondLine);
  if (secondLine == '0'){
  //clear all lines
   firstLine = secondLine = '';
    return;
  }
  
  //if end with num after replace
  if(endWithNum.test(secondLine)){
    firstLine = getLastSubStr.exec(secondLine);
    update('0',secondLine);
    return;
  }
 })


})

