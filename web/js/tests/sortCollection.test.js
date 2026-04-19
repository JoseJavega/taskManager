import { sortCollection } from "../utils/sortCollection.js";

const collection=[
  {"_id":"b9680442-3f13-4f98-8975-8465fab860d3","title":"Tarea 5","description":"probando","completed":false,"createdAt":"2025-11-02T19:44:04.168Z","updatedAt":"2025-11-02T19:45:43.233Z"},
  {"_id":"737ef629-0556-449d-9af7-e3e1ea178112","title":"Tarea 4","description":"probando","completed":false,"createdAt":"2025-11-02T19:43:22.209Z","updatedAt":"2025-11-02T19:46:01.347Z","finishedAt":"2025-11-12T19:45:48.027Z"},
  {"_id":"f9de90d3-2e93-4e22-a1f9-2b3186b5571a","title":"Tarea 3","description":"cosas cosas","completed":false,"createdAt":"2025-10-26T17:54:26.758Z","updatedAt":"2025-11-02T19:44:37.154Z"},
  {"_id":"6aa52e96-7710-4387-8603-e7f9678d52ca","title":"Tarea 2","description":"mas cosas ma","completed":false,"createdAt":"2025-10-26T17:47:14.895Z","updatedAt":"2025-11-02T19:45:51.929Z"},
  {"_id":"ff882139-b035-43a0-87c8-f67d890b140d","title":"Tarea 1","description":"cosas 1","completed":true,"createdAt":"2025-10-26T17:40:46.315Z","updatedAt":"2025-11-02T19:45:48.026Z","finishedAt":"2025-11-02T19:45:48.027Z"}
];

const collection2="pasando datos";

//console.log(sortCollection() );
//console.log(sortCollection(collection2) );
//console.log(sortCollection(collection) );
//console.log(sortCollection(collection, 21) );
//console.log(sortCollection(collection, "21") );
console.log(sortCollection(collection, "finishedAt", "desc") );