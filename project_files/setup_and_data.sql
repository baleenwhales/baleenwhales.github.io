DROP TABLE Customers;
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
    notification_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    courseID INTEGER,
    facultyID INTEGER,
    adminID INTEGER,
    FOREIGN KEY (courseID) REFERENCES course(course_id),
    FOREIGN KEY (facultyID) REFERENCES faculty(faculty_id),
    FOREIGN KEY (adminID) REFERENCES admin(admin_id)
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

PRAGMA foreign_keys = ON;