DROP TABLE IF EXISTS recordings;

CREATE TABLE recordings (
    id SERIAL PRIMARY KEY,
    name TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    recording FLOAT[][][]
);