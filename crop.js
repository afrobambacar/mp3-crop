'use strict'

const ffmpeg = require('fluent-ffmpeg');
const input = 'src/input.mp3';

const getDuration = (source) => {
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(source, (err, metadata) => {
			if (err) {
				reject(err);
			} else {
				const duration = metadata.format.duration;
				const highlight = duration * 0.50;
				const seek = Math.round(highlight, 1);
				resolve({
					source: source,
					seek: seek,
					duration: 30
				});
			}
		});
	});
};

const save = (config) => {
	return new Promise((resolve, reject) => {
		ffmpeg(config.source)
			.audioCodec('libmp3lame')
			.audioChannels(2)
			.audioBitrate(128)
			.seek(config.seek)
			.duration(config.duration)
			.format('mp3')
			.on('codecData', (data) => {
		    console.log('Input is ' + data.audio + ' audio ' + 'with ' + data.video + ' video');
		  })
		  .on('progress', (progress) => {
		    console.log('Processing: ' + progress.percent + '% done');
		  })
			.on('error', (err) => {
		    reject(err);
		  })
		  .on('end', () => {
		    console.log('Processing finished !');
		    resolve();
		  })
		  .save('src/output.mp3');
	});
};

Promise.resolve(input)
	.then(getDuration)
	.then(save)
	.then(null, function (err) {
		console.log(`err: ${err}`);
	});
