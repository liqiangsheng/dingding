export function getTime(a){
    
    
        var d =new Date(a)
        var year=d.getFullYear();
        var mouth=d.getMonth()+1;
        var day=d.getDay();
        mouth<10?"0"+mouth:mouth;
        day<10?"0"+mouth:mouth;
        return  year+"年"+mouth+"月"+day+"日"   
    
} 
//  console.log(getTime(15123814019))