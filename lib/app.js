var express = require('express'),
    app = express(),
    package = require('../package'),
    config = require('../config'),
		jobs = require('../jobs');
		

app.set('view engine', 'pug');

app.get('/status',function (req, res) {
    res.json({ app: package.name, version: package.version });
});

app.get('/jobs',function (req, res) {
  res.render('jobs', jobs);
});

app.get('/jobs.json',function (req, res) {
	res.json(jobs['jobs']);
});

app.get('/2/jobs.json',function (req, res) {
	res.json(jobs);
});

app.use(express.static(__dirname + '/../public'));

module.exports = app;
