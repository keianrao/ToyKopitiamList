
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
    '607, Jalan 17/10, Seksyen 17, 46400 Petaling Jaya, Selangor',
    3.122293, 101.6357842);

INSERT
INTO Entries
(name, address, latitude, longitude)
VALUES
    ('51 Kopitiam',
    'B-G-1, BOULEVARD, 51, Jalan SS9A/18, Seksyen 51a, 47300 Petaling Jaya, Selangor',
    3.0875426, 101.6233748);
    
INSERT
INTO Entries
(name, address, latitude, longitude)
VALUES
    ('SS2 Chow Yang Kopitiam',
    '44, Jalan SS2, SS 2, 47300 Petaling Jaya, Selangor',
    3.116198, 101.6172495);