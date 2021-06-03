CREATE TABLE accountLikes(
    "accountId"  INTEGER REFERENCES account(id),
    "dragonId"   INTEGER REFERENCES dragon(id),
    "username"        VARCHAR(64),
    PRIMARY KEY ("accountId", "dragonId")
);