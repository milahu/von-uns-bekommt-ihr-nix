#!/usr/bin/env bash

quality=80
alpha_quality=80

dinn='vonunsbekommtihrnix.noblogs.org/files/*/*'
dout='src/images'

mkdir -p $dout

for i in Orf-3.png Schulden-Geld.png Orf-2-zentriert.png Orf-1-Klein.png
do
  #cp vonunsbekommtihrnix.noblogs.org/files/*/*/$i src/images/$i
  convert $dinn/$i -quality $quality -define webp:alpha-quality=$alpha_quality $dout/$i.webp
  du -sh $dinn/$i $dout/$i.webp
done

