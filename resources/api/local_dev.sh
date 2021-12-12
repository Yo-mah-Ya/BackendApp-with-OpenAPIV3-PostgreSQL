#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-0}) && pwd)
cd ${SOURCE_DIR}/../../

export $(cat resources/api/.local.env | grep -v ^\#)

case "$1" in
	"compile") yarn workspace @backend/api compile;;
    "start") yarn workspace @backend/api start;;
    "test") yarn workspace @backend/api test;;
esac
