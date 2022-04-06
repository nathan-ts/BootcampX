CREATE TABLE cohorts (  
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(32),
  github VARCHAR(255),
  start_date DATE, 
  end_date DATE, 
  cohort_id INTEGER REFERENCES cohorts(id) ON DELETE CASCADE
);

--  Table "public.students"
--    Column   |          Type          |                       Modifiers

-- ------------+------------------------+-------------------------------------------------------
--  id         | integer                | not null default nextval('students_id_seq'::regclass)
--  name       | character varying(255) | not null
--  email      | character varying(255) |
--  phone      | character varying(32)  |
--  github     | character varying(255) |
--  start_date | date                   |
--  end_date   | date                   |
--  cohort_id  | integer                |
-- Indexes:
--     "students_pkey" PRIMARY KEY, btree (id)
-- Foreign-key constraints:
--     "students_cohort_id_fkey" FOREIGN KEY (cohort_id) REFERENCES cohorts(id) ON DELETE CASCADE
-- Referenced by:
--     TABLE "assignment_submissions" CONSTRAINT "assignment_submissions_student_id_fkey" FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
--     TABLE "assistance_requests" CONSTRAINT "assistance_requests_student_id_fkey" FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE