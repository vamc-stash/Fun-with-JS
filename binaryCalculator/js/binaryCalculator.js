let res = document.createElement('div');
res.id = "res";
res.innerHTML = ""

let btns = document.createElement('div');
btns.id = "btns";

let buttons = [{id:'btn0',val:'0'}, {id:'btn1',val:'1'}, {id:'btnClr',val:'C'}, {id:'btnEql',val:'='}, 
				{id:'btnSum',val:'+'}, {id:'btnSub',val:'-'}, {id:'btnMul',val:'*'}, {id:'btnDiv',val:'/'}]

for(let i=0; i<buttons.length; i++) {
	let btn = document.createElement('button');
	btn.id = buttons[i].id;
	btn.innerHTML = buttons[i].val;
	btn.addEventListener('click', triggerButton);
	btns.appendChild(btn);
}

document.body.appendChild(res);
document.body.appendChild(btns);

function triggerButton(e) {
	let btn = e.target || e.srcElement;
	let val = document.getElementById(btn.id).innerHTML

	switch(val) {
		case '0':
		case '1':
			res.innerHTML += val;
			break;
		case 'C':
			res.innerHTML = '';
			break;
		case '=':
			let expr = res.innerHTML;
			let numsRegex = /(\d+)/g;
			let exprRegex = /^(\d+|(\-|\+)\d+)((\+|\-|\*|\/)\d+)+$/;
			if(expr.match(exprRegex)) {
				expr = expr.replace(numsRegex, function(match) {
				    return parseInt(match,2);
				})
				res.innerHTML = Math.floor(eval(expr).toString(2));
			}
			break;

		default:
			if(res.innerHTML == "" && (val == '*' || val == '/')) 
				break;
			if(res.innerHTML.match(/(\+|\-|\*|\/)$/)) {
				res.innerHTML = res.innerHTML.slice(0,-1)
			}
			res.innerHTML += val
			break;
	}
}