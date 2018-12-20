
function AddUrlRules(){
  if(localStorage.getItem('url')){
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

  

}

alwaysOn = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostContains: ''}
  })
  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
}

css_scroll_on = {
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
css_scroll_off = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { pathContains : '03StdStudy30TakeExam'}
  })
  ],
  // conditions: [new chrome.declarativeContent.PageStateMatcher({
  //   pageUrl: {hostEquals: 'www.benedu.co.kr'}
  // })
  // ],
    actions: [new chrome.declarativeContent.RequestContentScript({
      js: ['scripts/jquery.js','scripts/cssArrange_Low.js']
    })]
}
// rule2 = {
//   conditions: [new chrome.declarativeContent.PageStateMatcher({
//     pageUrl: { pathContains : '03StdStudy30TakeExam'}
//   })
//   ],
//   // conditions: [new chrome.declarativeContent.PageStateMatcher({
//   //   pageUrl: {hostEquals: 'www.benedu.co.kr'}
//   // })
//   // ],
//     actions: [new chrome.declarativeContent.RequestContentScript({
//       js: ['scripts/jquery.js','scripts/cssArrange14.js']
//     })]
// }





chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([alwaysOn]);

    if(localStorage.getItem('on/off')){
      if(localStorage.getItem('on/off')=='on'){
        if(localStorage.getItem('scroll')=='scrollOn'){
          chrome.declarativeContent.onPageChanged.addRules([css_scroll_on]);
        }
        else{
          chrome.declarativeContent.onPageChanged.addRules([css_scroll_off]);
        }
      }

    }
    AddUrlRules();
  });
});

chrome.pageAction.onClicked.addListener((tabs)=>{
  chrome.tabs.executeScript(tabs.id,{
    
  }, (err)=>{
    console.log(err);
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