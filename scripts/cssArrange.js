setTimeout(function() {
if(document.querySelector("#frmBenedu > div:nth-child(8) > section.content-header")){
	document.querySelector("#frmBenedu > div:nth-child(8) > section.content-header").remove();     
}
if(document.querySelector("#frmBenedu > div:nth-child(8) > section > div:nth-child(2) > div:nth-child(1)")){
	document.querySelector("#frmBenedu > div:nth-child(8) > section > div:nth-child(2) > div:nth-child(1)").remove(); //margin 260px x 2의 원인.

}
                 //문제풀이 등 공백

var sheet = document.createElement('style');
sheet.innerHTML = "#AnswerArea > div > div > div:nth-child(7){position: relative; left: 600px; bottom: 337px; width: 640px;} #AnswerArea > div > div > div:nth-child(6){position: relative; left: 600px; bottom: 337px; width: 640px;} #examArea{left: 20px; width: "+String(window.screen.availWidth-36)+"px;} #Table_Exame{ width: "+String(window.screen.availWidth-86)+"px; } #AnswerArea > div > div{ width: 280px; } #AnswerArea > div > div > div:nth-child(3){position: relative; left: 300px; bottom: 190px; width: 640px;} #AnswerArea > div > div > div:nth-child(2){ position: relative; left: 300px; bottom: 190px; } #AnswerArea > div > div > div:nth-child(8){ position: relative; left: 300px; bottom: 350px; } #AnswerArea > div > div > div:nth-child(4){ position: relative; left: 600px; bottom: 337px; width: 640px;} #AnswerArea > div > div > div:nth-child(5){ position: relative; left: 600px; bottom: 337px; width: 640px;} #AnswerArea > div > div > div:nth-child(6){position: relative; left: 600px; bottom: 337px; width: 640px;} #AnswerArea > div > div > div:nth-child(7){position: relative; left: 600px; bottom: 337px; width: 640px;} #AnswerArea > div{height:210px;} #AnswerArea{height:203px;}";
document.body.appendChild(sheet);

box_body1.style["height"]="auto";
AnswerArea.style["width"]="1490px";
AnswerArea.style["left"]="20px";
text.style["margin"]="0px";


function isNOTSingle(str){
	return str.includes("~")
}

function isList(tmplist){
	return typeof tmplist == "object";
}

function deleteUnusedTable(){
	var tableList = document.querySelectorAll("#Table_ExamType2Print > tbody > tr");
	var counter = 0;
	for(k=0;k<tableList.length;k++){
		if(tableList[k].textContent=="    "){
			var tmp = k+1-counter;
			document.querySelector("#Table_ExamType2Print > tbody > tr:nth-child("+tmp.toString()+")").remove();
			counter=counter+1;
		}
	}
	return document.querySelectorAll("#Table_ExamType2Print > tbody > tr");

}

function getTableheight(tableList){
	var res = [];
	for(k=1;k<=tableList.length;k++){
		res.push($('#Table_ExamType2Print > tbody > tr:nth-child('+k.toString()+') > td').height());
	}
	// console.log("debug getTableheight")
	return res;
}

function getProbheight(){
	var probList = document.querySelectorAll("#Table_ExamType2Quiz > tbody > tr");
	var res = [];
	for(k=1;k<=probList.length;k++){
		res.push($('#Table_ExamType2Quiz > tbody > tr:nth-child('+k.toString()+')').height());
	}
	//console.log("debug getProbheight")
	return res;
}

function range(start, end) {
    var ans = [];
    for (let alpha = start; alpha <= end; alpha++) {
        ans.push(alpha);
    }
    return ans;
}

function fitNum(){

	var tableHeight = [];
	var probHeight = [];

	var tableList = deleteUnusedTable(); //이상한 테이블? 을 지운다.
	setTimeout(function() {
		tableHeight = getTableheight(tableList);
	}, 500);
	 //본문의 높이ㄱ를 list로 전달해준다.
	setTimeout(function() {
		probHeight = getProbheight();
	}, 1000);
	var numList = [];
	var numListLength = [];
	 //문제의 높이를 list로 전달해준다.
	setTimeout(function() {
		var pTag = window.document.getElementsByClassName("badge bg_blue");
		
		numList.push(pTag[0].textContent.trim());
		//push한건 다음인덱스로 넘어간다.
		for(k=1;numList[0]!=pTag[k].textContent.trim();k++){
			numList.push(pTag[k].textContent.trim());
		}
		for(pp = 0;pp<numList.length;pp++){
			numListLength.push(numList[pp].length);
		}

	}, 1500);

	setTimeout(function() {
		for(k=0;k<numList.length;k++){   //데이터 처리 밑 숫자화. 두자리, 한자리 도 괜찮음.
			if(isNOTSingle(numList[k])){
				var firstNumber = numList[k].split('~')[0].trim();
	
				tmpNum = "";
				for(var mm=0;mm<firstNumber.length;mm++){
					if(Number(firstNumber[mm])||Number(firstNumber[mm]==0)){
						tmpNum+=firstNumber[mm];
					}
				}
				firstNumber=Number(tmpNum);
	
				var lastNumber =  numList[k].split('~')[1].trim();
	
				tmpNum = "";
				for(var mm=0;mm<lastNumber.length;mm++){
					if(Number(lastNumber[mm])||Number(lastNumber[mm]==0)){
						tmpNum+=lastNumber[mm];
					}
				}
				lastNumber=Number(tmpNum);
	
				numList[k] = range(firstNumber,lastNumber);
			}
			else{
				tmpNum = "";
				for(var mm=0;mm<numList[k].length;mm++){
					if(Number(numList[k][mm])||Number(numList[k][mm]==0)){
						tmpNum+=numList[k][mm];
					}
				}
				numList[k]=Number(tmpNum);
				
			}
		}
		
	}, 2000);

	

	setTimeout(function() {


		if(isList(numList[0])){
			var stdNum = numList[0][0];
		}
		var stdNum = numList[0];
		//빼주기 위해서 정해놓았다.
		var hei = 0;
		
		for(var al=0;al<numList.length;al++){
		
				if(isList(numList[al])){
					var tmpHeight = 0;
					for(m=0;m<numList[al].length-1;m++){
						tmpHeight= tmpHeight+ probHeight[numList[al][m]-stdNum];
					};
					hei = tableHeight[al]-tmpHeight+18;
					var isHeightplus = hei>0;
					hei = hei+"px";
					bot = numList[al].length-1;
					
					var tmpIndex = numList[al][bot]-stdNum+1;
					if(isHeightplus){
					document.querySelector("#Table_ExamType2Quiz > tbody > tr:nth-child("+tmpIndex.toString()+") > td").style.height = hei;
					}
	
				}
				else{
					hei_ = tableHeight[al]+18;
					hei = hei_+"px";
					var tmpIndex = (numList[al]-stdNum)+1;		
					document.querySelector("#Table_ExamType2Quiz > tbody > tr:nth-child("+tmpIndex.toString()+") > td").style.height = hei;
				}
		}	
	}, 2500);
}

$("input[name=radioName]").change(function (){

    var radioValue = $(this).val();

    if (radioValue == "viewType2") {
        setTimeout(function() {

            TableText.style["height"]="auto";
            TableQuiz.style["height"]="auto";

            setTimeout(function() {
                //fitNum();
            }, 200);
        }, 200);
    }

    else if (radioValue == "viewType3") {
        setTimeout(function() {
            box_body3.style['height']="auto";
        }, 200);
    }

});



var floatbarpage = document.querySelector('#frmBenedu > div:nth-child(8) > section');

floatbarpage.insertAdjacentHTML('afterend',`
<div id="left-menu" style="float:right;z-index: 999;top: 500px;right: 20px;position: absolute; transition:all 1s ease;">
            <table>
               <tr>
                  <td class = 'NN_L1' id = 'n1__'><</td>
                  <td class = 'NN_N1' id = 'n1__'>1</td>
                  <td class = 'NN_R1' id = 'n1__'>></td>
               </tr>
               <tr>
                  <td class = 'NN_L2' id = 'n2__'><</td>
                  <td class = 'NN_N2' id = 'n2__'>1</td>
                  <td class = 'NN_R2' id = 'n2__'>></td>
               </tr>
               <tr>
                  <td class = 'NN_L3' id = 'n3__'><</td>
                  <td class = 'NN_N3' id = 'n3__'>1</td>
                  <td class = 'NN_R3' id = 'n3__'>></td>
               </tr>
               <tr>
                  <td class = 'NN_L4' id = 'n4__'><</td>
                  <td class = 'NN_N4' id = 'n4__'>1</td>
                  <td class = 'NN_R4' id = 'n4__'>></td>
               </tr>
               <tr>
                  <td class = 'NN_L5' id = 'n5__'><</td>
                  <td class = 'NN_N5' id = 'n5__'>1</td>
                  <td class = 'NN_R5' id = 'n5__'>></td>
               </tr>
            </table>
         </div>
`);

var sheet2 = document.createElement('style');
sheet2.innerHTML = `
#left-menu > table > tbody > tr{
	border: 1px solid #fff;
}
 #left-menu > table > tbody > tr > td{
	padding:5px;
	 border: 3px solid #fff;
}
 #left-menu > table{
	border-collapse: collapse;
	 background-color: cornflowerblue;
	 display:block;
	text-align:center;
	color: white;
	 border-radius: 3px
}
#n1__{
	cursor: pointer;
}
#n2__{
	cursor: pointer;
}
#n3__{
	cursor: pointer;
}
#n4__{
	cursor: pointer;
}
#n5__{
	cursor: pointer;
}
`;

document.body.appendChild(sheet2);

var prop = document.getElementById('left-menu');

function down(wbel){
	vari = Number($(wbel).text());
	if(vari>=2){
		vari-=1;
	}
	$(wbel).text(String(vari));
	
}
function up(wbel){
	vari = Number($(wbel).text());
	if(vari<=4){
		vari+=1;
	}
	$(wbel).text(String(vari));
}

window.addEventListener('scroll', function() {
	 setTimeout(()=>{
	 prop.style.top = String(window.scrollY+500)+'px';
	},10);
});

$('.NN_N1').click(()=>{
	if($('.NN_N1').text()=='1'){
		$('.AnswerTd>span')[0].click();
	}
	else if($('.NN_N1').text()=='2'){
		$('.AnswerTd>span')[1].click();
	}
	else if($('.NN_N1').text()=='3'){
		$('.AnswerTd>span')[2].click();
	}
	else if($('.NN_N1').text()=='4'){
		$('.AnswerTd>span')[3].click();
	}
	else if($('.NN_N1').text()=='5'){
		$('.AnswerTd>span')[4].click();
	}
});
$('.NN_N2').click(()=>{
	if($('.NN_N2').text()=='1'){
		$('.AnswerTd>span')[5].click();
	}
	else if($('.NN_N2').text()=='2'){
		$('.AnswerTd>span')[6].click();
	}
	else if($('.NN_N2').text()=='3'){
		$('.AnswerTd>span')[7].click();
	}
	else if($('.NN_N2').text()=='4'){
		$('.AnswerTd>span')[8].click();
	}
	else if($('.NN_N2').text()=='5'){
		$('.AnswerTd>span')[9].click();
	}
});
$('.NN_N3').click(()=>{
	if($('.NN_N3').text()=='1'){
		$('.AnswerTd>span')[10].click();
	}
	else if($('.NN_N3').text()=='2'){
		$('.AnswerTd>span')[11].click();
	}
	else if($('.NN_N3').text()=='3'){
		$('.AnswerTd>span')[12].click();
	}
	else if($('.NN_N3').text()=='4'){
		$('.AnswerTd>span')[13].click();
	}
	else if($('.NN_N3').text()=='5'){
		$('.AnswerTd>span')[14].click();
	}
});
$('.NN_N4').click(()=>{
	if($('.NN_4').text()=='1'){
		$('.AnswerTd>span')[15].click();
	}
	else if($('.NN_N4').text()=='2'){
		$('.AnswerTd>span')[16].click();
	}
	else if($('.NN_N4').text()=='3'){
		$('.AnswerTd>span')[17].click();
	}
	else if($('.NN_N4').text()=='4'){
		$('.AnswerTd>span')[18].click();
	}
	else if($('.NN_N4').text()=='5'){
		$('.AnswerTd>span')[19].click();
	}
});
$('.NN_N5').click(()=>{
	if($('.NN_N5').text()=='1'){
		$('.AnswerTd>span')[20].click();
	}
	else if($('.NN_N5').text()=='2'){
		$('.AnswerTd>span')[21].click();
	}
	else if($('.NN_N5').text()=='3'){
		$('.AnswerTd>span')[22].click();
	}
	else if($('.NN_N5').text()=='4'){
		$('.AnswerTd>span')[23].click();
	}
	else if($('.NN_N5').text()=='5'){
		$('.AnswerTd>span')[24].click();
	}
});




$('.NN_L1').click(()=>{
	
	down('.NN_N1');
});
$('.NN_L2').click(()=>{
	down('.NN_N2');
});
$('.NN_L3').click(()=>{
	down('.NN_N3');
});
$('.NN_L4').click(()=>{
	down('.NN_N4');
});
$('.NN_L5').click(()=>{
	down('.NN_N5');
});
$('.NN_R1').click(()=>{
	up('.NN_N1');
});
$('.NN_R2').click(()=>{
	up('.NN_N2');
});
$('.NN_R3').click(()=>{
	up('.NN_N3');
});
$('.NN_R4').click(()=>{
	up('.NN_N4');
});
$('.NN_R5').click(()=>{
	up('.NN_N5');
});


}, 3000);


