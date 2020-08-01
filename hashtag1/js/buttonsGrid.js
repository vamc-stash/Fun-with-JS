let buttonPanel = document.createElement("div");
buttonPanel.id = "btns"
for(let i=1; i<=9; i++) {
    let button = document.createElement("button");
    button.className = "btn"; 
    button.id = "btn"+i.toString();
    button.innerHTML = i.toString();
    buttonPanel.appendChild(button);
}
document.body.appendChild(buttonPanel);

const order = [1,2,3,6,9,8,7,4]

let button5 = document.getElementById("btn5");
button5.onclick = () => {
    let childNodes = document.getElementById("btns").childNodes
 
   	let currBtnVal = childNodes[0].innerHTML;
   	for(let i=1; i<order.length; i++) {
   		let nextBtnVal = childNodes[order[i]-1].innerHTML;
   		childNodes[order[i]-1].innerHTML = currBtnVal;
   		childNodes[order[i]-1].id = "btn"+currBtnVal;
   		currBtnVal = nextBtnVal;
   	}
    childNodes[0].innerHTML = currBtnVal;
    childNodes[0].id = "btn"+currBtnVal;
}