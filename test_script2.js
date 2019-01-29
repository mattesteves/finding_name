
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var name = process.argv.slice(2)[0]
function displayResults (err, result){
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows); //output: 1
    client.end();
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people
                WHERE first_name = $1::text`, [name], displayResults);
});


