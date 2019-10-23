## Twitter Sentiment Analysis

# Built with:

- React
- Node
- DatumBox Sentiment API
- Google Sentiment API

# Description:

Analyze tweet sentiment using an username or hashtag using two sentiment APIs. I originally created this app a couple years ago but it is tested on:

Node 10.17.0
Npm  6.11.3

The live app is running on Herkoku and can be tried out at: 
https://salty-journey-93853.herokuapp.com/

# Requirements

In order to run this app, you will need to sign up for the following free APIs:

1. The Datumbox Machine Learning API:
 https://www.datumbox.com/machine-learning-api/ 

2. The Google Natural Language Processing API:
   https://cloud.google.com/natural-language/docs/basics

3. The Twitter API https://developer.twitter.com/en/docs


After signing up for the APIs, create a file called 'config.js' in the application root with the following API credentials:

const config = {
  twitter: {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
  },
  google: {
    "apiKey" : ''
  },
  datumBox: {
    "apiKey" : '',
  },
  port: process.env.PORT || 3000
};

module.exports = config;

To change ports or HOST to a live URL edit the .env file

# Usage


1. Install dependencies and run the app: 
```
   npm install
   npm start
```

API requests will be visible via terminal output

2. Go to http://0.0.0.0:3000/ to see the App


TODO:

Dockerfile
Get All Tweets
MongoDB to store tweet sentiment over time, or requests
npm audit fix