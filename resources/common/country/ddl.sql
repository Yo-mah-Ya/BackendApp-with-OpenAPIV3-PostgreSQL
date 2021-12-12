DROP TYPE IF EXISTS continent;
CREATE TYPE continent AS ENUM ('Asia','Europe','North America','Africa','Oceania','Antarctica','South America');
DROP TABLE IF EXISTS country;
CREATE TABLE country (
    code CHAR(3) NOT NULL PRIMARY KEY,
    name VARCHAR(52) NOT NULL,
    continent continent NOT NULL,
    region VARCHAR(26) NOT NULL,
    surface_area DOUBLE PRECISION NOT NULL,
    independent_year smallint,
    population INT NOT NULL,
    life_expectancy DOUBLE PRECISION,
    gnp DOUBLE PRECISION,
    gnp_old DOUBLE PRECISION,
    local_name VARCHAR(45) NOT NULL,
    government_form VARCHAR(45) NOT NULL,
    head_of_state VARCHAR(60),
    capital INT,
    code2 CHAR(2) NOT NULL
);
