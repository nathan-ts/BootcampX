const { Pool } = require('pg');

const serverConfig = {
  user: 'vagrant',
  password: 'vagrant',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
};

const pool = new Pool(serverConfig);

const cohortQuery = process.argv[2];
const numResults = parseInt(process.argv[3]);

// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// WHERE cohorts.id LIKE '$1%'
// LIMIT $2;
// `, [cohortQuery, numResults])
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));