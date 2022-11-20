DROP TABLE IF EXISTS recordings;

CREATE TABLE recordings (
    id INT PRIMARY KEY,
    name TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    recording FLOAT[][][]
);