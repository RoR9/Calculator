const numbers=document.querySelectorAll(".numbers")
const operations=document.querySelectorAll(".operations")
const zero=document.querySelector(".zero")
const point=document.querySelector(".point")
const c=document.querySelector(".c")
const equal=document.querySelector(".equal")
const random=document.querySelector(".random")
const resultDisplay=document.querySelector(".result_display")
const signChange=document.querySelector(".sign_change")
const precent=document.querySelector(".precent")
const btnDelete=document.querySelector(".delete_character")
const errorBtns=document.querySelectorAll(".d_btn")
console.log(errorBtns)

let firstNum
let secondNum
let operator

precent.addEventListener("click",calcPrecent)
signChange.addEventListener("click",changeSign)

function calcPrecent(){
    resultDisplay.innerHTML=resultDisplay.innerHTML/100
}

function changeSign(){
    resultDisplay.innerHTML=-resultDisplay.innerHTML
}

point.addEventListener("click",addPoint)
function addPoint(){
    if(resultDisplay.innerHTML==="0" &&resultDisplay.innerHTML.indexOf(".")==-1){
        return resultDisplay.innerHTML+="."
    }
    if(resultDisplay.innerHTML.indexOf(".")==-1){
    return resultDisplay.innerHTML+="."
          }
    
}
btnDelete.addEventListener("click",deleteChar)

function deleteChar(){
    if(resultDisplay.innerHTML.length===1){
        resultDisplay.innerHTML=0
        return
       }
    
      return resultDisplay.innerHTML=resultDisplay.innerHTML.slice(0,resultDisplay.innerHTML.length-1)
}












equal.addEventListener("click",sum)

c.addEventListener("click",clear)
function clear(){
    resultDisplay.textContent="0"
    firstNum=""
    secondNum=""
    operations.forEach(operation=>operation.classList.remove("selected"))
    equal.classList.remove("equal_d")
    errorBtns.forEach(errorBtn=>errorBtn.disabled=false)
}





function sum(){
    if(!firstNum || !secondNum){
        return
    }
    let result
    operations.forEach(operation=>operation.classList.remove("selected"))
    secondNum=resultDisplay.textContent
    equal.classList.add("equal_d")
    //if first and second and no operator
    //return second=first
    if(firstNum && secondNum && !operator){
        firstNum=secondNum
        secondNum=""
        return setTimeout(function(){
            equal.classList.remove("equal_d")
        },250)
    }
    if(operator==="/" && secondNum==="0"){
        clear()
        errorBtns.forEach(errorBtn=>errorBtn.disabled=true)
        return resultDisplay.textContent="Error"
    }
    switch(operator){
    case "+":result=(Number(firstNum)+Number(secondNum));break;
    case "/":result=(Number(firstNum)/Number(secondNum));break;
    case "x":result=(Number(firstNum)*Number(secondNum)) ;break;
    case "-":result=(Number(firstNum)-Number(secondNum));break;
    }
    
    if(String(result).indexOf(".")>-1){
        let number=(parseFloat(result).toPrecision(12))
        while(number.lastIndexOf(0)===number.length-1){number=number.replace(/0$/,"")}
        resultDisplay.innerHTML=number

    }
    else{
        resultDisplay.innerHTML=result
    }
    
    
    
    secondNum=""
    console.log(secondNum)
    operator=""
    firstNum=resultDisplay.textContent
    console.log(firstNum)
    equal.classList.add("remover")
    setTimeout(function(){
        equal.classList.remove("equal_d")
    },250)
   return
    
}

window.addEventListener("keydown",function(e){
    
   if(e.key==="c"){
       return clear()
   }
   else if(e.key==="Backspace"){
      deleteChar()
   }
   else if(e.key==="."){
       return addPoint()
   }
    else if((e.key)==="=" ||(e.key)==="Enter"){
     
      return sum(equal)
    }
    else if((e.key)==="/"){
     
    const oper=document.querySelector(".divide");
    console.log(oper)
    return identifyOperator(oper)
      }
    else if([187,189,191,221].indexOf(e.keyCode)>-1){
    const oper=document.querySelector(`button[data-key="${e.keyCode}"]`);
    console.log(oper)
    return identifyOperator(oper)
    
    }

   const num=document.querySelector(`button[data-key="${e.keyCode}"]`);
   display(num)
   
})


numbers.forEach(num=>num.addEventListener("click",function(e){
    
    const num=e.target
    display(num)
}))
    
function display (num){
    if(!num){
       return
    }

   

    num.classList.add("clicked")
    setTimeout(function(){
        num.classList.remove("clicked")
    },150)

   if(equal.classList.contains("remover")){
    resultDisplay.innerHTML=""
    resultDisplay.innerHTML+=num.value
    secondNum=resultDisplay.innerHTML
    equal.classList.remove("remover")
    return
   }
   if(resultDisplay.innerHTML==0){
       if(resultDisplay.innerHTML==="0."){
        return resultDisplay.innerHTML+=num.value
       }
       resultDisplay.innerHTML=""
       resultDisplay.innerHTML+=num.value
       return
    
}
if(resultDisplay.innerHTML==="Error"){
    errorBtns.forEach(errorBtn=>errorBtn.disabled=false)
    console.log("enable")
    resultDisplay.innerHTML=""
    resultDisplay.innerHTML+=num.value
    return
   
}
   

    if(equal.classList.contains("equal_d")){
        equal.classList.remove("equal_d")
    }
    if(firstNum){
        resultDisplay.innerHTML+=num.value
        secondNum=resultDisplay.innerHTML
        console.log(secondNum)
        return
    }

    
    
    

   resultDisplay.innerHTML+=num.value
   
    
}





 operations.forEach(operation=>operation.addEventListener("click",function(e){
     const oper=e.target
     operations.forEach(operation=>operation.classList.remove("selected"))
     e.target.classList.add("selected")
     identifyOperator(oper)
 }))

 

 function identifyOperator(oper){
    if(equal.classList.contains("equal_d")){
        equal.classList.remove("equal_d")
    }
    

    if(firstNum && secondNum){
        operations.forEach(operation=>operation.classList.remove("selected"))
        sum()
    }

    equal.classList.add("remover")
    firstNum=resultDisplay.textContent
    operations.forEach(operation=>operation.classList.remove("selected"))
    oper.classList.add("selected")
    console.log(firstNum)
    switch(oper.value){
    case "+":operator="+" ;break;
    case "/":operator="/" ;break;
    case "x":operator="x" ;break;
    case "-":operator="-";break;
    
    }
    console.log(operator)
    
    

   
    
  


    
}
