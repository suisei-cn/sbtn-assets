#!/bin/bash

NONAUDIO=$(file -- assets/*.mp3 | grep -v "Audio")

if [ "$NONAUDIO" != "" ]; then
  echo "Non-audio files found!"
  echo $NONAUDIO
  exit 1
fi
