# Cropping MP3 with node-fluent-ffmpeg

This makes cropped mp3 using node-fluent-ffmpeg.

Installing `node-fluent-ffmpeg`

```
$ npm install
```

Cropping `src/input.mp3` to `src/output.mp3`.

```
$ node crop.js
```

The length of `output.mp3` will be 30 secs.