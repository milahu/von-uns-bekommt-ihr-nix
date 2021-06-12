#!/usr/bin/env bash

false && {
  git remote add darktea http://milahu@it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/von-uns-bekommt-ihr-nix.git
}

torsocks git push -u darktea master
