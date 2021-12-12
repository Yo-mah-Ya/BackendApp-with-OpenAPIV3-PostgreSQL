DROP TABLE IF EXISTS country_language;
CREATE TABLE country_language (
    country_code CHAR(3) NOT NULL,
    language VARCHAR(30) NOT NULL,
    is_official SMALLINT NOT NULL DEFAULT 0,
    percentage DOUBLE PRECISION NOT NULL,

    PRIMARY KEY (country_code, language),
    CONSTRAINT country_code FOREIGN KEY (country_code) REFERENCES country (code) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS country_language_index_country_code ON country_language(country_code);
