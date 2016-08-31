
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });

  	var binaryServer = require('binaryjs').BinaryServer;
	var wav = require('wav');

	var server = binaryServer({port: 9001});

	server.on('connection', function(client) {
		var fileWriter = null;
	  	client.on('stream', function(stream, meta) {
	  	  console.log(stream)
		  var fileWriter = new wav.FileWriter('audio_test.wav', {
		    channels: 1,
		    sampleRate: 48000,
		    bitDepth: 16
		  });
		  //stream.pipe();
		  stream.pipe(fileWriter);
		  stream.on('end', function() {
		    fileWriter.end();
		  });
		});

		client.on('close', function() {
		  if (fileWriter != null) {
		    fileWriter.end();
		  }
		});
	});
  	
};