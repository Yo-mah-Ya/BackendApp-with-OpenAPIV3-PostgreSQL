#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-0}) && pwd)
cd ${SOURCE_DIR}


user="postgres"
password="password"
host="localhost"
database="world"

export PGPASSWORD=${password}
psql -U postgres -d postgres -h ${host} -c "DROP DATABASE IF EXISTS ${database};"
psql -U postgres -d postgres -h ${host} -c "CREATE DATABASE ${database};"


psql_command="psql -U ${user} -d ${database} -h ${host}"

# create table
dirs=("country" "countryLanguage" "city")
for d in ${dirs[@]} ; do
    if [ -d $d ] ; then
        ${psql_command} -f ./$d/ddl.sql
        ${psql_command} -f ./$d/sample_data.sql
    fi
done
