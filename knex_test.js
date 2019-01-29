const settings = require("./settings"); // settings.json


const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user :  settings.user,
      password : settings.password,
      database : settings.database
    }
  });

function displayResults (err, result){
    if (err) {
        return console.error("error running query", err);
    }
    console.log(result); 

    knex.destroy();
}

function doit(callback){
    return knex
             .select('*')
             .from('famous_people')
             .where({'first_name': process.argv.slice(2)[0]})
             .asCallback(callback)
}

doit(displayResults)



