const { Pool } = require('pg');

const serverConfig = {
  user: 'vagrant',
  password: 'vagrant',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
};

const pool = new Pool(serverConfig);

const queryString = `
SELECT DISTINCT teachers.name AS teacher, 
  cohorts.name AS cohort, 
  COUNT(assistance_requests) AS total_assistances
FROM teachers JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
GROUP BY teacher, cohort
ORDER BY teacher;
`;

const cohortName = process.argv[2];
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));