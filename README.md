# Introductions

install packages and compile all workspace packages

```sh
yarn install
```

The common package is linked as a symbolic link
check it out

```
cd ./node_modules/@backend
ln -s ../../packages/common .
```

# local development

## common

create tables and insert sample data

```
service postgresql start
./resources/common/ddl.sh
```

## api

### build and start or do tests

```
yarn workspace @backend/api build
yarn workspace @backend/api start
yarn workspace @backend/api test
```

### with environment values

```
./resources/api/local_dev.sh compile
./resources/api/local_dev.sh start
./resources/api/local_dev.sh test
```

### add libraries to the entire project

```
yarn workspace add `some package` -W
or
yarn workspace add --dev `some package` -W
```

### OpenAPI docs

open shown below on the Web browser

```
localhost:3000/api-docs/#
```

# Directories

tree -I "node_modules|build"
