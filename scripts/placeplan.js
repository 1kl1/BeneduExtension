
function put(index){
    if(index==5){
        return
    }
    chrome.storage.local.get([String(index)], function(data) {
       
        plres = data[index]
        if(plres==undefined){
            if(index==0){
                document.getElementById("table").remove();
            }
            return
        }
        
        else{
            var node = document.createElement("tr");
            var node1 = document.createElement("td");                 // Create a <li> node
            var textnode1 = document.createTextNode(plres.subject);         // Create a text node
            node1.appendChild(textnode1);
            var node2 = document.createElement("td");                 // Create a <li> node
            var textnode2 = document.createTextNode(plres.title);         // Create a text node
            node2.appendChild(textnode2);
            var node3 = document.createElement("td");                 // Create a <li> node
            var textnode3 = document.createTextNode(plres.workbook);         // Create a text node\
            node3.appendChild(textnode3);
            var node4 = document.createElement("td");                 // Create a <li> node
            var textnode4 = document.createTextNode(plres.amount);         // Create a text node
            node4.appendChild(textnode4);
            // let outerbutton = document.createElement('div');
            // let button = document.createElement('div');

            // outerbutton.setAttribute('class','button-1');
            // button.addEventListener('click',function(){
            //     plres.amount.split('/');
            // });
            // button.setAttribute('class',"eff-1");
            // outerbutton.appendChild(button);
            let node5 = document.createElement('td');
            
            let button = document.createElement('button');
            button.addEventListener('click',function(){
                _index = this.getAttribute('value');

                chrome.storage.local.get([_index], function(data) {
                    innerplan = data[Number(_index)];
                    
                    innerplan.amount = innerplan.amount.replace('0/',/(['/'])\w+/.exec(innerplan.amount)[0].split('/')[1]+'/');
                    innerplan.amount = innerplan.amount.replace("(0%)","(100%)");
                    
                    let _json = {};
                    _json[_index] = innerplan;
                   
                    chrome.storage.local.set(_json,function(){
                        console.log("plan complete!");
                        document.getElementById('planBody').remove();

                        let n = document.createElement('tbody');
                        n.setAttribute('id','planBody');
                        document.getElementById('table').appendChild(n);
                        put(0);
                    });
                });

                
            });
        
            button.setAttribute('class','button5')
            button.setAttribute('value',index);
            node5.appendChild(button);

            

            node.appendChild(node1);
            node.appendChild(node2);
            node.appendChild(node3);
            node.appendChild(node4);
            node.appendChild(node5);
            document.getElementById("planBody").appendChild(node);
            index++;
            put(index);
        }
    });
    
}
put(0);


// let flag = 0;
// // 이 부분은 제귀함수로 구현하도록 하자.
// for(let i=0;flag==0;i++){
//     chrome.storage.local.get([String(i)], function(data) {
//         if(data[0]==undefined){
//             if(i==0){
//                     var node = document.createElement("tr");
//                     var node1 = document.createElement("td");                 // Create a <li> node
//                     var textnode1 = document.createTextNode("값 없음");         // Create a text node
//                     node1.appendChild(textnode1);
//                     var node2 = document.createElement("td");                 // Create a <li> node
//                     var textnode2 = document.createTextNode("값 없음");         // Create a text node
//                     node2.appendChild(textnode2);
//                     var node3 = document.createElement("td");                 // Create a <li> node
//                     var textnode3 = document.createTextNode("값 없음");         // Create a text node\
//                     node3.appendChild(textnode3);
//                     var node4 = document.createElement("td");                 // Create a <li> node
//                     var textnode4 = document.createTextNode("값 없음");         // Create a text node
//                     node4.appendChild(textnode4);

//                     node.appendChild(node1);
//                     node.appendChild(node2);
//                     node.appendChild(node3);
//                     node.appendChild(node4);
//                     document.getElementById("planBody").appendChild(node);
//             }
//             flag = 1;
//         }
        
//     });
// }


