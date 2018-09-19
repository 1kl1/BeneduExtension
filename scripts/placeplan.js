
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

            node.appendChild(node1);
            node.appendChild(node2);
            node.appendChild(node3);
            node.appendChild(node4);
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


