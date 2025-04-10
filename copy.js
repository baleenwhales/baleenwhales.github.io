var code = `DROP TABLE Customers;
DROP TABLE Orders;
DROP TABLE Shippings;

CREATE TABLE IF NOT EXISTS admin (
    admin_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    admin_email TEXT UNIQUE NOT NULL,
    personal_email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS student (
    student_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    student_email TEXT UNIQUE NOT NULL,
    personal_email TEXT UNIQUE NOT NULL,
    major TEXT,
    password TEXT NOT NULL,
    FOREIGN KEY (major) REFERENCES department(department_name)
);

CREATE TABLE IF NOT EXISTS faculty (
    faculty_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    faculty_email TEXT UNIQUE NOT NULL,
    personal_email TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (department) REFERENCES department(department_name)
);

CREATE TABLE IF NOT EXISTS course (
    course_id INTEGER PRIMARY KEY,
    section TEXT NOT NULL,
    title TEXT NOT NULL,
    credits INTEGER NOT NULL,
    capacity INTEGER DEFAULT 30,
    syllabus TEXT NOT NULL,
    info TEXT NOT NULL,
    instructor_id INTEGER NOT NULL,
    room TEXT NULL,
    department TEXT NOT NULL,
    term TEXT NOT NULL,
    year INTEGER NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (term, year) REFERENCES term(term, year),
    FOREIGN KEY (department) REFERENCES department(department_name),
    FOREIGN KEY (room) REFERENCES classroom(room_number)
);

CREATE TABLE IF NOT EXISTS department (
    department_name TEXT PRIMARY KEY,
    department_email TEXT UNIQUE NOT NULL,
    department_chair INTEGER NOT NULL,
    FOREIGN KEY (department_chair) REFERENCES faculty(faculty_id)
);

CREATE TABLE IF NOT EXISTS timeblock (
    timeblock_id TEXT PRIMARY KEY,
    day TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS classroom (
    room_number TEXT PRIMARY KEY,
    building TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS term (
    term TEXT NOT NULL,
    year INTEGER NOT NULL,
    registration_deadline DATE NOT NULL,
    drop_deadline DATE NOT NULL,
    PRIMARY KEY (term, year),
    CHECK (term IN ('Fall', 'Winter', 'Spring', 'Summer'))
);

CREATE TABLE IF NOT EXISTS notifications (
    date DATE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    courseID INTEGER,
    facultyID INTEGER,
    PRIMARY KEY (date, facultyID),
    FOREIGN KEY (courseID) REFERENCES course(course_id),
    FOREIGN KEY (facultyID) REFERENCES faculty(faculty_id)
);

CREATE TABLE IF NOT EXISTS prerequisites (
    course_id INTEGER,
    prereq_id INTEGER,
    PRIMARY KEY (course_id, prereq_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (prereq_id) REFERENCES course(course_id)
);

CREATE TABLE IF NOT EXISTS enrollments (
    student_id INTEGER,
    course_id INTEGER,
    grade INTEGER DEFAULT NULL,
    status TEXT DEFAULT 'In Progress',
    CHECK (status IN (
    'In Progress',
    'Passed',
    'Failed',
    'Dropped',
    'Completed'
    )),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE IF NOT EXISTS courseblock (
    course_id INTEGER,
    timeblock_id INTEGER,
    PRIMARY KEY (course_id, timeblock_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (timeblock_id) REFERENCES timeblock(timeblock_id)
);

CREATE TABLE IF NOT EXISTS course_management (
    admin_id INTEGER NOT NULL,
    course_id INTEGER,
    action TEXT,
    date DATETIME NOT NULL,
    PRIMARY KEY (admin_id, course_id, date),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE IF NOT EXISTS student_management (
    admin_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    action TEXT,
    date DATETIME NOT NULL,
    PRIMARY KEY (admin_id, student_id, date),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);

PRAGMA foreign_keys = OFF;

INSERT INTO admin (admin_id, first_name, middle_name, last_name, admin_email, personal_email, password) VALUES
(101, 'John', 'Doe', 'Smith', 'admin01@uni.com', 'johndoesmith@gmail.com', 'admin01pass'),
(102, 'Jane', 'Doe', 'Smith', 'admin02@uni.com', 'janedoesmith@gmail.com', 'admin02pass'),
(103, 'Toby', 'Doe', 'Smith', 'admin03@uni.com', 'tobydoesmith@gmail.com', 'admin03pass');

INSERT INTO student (student_id, first_name, middle_name, last_name, student_email, personal_email, major, password) VALUES
(201, 'Sharon', 'Ogden', 'Bullard', 'student01@uni.com', 'sharonogdenbullard@gmail.com', 'Math', 'student01pass'),
(202, 'Vince', 'Dani', 'Woodcock', 'student02@uni.com', 'vincedaniwoodcock@gmail.com', 'Math', 'student02pass'),
(203, 'Isiah', 'Deacon', 'Blakeley', 'student03@uni.com', 'isiahdeaconblakeley@gmail.com', 'Computer Science', 'student03pass'),
(204, 'Earle', 'Derek', 'Tyrell', 'student04@uni.com', 'earlederektyrell@gmail.com', 'Computer Science', 'student04pass'),
(205, 'Gavin', 'Kristi', 'Bronson', 'student05@uni.com', 'gavinkristibronson@gmail.com', 'Biology', 'student05pass');

INSERT INTO faculty (faculty_id, first_name, middle_name, last_name, faculty_email, personal_email, department, password) VALUES
(301, 'Tameka', 'Kirk', 'Weaver', 'faculty01@uni.com', 'tamekakirkweaver@gmail.com', 'Math', 'faculty01pass'),
(302, 'Portia', 'Rosanna', 'Geary', 'faculty02@uni.com', 'portiarosannageary@gmail.com', 'Computer Science', 'faculty02pass'),
(303, 'David', 'Victoria', 'Summers', 'faculty03@uni.com', 'davidvictoriasummers@gmail.com', 'Biology', 'faculty03pass');

INSERT INTO course (course_id, section, title, credits, capacity, syllabus, info, instructor_id, room, department, term, year) VALUES
(401, '001', 'Calculus I', 3, 30, 'syllabus', 'info', 301, 'M101', 'Math', 'Fall', 2020),
(402, '001', 'Calculus II', 3, 30, 'syllabus', 'info', 301, 'M101', 'Math', 'Fall', 2020),
(403, '001', 'Calculus III', 3, 30, 'syllabus', 'info', 301, 'M101', 'Math', 'Fall', 2020),
(404, '001', 'Discrete Mathematics', 3, 30, 'syllabus', 'info', 301, 'M101', 'Math', 'Winter', 2021),
(405, '001', 'Linear Algebra', 3, 30, 'syllabus', 'info', 301, 'M101', 'Math', 'Winter', 2021),
(406, '001', 'Differential Equations', 3, 30, 'syllabus', 'info', 301, 'M101', 'Math', 'Winter', 2021),
(407, '001', 'Computer Science I', 3, 30, 'syllabus', 'info', 302, 'CS102', 'Computer Science', 'Fall', 2020),
(408, '001', 'Computer Science II', 3, 30, 'syllabus', 'info', 302, 'CS102', 'Computer Science', 'Fall', 2020),
(409, '001', 'Data Structures', 3, 30, 'syllabus', 'info', 302, 'CS102', 'Computer Science', 'Winter', 2021),
(410, '001', 'Biology I', 3, 30, 'syllabus', 'info', 303, 'B103', 'Biology', 'Fall', 2020),
(411, '001', 'Biology II', 3, 30, 'syllabus', 'info', 303, 'B103', 'Biology', 'Winter', 2021);

INSERT INTO enrollments (student_id, course_id, grade, status) VALUES
(201, 401, 93, 'Passed'),
(201, 402, 95, 'Passed'),
(201, 403, 86, 'Passed'),
(201, 404, 100, 'Passed'),
(201, 405, 97, 'Passed'),
(201, 406, NULL, 'In Progress'),
(202, 401, 90, 'Passed'),
(202, 402, NULL, 'In Progress'),
(203, 407, 95, 'Passed'),
(203, 408, 100, 'Passed'),
(203, 409, 97, 'Passed'),
(204, 407, 93, 'Passed'),
(204, 408, NULL, 'In Progress'),
(205, 410, 95, 'Passed');

INSERT INTO department (department_name, department_email, department_chair) VALUES
('Math', 'math@uni.com', 301),
('Computer Science', 'computerscience@uni.com', 302),
('Biology', 'biology@uni.com', 303);

INSERT INTO timeblock (timeblock_id, day, start_time, end_time) VALUES
("monday_morning", "Monday", "08:00:00", "11:00:00"),
("monday_afternoon", "Monday", "13:00:00", "16:00:00"),
("tuesday_morning", "Tuesday", "08:00:00", "11:00:00"),
("tuesday_afternoon", "Tuesday", "13:00:00", "16:00:00"),
("wednesday_morning", "Wednesday", "08:00:00", "11:00:00"),
("wednesday_afternoon", "Wednesday", "13:00:00", "16:00:00"),
("thursday_morning", "Thursday", "08:00:00", "11:00:00"),
("thursday_afternoon", "Thursday", "13:00:00", "16:00:00"),
("friday_morning", "Friday", "08:00:00", "11:00:00"),
("friday_afternoon", "Friday", "13:00:00", "16:00:00");

INSERT INTO classroom(room_number, building) VALUES
("M101", "Math Building"),
("CS102", "Computer Science Building"),
("B103", "Biology Building");

INSERT INTO term(term, year, registration_deadline, drop_deadline) VALUES
("Fall", 2020, "2020-09-30", "2020-12-31"),
("Winter", 2021, "2020-1-30", "2020-04-30"),
("Fall", 2021, "2021-09-30", "2021-12-31");

INSERT INTO prerequisites (course_id, prereq_id) VALUES
(402, 401),
(403, 402),
(405, 402),
(405, 404),
(406, 403),
(408, 407),
(409, 407),
(411, 410);

insert into courseblock (course_id, timeblock_id) VALUES
(401, "monday_morning"),
(402, "tuesday_morning"),
(403, "wednesday_morning"),
(404, "monday_morning"),
(405, "tuesday_morning"),
(406, "wednesday_morning"),
(407, "thursday_morning"),
(408, "friday_morning"),
(409, "thursday_morning"),
(410, "monday_afternoon"),
(411, "friday_afternoon");

PRAGMA foreign_keys = ON;`

