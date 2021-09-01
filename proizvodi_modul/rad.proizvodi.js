const fs=require('fs');
const path="../proizvodi.json"

function citanjeIzFajla(){
    return JSON.parse(fs.readFileSync(path));
}

function upisUFajl(data){
    fs.writeFileSync(path,JSON.stringify(data));
}
exports.sviProizvodi=()=>{
    return citanjeIzFajla();
}

exports.sviVidljiviProizvodi=()=>{
    let proizvodi=citanjeIzFajla();
    var proizvodiVisible=[];
    for(let proizvod of proizvodi){
        if(proizvod.visible==true){
            proizvodiVisible.push(proizvod);
        }
    }
    return proizvodiVisible;
}

exports.getProizvodById= (id) => {
    return proizvodi=this.sviProizvodi().find(x => x.id==id);
}

exports.dodajProizvod=(proizvod)=>{
    let proizvodi=this.sviProizvodi();
    let id=1;
    if(proizvodi.length>0){
        id=proizvodi.length+1;
    }
    proizvod.id=id;
    proizvod.visible=true;
    proizvodi.push(proizvod);
    upisUFajl(proizvodi);
}

exports.izbrisiProizvod=(id)=>{
    let proizvodi=this.sviVidljiviProizvodi();
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
            p.naziv=data.naziv;
            p.kategorija=data.kategorija;
            p.cena=data.cena;
            p.opis=data.opis;
            p.slika=data.slika;
            p.tag=data.tag;
        }
    }
    upisUFajl(proizvodi);
}

exports.pretraziProizvode=(data)=>{
    return this.sviVidljiviProizvodi().filter(p=>p.naziv.toUpperCase().includes(data.toUpperCase()));
  }

