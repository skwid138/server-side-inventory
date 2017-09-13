-- DB name: inventory
-- could have DB create command here

-- create syntax for table
CREATE TABLE inventory (
	id SERIAL PRIMARY KEY,
	item varchar(200)
);