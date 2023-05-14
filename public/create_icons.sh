#!/usr/bin/sh

rm -rf icons
mkdir icons

icon_sizes="16 32 48 64 128 256"

for size in ${icon_sizes}
do
  inkscape --export-filename=icons/icon-${size}.png --export-width ${size} ./icon_master.svg
done

# ImageMagick doesn't compress ico files well, so we will only include the smaller images.
convert icons/icon-16.png icons/icon-32.png icons/icon-48.png ./favicon.ico
