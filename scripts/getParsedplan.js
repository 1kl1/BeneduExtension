

function parsePlan(rawstring){

    // 오전 09:00 ~ 오후 06:00 0/540분 (0%) 과목 국어 제목 1231 교재 rpm 분량 0/0 개(NaN%)
    // 오전 09:00 ~ 오후 06:00 0/540분 (0%) 과목 세계지리 제목 성수대교 교재 SEXY한 세계지리 분량 0/2 Chapter(0%)

    // let a=
    // {
    //     endTime:"xx:xx",
    //     subject:"과목이름",
    //     title:"제목",
    //     workbook:"문제집이름",
    //     amount:"분량(개, 쪽, 단원, 강(인강), 일치, Chapter)"
    // }
    
    endTime = rawstring.substring(rawstring.indexOf('오후')+3,rawstring.indexOf('오후')+8)
    subject = rawstring.substring(rawstring.indexOf('과목')+3,).split(' ')[0]
    title = rawstring.substring(rawstring.indexOf('제목')+3,).split(' ')[0]
    workbook = rawstring.substring(rawstring.indexOf('교재')+3,rawstring.indexOf('분량')-1)
    amount = rawstring.substring(rawstring.indexOf('분량')+3,)

    if(amount.includes("NaN")){
        amount = "0/0개(100%)"
    }

    let result = new Object();

    result.endTime = endTime;
    result.subject = subject;
    result.title = title;
    result.workbook = workbook;
    result.amount = amount;

    

    return result
}


x = document.getElementsByClassName("box_split col-xs-12");
let resarray=[];

for(xval=0;xval<x.length;xval++){
    if(x[xval].getAttribute('onclick')!=null){
        resarray.push(parsePlan(x[xval].innerText))
    }
}

resarray;

