import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './Tweets.css';
import PropTypes from 'prop-types';

const pallete = darkBaseTheme.palette;
const Tweets = ({ tweets, googleSentiments, datumboxSentiments }) => {
  console.log(googleSentiments);
  const renderTweets = [];
  const positive = {
    borderRadius: '.4em',
    padding: '.1em',
    color: 'rgba(105, 255, 95, 1)'
  };

  const negative = {
    borderRadius: '.4em',
    padding: '.1em',
    color: 'rgb(244, 67, 54)'
  };

  const neutral = {
    borderRadius: '.4em',
    padding: '.1em',
    color: '#000'
  };
  const sentimentColor = (sentiment) => {
    if (sentiment === 'positive') {
      return positive;
    } else if (sentiment === 'neutral') {
      return neutral;
    }
    return negative;
  };
  const renderDatumboxSentiments = datumboxSentiments.map(sentiment => (
    <div className="datumboxSentiments" style={sentimentColor(sentiment)}>
      <h4 className="apiLabel">Datumbox sentiment:</h4>
      <p className="sentiment">{sentiment}</p>
    </div>
  ));

  const renderGoogleSentiments = googleSentiments.map(sentiment => (
    <div
      className="googleSentiments"
      style={sentiment.polarity > 0 ? positive : negative}
    >
      <h4 className="apiLabel">Google sentiment:</h4>
      <p>
        <span>Sentiment: </span> {sentiment.polarity}
      </p>
      <p>
        <span>Emotion: </span>
        {sentiment.magnitude}
      </p>
    </div>
  ));

  tweets.forEach((tweet, i) => {
    renderTweets.push(
      <div
        className="tweet"
        key={tweet.id}
        href={`https://twitter.com/statuses/${tweets[i].id_str}`}
        target="_blank"
      >
        <div
          className="tweet-top"
          style={{ backgroundColor: pallete.accent2Color }}
        >
          <h4>{tweet.user.name}</h4>
        </div>
        <img src={tweets[i].user.profile_image_url_https} alt="profile" />
        <p className="tweetText">{tweet.text}</p>
        {renderGoogleSentiments[i]}
        {renderDatumboxSentiments[i]}
      </div>
    );
  });
  return (
    <div
      className="wrapper"
      style={{
        backgroundColor: tweets.length ? '#2a2a2a' : ''
      }}
    >
      {renderTweets}
    </div>
  );
};

Tweets.defaultProps = {
  tweets: [],
  googleSentiments: [],
  datumboxSentiments: []
};

Tweets.propTypes = {
  tweets: PropTypes.array,
  googleSentiments: PropTypes.array,
  datumboxSentiments: PropTypes.array
};

export default Tweets;
