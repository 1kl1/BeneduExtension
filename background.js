
function AddUrlRules(){
  urlArray = localStorage.getItem('url').split(',');

  urlArray.forEach(element => {

    rule = {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: element}
      })
      ],
      actions: [new chrome.declarativeContent.RequestContentScript({
        js: ['scripts/ban.js']
      })]

    }
    chrome.declarativeContent.onPageChanged.addRules([rule]);
    
  });

}

rule1 = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostEquals: 'www.benedu.co.kr'}
  })
  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
}

rule2 = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { pathContains : '03StdStudy30TakeExam'}
  })
  ],
  // conditions: [new chrome.declarativeContent.PageStateMatcher({
  //   pageUrl: {hostEquals: 'www.benedu.co.kr'}
  // })
  // ],
    actions: [new chrome.declarativeContent.RequestContentScript({
      js: ['scripts/jquery.js','scripts/cssArrange.js']
    })]
}





chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
    AddUrlRules();
  });
});

console.log(localStorage);

 //chrome에 저장되는 요소는 json형식으로 저장된다.
 // chrome.storage.sync.get('color',function(data){console.log(data)}); 이런식으로 사용한다. 데이터를 받고 사용하고 버리는느낌. 
   // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log("The color is green.");
  // });
   // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log("The color is green.");
  // });