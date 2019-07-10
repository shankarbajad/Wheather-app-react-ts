var assert = require('assert');
var nock = require('nock')
nock.recorder.rec({
  dont_print: true
});

var fixtures = nock.recorder.play();

describe('/get cities wheather', () => {
	it('it should GET all the books', (done) => {
		nock('http://api.openweathermap.org/data/2.5/forecast?')
		  .get('q=indore,IN&APPID=f7d1f075a9bdf182ca672cc9c675ada0')
		  .reply(200, {
		    license: {
		      key: 'mit'
		    },
		  })
		done()
	});
});