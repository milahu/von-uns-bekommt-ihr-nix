#!/usr/bin/env bash

mkdir temp
cd temp

wget --mirror --page-requisites --html-extension --convert-links --directory-prefix=. --execute robots=off \
  --user-agent 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36' \
  https://vonunsbekommtihrnix.noblogs.org/