// insert_new_course_sql
var a = `BEGIN TRANSACTION;

INSERT INTO course (course_id, section, title, credits, capacity, syllabus, info, instructor_id, room, department, term, year) VALUES
(412, "11", "Advanced Data Structures", "3", 20, "Midterm : 20%, Assignments / Labs : 30%, Final Exam : 50%", "Learn about Advanced Data Structures", 302, "CS102", "Computer Science", "Fall", 2021);

INSERT INTO prerequisites (course_id, prereq_id) VALUES
(412, 408),
(412, 409);

INSERT INTO courseblock (course_id, timeblock_id) VALUES
(412, "friday_afternoon"),
(412, "monday_morning");

INSERT INTO course_management (admin_id, course_id, action, date)
VALUES (102, 412, "create new class", DATETIME('now'));

END TRANSACTION;`

// register_for_course_sql
var b = `INSERT INTO enrollments (student_id, course_id, status)
SELECT 203, 412, 'In Progress'
WHERE NOT EXISTS (
    -- check for missing prerequisites
    SELECT 1
    FROM prerequisites p
    LEFT JOIN enrollments e ON p.prereq_id = e.course_id
        AND e.student_id = 203
        AND e.status = 'Passed'
    WHERE p.course_id = 412
    AND e.course_id IS NULL  -- if any prerequisite is missing, this returns rows
) AND NOT EXISTS (
    -- check for time conflicts with other "In Progress" courses
    SELECT 1
    FROM enrollments e
    JOIN courseblock cb1 ON e.course_id = cb1.course_id
    JOIN timeblock tb1 ON cb1.timeblock_id = tb1.timeblock_id
    JOIN courseblock cb2 ON cb2.course_id = 412
    JOIN timeblock tb2 ON cb2.timeblock_id = tb2.timeblock_id
    WHERE e.student_id = 203
    AND e.status = 'In Progress'
    AND tb1.day = tb2.day  -- must be on the same day
    AND tb1.start_time < tb2.end_time  -- ensures Course A starts before Course B ends
    AND tb1.end_time > tb2.start_time  -- ensures Course A ends after Course B starts
) AND (
    -- ensure student has not registered for more than 10 courses in Fall + Winter
    SELECT COUNT(*) FROM enrollments e
    JOIN course c ON e.course_id = c.course_id
    WHERE e.student_id = 203
    AND c.term IN ('Fall', 'Winter')
    AND e.status = 'In Progress'
) < 10 AND (
    -- ensure the current date is before the registration deadline
    SELECT COUNT(*) FROM term t
    JOIN course c ON c.term = t.term
    WHERE c.course_id = 412
    AND t.year = 2021
    -- AND t.registration_deadline >= CURRENT_DATE
) > 0 AND (
    -- ensure the course is not full (current enrollment < capacity)
    SELECT COUNT(*) FROM enrollments
    WHERE course_id = 412
        AND status = 'In Progress'
) < (
    SELECT capacity FROM course WHERE course_id = 412
);`

