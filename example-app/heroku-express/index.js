const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const {Pool} = require('pg');
const pool = new Pool(
  {
    connectionString: process.env.DATABASE_URL,
    ssl:              true
  }
);


let shaneRout = (time) =>
{
  console.log(`\n HEY! I printed to the console at ${time} \n`);
  return `This is what you get when you take the shane rout at ${time}`;
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/shane', (req, res) => res.send( shaneRout(new Date()) ) )
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      //const setup = await client.query("create table test_table (id integer, name text); insert into test_table values (1, 'hello database');");
      //const setupResult = JSON.stringify(setup);
      //console.log(setupResult);
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
