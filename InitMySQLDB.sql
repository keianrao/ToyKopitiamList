
USE ToyKopitiamList;

CREATE
TABLE Entries
(id INTEGER PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(512),
address VARCHAR(1024),
latitude NUMERIC(20,10),
longitude NUMERIC(20,10),
dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT
INTO Entries
(name, address, latitude, longitude)
VALUES
    ('Restaurant Kim Seng',
    '607, Jalan 17/10, Seksyen 17, 46400 Petaling Jaya, Selangor, Malaysia',
    3.122293, 101.6357842);
