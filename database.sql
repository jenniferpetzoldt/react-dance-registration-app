CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE wed_form (
	id SERIAL PRIMARY KEY,
	start_date DATE NOT NULL,
	form_month VARCHAR(240) NOT NULL,
	form_year INT NOT NULL,
	level_one VARCHAR(240) NOT NULL,
	level_two VARCHAR(240) NOT NULL,
	level_three VARCHAR(240) NOT NULL,
	level_four VARCHAR(240) NOT NULL,
	level_five VARCHAR(240) NOT NULL,
	solo_jazz VARCHAR(240) NOT NULL
);

CREATE TABLE registration (
	id SERIAL PRIMARY KEY,
	person_id INT REFERENCES "person",
	wed_form_id INT REFERENCES "wed_form",
	first_name VARCHAR(240) NOT NULL,
	last_name VARCHAR(240) NOT NULL,
	email VARCHAR(1040) NOT NULL,
	dancer_role VARCHAR(240) NOT NULL,
	admission VARCHAR(240) NOT NULL, 
	first_hour VARCHAR(240),
	second_hour VARCHAR(240),
	payment_type VARCHAR(240) NOT NULL,
	paid INT,
	owes INT,
	week_one VARCHAR(240),
	week_two VARCHAR(240),
	week_three VARCHAR(240),
	week_four VARCHAR(240)
);