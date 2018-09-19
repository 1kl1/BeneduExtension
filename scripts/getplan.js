
function gettingPlans(getCallback){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: "scripts/getParsedplan.js"},function(res){
                result = res[0];
                getCallback(result);
            }
        );
    });
}


    // let a=
    // {
    //     endTime:"xx:xx",
    //     subject:"과목이름",
    //     title:"제목",
    //     workbook:"문제집이름",
    //     amount:"분량(개, 쪽, 단원, 강(인강), 일치, Chapter)"
    // }
    

function settingPlans(leng, plres,inde){

    if(inde == leng){
        return
    }
    let b = String(inde);
    let json_ = {};
    json_[b] = plres[inde];
    console.log(json_[b])
    chrome.storage.local.set(json_,function(){console.log('value is set in : '+inde+"  "+plres[inde].subject); inde += 1; settingPlans(leng,plres,inde); });

    // var node = document.createElement("tr");
    // var node1 = document.createElement("td");                 // Create a <li> node
    // var textnode1 = document.createTextNode(plres.subject);         // Create a text node
    // node1.appendChild(textnode1);
    // var node2 = document.createElement("td");                 // Create a <li> node
    // var textnode2 = document.createTextNode(plres.title);         // Create a text node
    // node2.appendChild(textnode2);
    // var node3 = document.createElement("td");                 // Create a <li> node
    // var textnode3 = document.createTextNode(plres.workbook);         // Create a text node\
    // node3.appendChild(textnode3);
    // var node4 = document.createElement("td");                 // Create a <li> node
    // var textnode4 = document.createTextNode(plres.amount);         // Create a text node
    // node4.appendChild(textnode4);

    // node.appendChild(node1);
    // node.appendChild(node2);
    // node.appendChild(node3);
    // node.appendChild(node4);
    // document.getElementById("planBody").appendChild(node);

}





chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url.split('/')[5];
    if(url=="02PlnPlanner03Day.aspx"){
        
        node = document.createElement('button');
        var textnode = document.createTextNode("Get Plans!");         // Create a text node
        node.appendChild(textnode);
        node.setAttribute('id','getPlan');
        node.addEventListener('click',function(){
            chrome.storage.local.clear();
            gettingPlans(function(result){
                if(result.length!=0){
                    settingPlans(result.length,result,0);
                }
                else{}
            });
        });
        
        document.getElementById('main').appendChild(node);

    }

});
