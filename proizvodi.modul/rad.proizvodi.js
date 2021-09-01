const fs=require('fs');
const path="../proizvodi.json"

function citanjeIzFajla(){
    return JSON.parse(fs.readFileSync(path));
}

function upisUFajl(data){
    fs.writeFileSync(path,JSON.stringify(data));
}

exports.sviProizvodi=()=>{
    let proizvodi=citanjeIzFajla();
    var proizvodiVisible=[];
    for(let proizvod of proizvodi){
        if(proizvod.visible==true){
            proizvodiVisible.push(proizvod);
        }
    }
    return proizvodiVisible;
}

exports.dodajProizvod=(proizvod)=>{
    let proizvodi=this.sviProizvodi();
    let id=1;
    if(proizvodi.length>0){
        id=proizvodi.length+1;
    }
    proizvod.id=id;
    proizvodi.push(proizvod);
    upisUFajl(proizvodi);
}

exports.izbrisiProizvod=(id)=>{
    let proizvodi=this.sviProizvodi();
    for(let p of proizvodi){
        if(p.id==id){
            p.visible=false;
        }
    }
    upisUFajl(proizvodi);
}

exports.getProizvod=(id)=>{
    let proizvodi=citanjeIzFajla();
    for(let p of proizvodi){
        if(p.visible==true & p.id==id){
            return p;
        }
    }
}

exports.izmeniProizvod=(data)=>{
    let proizvodi=citanjeIzFajla();
    for(let p of proizvodi){
        if(p.id==data.id){
            p=data;
        }
    }
    upisUFajl(proizvodi);
}

console.log(this.getProizvod(2));