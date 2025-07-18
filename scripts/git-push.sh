#! /bin/sh

set -x

owner=milahu
repo=von-uns-bekommt-ihr-nix

remotes=(
  https://github.com/$owner/$repo

  # darktea
  http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/$owner/$repo

  # righttoprivacy
  http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/$owner/$repo
)

for remote in "${remotes[@]}"; do
  case "$remote" in
    http://*.onion/*)
      git -c remote."$remote".proxy=socks5h://127.0.0.1:9050 push $remote "$@"
      ;;
    *)
      git push $remote "$@"
      ;;
  esac
done
