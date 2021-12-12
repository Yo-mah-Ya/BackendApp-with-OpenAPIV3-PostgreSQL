#!/usr/bin/env bash

source_dir=$(cd $(dirname ${BASH_SOURCE:-0}) && pwd)

user="postgres"
password="password"
host="localhost"
db="world"

PGPASSWORD=${password} psql -h ${host} -U ${user} -d ${db}
