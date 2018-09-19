// let page = document.getElementById('content');

// let button = document.createElement('button');
// button.addEventListener('click', function() {
 
//   chrome.storage.sync.set({color: item}, function() {
//     console.log('color is ' + item);
//   })

//   location.reload();
// });
// page.appendChild(button);


let page = document.getElementById('content');
let page2 = document.getElementById('innerid');
    


function constructdivblank(){
  let divblank = document.createElement('div');
  divblank.setAttribute('class','div_blank');
  page.appendChild(divblank);
}


function constructinputbox(){
  
  let input = document.createElement('input');
  input.setAttribute('id','urlInputbox');
  input.setAttribute('type','text');
  input.setAttribute('name','inputbox');
  page.appendChild(input);
  page.appendChild(document.createElement('p'));
}

function constructbuttonbox(innertext,callback){
  let outerdiv = document.createElement('div');
  let button = document.createElement('div');

  outerdiv.setAttribute('class',"button-1");
  outerdiv.innerText=innertext;

  button.addEventListener('click',callback);

  button.setAttribute('class',"eff-1");
  outerdiv.appendChild(button);
  page.appendChild(outerdiv);
}
function constructbuttonbox2(innertext,callback){
  let outerdiv = document.createElement('div');
  let button = document.createElement('div');

  outerdiv.setAttribute('class',"button-3");
  outerdiv.innerText=innertext;

  button.addEventListener('click',callback);

  button.setAttribute('class',"eff-3");
  outerdiv.appendChild(button);
  page.appendChild(outerdiv);
}

function constructbuttonboxininner(innertext,callback){
  let outerdiv = document.createElement('div');
  let button = document.createElement('div');

  outerdiv.setAttribute('class',"button-3-copy");
  outerdiv.innerText=innertext;

  button.addEventListener('click',callback);

  button.setAttribute('class',"eff-3");
  outerdiv.appendChild(button);
  page2.appendChild(outerdiv);
}

constructbuttonbox('+',constructinputbox);
//+버튼

constructdivblank();

constructbuttonbox('-',function(){
  document.getElementById('urlInputbox').remove();
});

//-버튼

constructdivblank();

constructbuttonbox2('Save',function(){

  
  node = document.getElementsByName('inputbox');
  arr = [];
  for(i=0;i<node.length;i++){
    arr.push(node[i].value);
  }
  setTimeout(function(){
    localStorage.setItem("url", arr);
  },50);

  setTimeout(function(){
    alert('저장되었습니다!\n이 설정은 확장프로그램 탭으로 가서 새로고침 하신 후부터 적용됩니다.');
    
  },100);

});
//submit


constructbuttonboxininner('Save',function(){
  a = document.getElementById('myinch');
  userinch = a[a.selectedIndex].value;
  
  setTimeout(function(){
    localStorage.setItem('inch',userinch);
  },50);

  setTimeout(function(){
    alert('저장되었습니다!\n이 설정은 확장프로그램 탭으로 가서 새로고침 하신 후부터 적용됩니다.');
  },100);

});

constructinputbox();