// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };

let rawstring = "오전 09:00 ~ 오후 06:00 0/540분 (0%) 과목 세계지리 제목 성수대교 교재 SEXY한 세계지리 분량 0/2 Chapter(0%)"


endTime = rawstring.substring(rawstring.indexOf('오후')+3,rawstring.indexOf('오후')+8)
subject = rawstring.substring(rawstring.indexOf('과목')+3,).split(' ')[0]
title = rawstring.substring(rawstring.indexOf('제목')+3,).split(' ')[0]
workbook = rawstring.substring(rawstring.indexOf('교재')+3,rawstring.indexOf('분량')-1)
amount = rawstring.substring(rawstring.indexOf('분량')+3,)


let result = new Object();

result.endTime = endTime;
result.subject = subject;

console.log(JSON.stringify(result))