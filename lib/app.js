var express = require('express'),
    _ = require('underscore'),
    app = express(),
    path = require('path'),
    package = require('../package'),
    config = require('../config'),
    jobsData = require('../jobs'),
    jobs = jobsData.jobs,
    timestamp = jobsData.timestamp,
    version = jobsData.version,
    moment = require('moment');
    locations = require('../locations').locations,
    dateFormat = 'llll';
		

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/status',function (req, res) {
    res.json({ app: package.name, version: package.version });
});

app.get('/jobs',function (req, res) {
  var timestampSince = moment(timestamp).fromNow(),
      timestampReadable = moment(timestamp).format(dateFormat),
      titleFn = function(val) {
        var title = val.title;
        
        if (title.indexOf(',') != -1)
            title = title.substr(0, title.indexOf(','));

        if (title.indexOf(' -') != -1)
        title = title.substr(0, title.indexOf(' -'));

        return title.trim();
      },
      titles = _.chain(jobs).map(titleFn).sort().uniq().value();

  res.render('jobs', {
    timestampSince,
    timestampReadable,
    locations,
    titles,
    jobs
  });
});

app.get('/jobs.json',function (req, res) {
	res.json(jobs);
});

app.get('/2/jobs.json',function (req, res) {
	res.json(jobsData);
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '..', 'bower_components')));

module.exports = app;
