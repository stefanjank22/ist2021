const { response } = require('express');
const express=require('express');
const fs=require('fs');
const axios=require('axios');
const app=express();

app.listen(4000,()=>{
    console.log("Server je pokrenut na portu 4000");
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','*');
    next();
  });

let procitajFajl=(naziv)=>{
    return fs.readFileSync(`${__dirname}/Views/${naziv}.html`, 'utf-8');
}
app.get("/",(req,res)=>{
    res.send(procitajFajl("index"));
})

app.get("/prikazProizvoda",(req,res)=>{
    axios.get('http://localhost:3000/sviProizvodi')
    .then((response)=>{
        res.send(prikazi(response.data));
    })
    .catch(err => {
        console.error(err);
    });

})

app.get("/dodajProizvode",(req,res)=>{
    res.send(procitajFajl("dodajProizvode"));
    
})

app.get("/izmeniProizvode",(req,res)=>{
    res.send(procitajFajl("izmeniProizvode"));
})

app.get("/pretraga",(req,res) => {
    axios.get("http://localhost:3000/pretraga"+"?pretraga="+req.query.pretraga,{
    })
    .then((response)=> {
       res.send(prikazi(response.data));
    })
    .catch(err =>{
        console.error(err);
    })
})

app.post("/dodajNoviProizvod",(req,res)=>{
    axios.post("http://localhost:3000/dodajProizvod",{
       naziv:req.body.naziv,
       kategorija:req.body.kategorija,
       cena: req.body.cena,
       opis: req.body.opis,
       slika:req.body.slika,
       tag: req.body.tag
   });
    res.redirect('/prikazProizvoda');
})

app.get('/izmeniProizvodeStr',(req,res) => {
    axios.get("http://localhost:3000/sviProizvodi")
    .then((response) => {
         let prikaz='';   
        for(proizvod of response.data){
            prikaz+=`<div class="proizvod">
                        <img src="${proizvod.slika}" alt="${proizvod.naziv}">
                        <span class='proizvod_name'>${proizvod.naziv}</span>
                        <span class='proizvod_name'>${proizvod.kategorija}</span>
                        <span class="proizvod_price">${proizvod.cena} RSD</span>
                        <input class="proizvod_radio" type="radio" name="proizvod" value="${proizvod.id}">
                        <a href="/izbrisiProizvod/${proizvod.id}">Izbrisi</a>
                    </div>`;
        }
        res.send(procitajFajl("/izmeniProizvode").replace("${data}",prikaz));
    })
    .catch((err) =>{
        console.log(err);
    })
});

app.post('/izmeniProizvod',(req,res) =>{
    axios.post('http://localhost:3000/izmeniProizvod',{
        naziv: req.body.naziv,
        kategorija: req.body.kategorija,
        cena:req.body.cena,
        opis: req.body.opis,
        slika: req.body.slika,
        tag:req.body.tag,
        id:req.body.id
    })
    res.redirect("/izmeniProizvodeStr");
});

app.get('/izbrisiProizvod/:id',(req,res)=>{
    axios.get('http://localhost:3000/izbrisiProizvod/'+req.params["id"]);
    res.redirect("/izmeniProizvodeStr");
});

let prikazi = (data)=> {
    let proizvodi='';
    for( p of data){
         proizvodi+=`
         <div class="card" style="width: 18rem; display:inline-block">
         <img src="${p.slika}" class="card-img-top" alt="${p.naziv}">
         <div class="card-body">
           <h5 class="card-title">${p.naziv}</h5>
           <p class="card-text">${p.opis}</p>
           <p class="card-text">${p.cena} RSD</p>
           <a href="#" class="btn btn-primary">Kupi</a>
         </div>
       </div>`;
    }

    const ress=procitajFajl('prikazProizvoda').replace("${data}",proizvodi);
    return ress;
}