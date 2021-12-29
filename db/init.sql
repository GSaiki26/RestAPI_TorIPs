CREATE TABLE Banned_IPs(
    ip varchar(40) NOT NULL,
    UNIQUE(ip)
);