// retrieve_course_schedule_sql
var c = `SELECT
c.course_id,
c.section,
c.title,
c.credits,
c.room,
c.term,
c.year,
c.instructor_id,
f.first_name || ' ' || f.last_name AS instructor_name,
tb.start_time,
tb.end_time,
tb.day
FROM enrollments e
JOIN course c ON e.course_id = c.course_id
LEFT JOIN courseblock cb ON c.course_id = cb.course_id
LEFT JOIN timeblock tb ON cb.timeblock_id = tb.timeblock_id
LEFT JOIN faculty f ON c.instructor_id = f.faculty_id
WHERE e.student_id = 203
AND e.status = 'In Progress'
ORDER BY c.course_id, tb.timeblock_id;`

// update_capacity_sql
var d = `BEGIN TRANSACTION;

UPDATE course SET
capacity = 25
WHERE course_id = 412;

INSERT INTO course_management (admin_id, course_id, action, date)
VALUES (102, 412, "update class", DATETIME('now'));

END TRANSACTION;`

// list_prereq_sql
var e = `SELECT 
c.title AS course_name,
c.course_id,
pr.title AS prereq_name,
p.prereq_id
FROM 
course c
JOIN 
prerequisites p ON c.course_id = p.course_id
JOIN 
course pr ON p.prereq_id = pr.course_id;`

