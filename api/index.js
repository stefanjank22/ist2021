const express=require("express");
const upravljanjeProizvodima=require("../proizvodi_modul/rad.proizvodi");

const app=express();
app.listen(3000,()=>{
    console.log("Pokrenut server na portu 3000")
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());//izuciti
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','*');
    next();
  });

app.get('/sviProizvodi',(req,res)=>{
    res.send(upravljanjeProizvodima.sviVidljiviProizvodi());
});

app.get('/getProizvodById/:id',(req,res) =>{
    let id=req.params["id"];
    res.send( upravljanjeProizvodima.getProizvodById(id));
});

app.post('/dodajProizvod',(req,res)=>{
    console.log(req.body);
    res.send(upravljanjeProizvodima.dodajProizvod(req.body));
});

app.get('/izbrisiProizvod/:id',(req,res)=>{
    upravljanjeProizvodima.izbrisiProizvod(req.params['id']);
    res.end();
});

app.post('/izmeniProizvod',(req,res)=>{
    upravljanjeProizvodima.izmeniProizvod(req.body);
    res.send(upravljanjeProizvodima.sviVidljiviProizvodi());
});

app.get('/pretraga',(req,res) =>{
    res.send( upravljanjeProizvodima.pretraziProizvode(req.query.pretraga));
    res.end("200");
});