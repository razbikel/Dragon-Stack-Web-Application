CREATE TABLE generation(
    id         SERIAL PRIMARY KEY, 
    expiration TIMESTAMP NOT NULL
);

    /* SERIAL is the type, its sequential INTEGER which increments auto when a new item inserted to the table */
    /* PRIMARY KEY for association tables */ 
