CREATE TABLE dragon(
    id                  SERIAL PRIMARY KEY,
    birthdate           TIMESTAMP NOT NULL,
    nickname            VARCHAR(64),
    gender             VARCHAR(64),
    "isPublic"          BOOLEAN NOT NULL,
    "saleValue"         INTEGER NOT NULL,
    "birthValue"        INTEGER NOT NULL,
    "generationId"      INTEGER,
    likes               INTEGER NOT NULL,
    FOREIGN KEY ("generationId") REFERENCES generation(id)
);

/* VARCHAR(64) is a string in length of 64 */
/* generationId is in "" because PostgreSQL would have lowercase the I in the Id by default */
/* the generationId field is associated with the id field from the generation table */

/*the final row in this schema creates the associative link between the dragon and generation tables 
  this row is a FOREIGN KEY which allow us to uiniqly identify a row(id) in another table (generation) */