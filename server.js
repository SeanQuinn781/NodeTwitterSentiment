const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const Twit = require('twit')
const config = require('./config');
const NLP = require('google-nlp');
const datum = require('datumbox').factory(config.datumBox.apiKey);
const morganBody = require('morgan-body');
app.use(bodyParser.json());
const morgan = require('morgan');
var winston = require('./config/winston');
var expressWinston = require('express-winston');
var appRoot = require('app-root-path');

app.use(bodyParser.json());
let requests = morganBody(app);
var options2 = {
  file: {
    level: 'debug',
    filename: `${appRoot}/logs/appReq.log`,
    handleExceptions: true,
    json: true,
    maxsize: 555242880, // 555MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

app.use(morgan('combined', { stream: winston.stream }));
expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')

// serve static files from the React app (change to client/build if directory is moved)
app.use(express.static(path.join(__dirname, 'build')));
app.post('/getTweets', (req, res) => {
  console.log('Twitter username queried: ', req.body.screename);
  const Twitter = new Twit({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token: config.twitter.access_token,
    access_token_secret: config.twitter.access_token_secret
  });
  const screename = req.body.screename;
  Twitter.get('statuses/user_timeline', {
    screen_name: screename, count: 10, method: 'GET'
  }).catch((err) => {
      console.log('caught error', err.stack);
      return err;
    })
    .then((result) => {
      console.log('user_timeline tweets result: ', result.data)
      const tweets = result.data;
      console.log('user_timeline tweets', tweets)
      res.json(tweets)
    })
});

app.post('/getHashtags', (req,res) => {
  const Twitter = new Twit({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token: config.twitter.access_token,
    access_token_secret: config.twitter.access_token_secret
  });
  const hashtag = req.body.hashtag;
  Twitter.get( 'https://api.twitter.com/1.1/search/tweets.json', {
    q: `%23${hashtag}`, count: 10 }).catch((err) => {
      console.log('caught error', err.stack);
      return err;
    })
    .then((result) => {
      const tweets = result.data.statuses;
      console.log('hashtag results ', tweets);
      res.json(tweets)
    })
});

app.post('/googleSentiment', (req, res) => {
  const tweetText = req.body.tweetText;
  const API_KEY = config.google.apiKey;
  const nlp = new NLP(key=API_KEY);
  nlp.analyzeSentiment(tweetText)
    .then((result) => {
      const sentiment = result.documentSentiment;
      console.log('nlp sentiments ', sentiment);
      res.json(sentiment);
    }).catch((err) => {
      console.log('nlp err ', err);
      return err;
    });
});

app.post('/datumBoxSentiment', (req,res) => {
  const tweetText = req.body.tweetText;
  datum.twitterSentimentAnalysis(tweetText, (err, sentiment) => {
    if (err) {
      console.log('datumbox error ', err);
      return err;
    }
    console.log('datumbox sentiment ', sentiment);
    res.json(sentiment);
  });
})

const port = config.port;
app.listen(port, () => `Server running on port ${port}`);
