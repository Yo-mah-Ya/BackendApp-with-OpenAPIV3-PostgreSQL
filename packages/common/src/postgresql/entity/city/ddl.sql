DROP TABLE IF EXISTS city;
CREATE TABLE city (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(35) NOT NULL,
    country_code CHAR(3) NOT NULL,
    district VARCHAR(20) NOT NULL,
    population INT NOT NULL DEFAULT 0,

    CONSTRAINT country_code FOREIGN KEY (country_code) REFERENCES country (code)
);
CREATE INDEX IF NOT EXISTS city_index_country_code ON city(country_code);
