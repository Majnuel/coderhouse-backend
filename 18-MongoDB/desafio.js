brew services start mongodb-community@5.0
brew services stop mongodb-community@5.0

// comandos desafio

show dbs
use desafio-clase-18

db

db.createCollection("productos")
db.createCollection("mensajes")

show collections

let products = [
  {
    name: "jetpack",
    price: 4800,
    description: "awesome jetpack",
    stock: 10,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "c4",
    price: 1900,
    description: "boom!",
    stock: 70,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "grenade",
    price: 900,
    description: "toss and run",
    stock: 120,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "tent",
    price: 1800,
    description: "cozy tent",
    stock: 90,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "bazooka",
    price: 3100,
    description: "say hello",
    stock: 60,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "railgun",
    price: 3500,
    description: "T2",
    stock: 20,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "bulletproof vest",
    price: 1900,
    description: "up to 9mm protection",
    stock: 42,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "armour",
    price: 200,
    description: "can take a bazooka hit",
    stock: 8,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "helmet",
    price: 420,
    description: "protect whats important",
    stock: 53,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
  {
    name: "boots",
    price: 350,
    description: "waterproof",
    stock: 60,
    thumbnail: "some url",
    created_at: ISODate(),
    updated_at: ISODate(),
  },
];

db.productos.insert(products);

const mensajes = [
  { autor: "felipe@gmail", mensaje: "hola", created_at: ISODate() },
  { autor: "ezio@hotmail", mensaje: "que tal?", created_at: ISODate() },
  { autor: "felipe@gmail", mensaje: "todo bien, vos?", created_at: ISODate() },
  { autor: "ezio@hotmail", mensaje: "si si", created_at: ISODate() },
  { autor: "felipe@gmail", mensaje: "tenes stock?", created_at: ISODate() },
  { autor: "ezio@hotmail", mensaje: "10 unidades", created_at: ISODate() },
  {
    autor: "felipe@gmail",
    mensaje: "haces precio por 6?",
    created_at: ISODate(),
  },
  { autor: "ezio@hotmail", mensaje: "20% descuento", created_at: ISODate() },
  { autor: "felipe@gmail", mensaje: "dale", created_at: ISODate() },
  { autor: "ezio@hotmail", mensaje: "gracias", created_at: ISODate() },
];

db.mensajes.insert(mensajes);

db.mensajes.find().pretty()
db.productos.find().pretty()

db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

db.productos.insert(   {      name: "jacket",     price: 350,     description: "warm",     stock: 60,     thumbnail: "some url",     created_at: ISODate(),     updated_at: ISODate(),   })

db.productos.find({price: {$lt:1000}}).pretty()

db.productos.find({$and:[{price: {$gt:1000 }}, {price:{$lt:3000}}]}).pretty()

db.productos.find({price: {$gt:3000 }}).pretty()

db.productos.find().sort({price: 1}).skip(2).limit(1).pretty()

db.productos.updateMany({}, {$set:{stock: 100}})

db.productos.updateMany({price: {$gt: 4000}}, {$set:{stock: 0}})

db.productos.deleteMany({price: {$lt:1000}})

use admin

db

db.createUser({user:"lector", pwd:"123456", roles: [{role:"read", db:"desafio-clase-18"}]})

// modificar mongod.conf: habilitar autorizacion en opciones de seguridad

brew services start mongodb-community@5.0

mongo -u lector -p 123456

show dbs // solamente "muestra desafio-clase-18"

db.productos.insert({name: "ezio"}) // muestra error