// list_student_prereq_sql
var f = `SELECT
c.course_id,
c.title,
c.credits,
c.department,
c.room,
tb.start_time,
tb.end_time,
tb.day,
p.prereq_id AS prereq_id,
CASE
    WHEN p.prereq_id IS NULL THEN 'Yes'  -- no prerequisites required
    WHEN NOT EXISTS (
        SELECT 1
        FROM prerequisites pr
        LEFT JOIN enrollments e ON pr.prereq_id = e.course_id
            AND e.student_id = 201
            AND e.status = 'Passed'
        WHERE pr.course_id = c.course_id
        AND e.course_id IS NULL  -- if any prerequisite is missing, return 'No'
    ) THEN 'Yes'
    ELSE 'No'
END AS has_prerequisites
FROM 
course c
LEFT JOIN 
courseblock cb ON c.course_id = cb.course_id
LEFT JOIN 
timeblock tb ON cb.timeblock_id = tb.timeblock_id
LEFT JOIN 
prerequisites p ON c.course_id = p.course_id
LEFT JOIN 
enrollments e ON c.course_id = e.course_id
AND e.student_id = 201
AND e.status = 'Passed'
WHERE 
e.course_id IS NULL
AND has_prerequisites = 'Yes'
ORDER BY 
c.course_id, tb.timeblock_id, p.prereq_id;`

function copyCode() {

    navigator.clipboard.writeText(code);

    if (window.confirm('Code successfully copied. Press "OK" to go to the online compiler to try it out, or press cancel to stay on this page.')) 
        {
        window.open('https://www.programiz.com/sql/online-compiler', '_blank');
        };
}

function copySQL(sql) {

    if (sql == "insert") {
        code = a;
    } else if (sql == "register") {
        code = b;
    } else if (sql == "schedule") {
        code = c;
    } else if (sql == "capacity") {
        code = d;
    } else if (sql == "prereq") {
        code = e;
    } else if (sql == "student_prereq") {
        code = f;
    }

    navigator.clipboard.writeText(code);

}