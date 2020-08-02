import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import logo from './logo.svg';
import SentimentUI from './components/SentimentUI/SentimentUI';
import Tweets from './components/Tweets/Tweets';
import './App.css';

const pallete = darkBaseTheme.palette;

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      datumboxSentiments: [],
      googleSentiments: [],
      fieldType: '',
      fieldValue: ''
    };
    this.getSentiment = this.getSentiment.bind(this);
    this.passTweets = this.passTweets.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(e) {
    this.setState({
      datumboxSentiments: [],
      googleSentiments: [],
      fieldType: e.target.name,
      fieldValue: e.target.value
    });
  }
  getSentiment(tweets) {
    const tweetTextArr = tweets.map(tweet => tweet.text);
    tweetTextArr.forEach((tweet) => {
      fetch('/googleSentiment', {
        method: 'POST',
        body: JSON.stringify({
          tweetText: tweet
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin' : '*',
	        'Access-Control-Allow-Credentials' : true,
        }
      })
        .then(res => res.json())
        .then(sentiment =>
          this.setState(prevState => ({
            googleSentiments: [...prevState.googleSentiments, sentiment]
          }))
        );

      fetch('/datumBoxSentiment', {
        method: 'POST',
        body: JSON.stringify({
          tweetText: tweet
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
	        'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials' : true
         }
      })
        .then(res => res.json())
        .then(sentiment => {
          this.setState(prevState => ({
            datumboxSentiments: [...prevState.datumboxSentiments, sentiment]
          }));
        });
    });
  }

  passTweets(tweets) {
    this.setState({ tweets });
    this.getSentiment(tweets);
  }

  render() {
    const {
      state: {
        tweets,
        googleSentiments,
        datumboxSentiments,
        fieldType,
        fieldValue
      }
    } = this;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App" style={{ backgroundColor: pallete.canvasColor }}>
          <header className="App-header">
            <div>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div>
              <h1 className="App-title">Twitter Sentiment Analysis</h1>
              <p>Analyze tweet sentiment using a username or hashtag</p>
            </div>
          </header>
          <SentimentUI
            fieldType={fieldType}
            fieldValue={fieldValue}
            onInputChange={this.onInputChange}
            passTweets={this.passTweets}
          />
          <Tweets
            datumboxSentiments={datumboxSentiments}
            googleSentiments={googleSentiments}
            tweets={tweets}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
