import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './SentimentUI.css';

const pallete = darkBaseTheme.palette;

const SentimentUI = ({
 passTweets, onInputChange, fieldType, fieldValue
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (fieldType === 'screename') {
      const screename = e.target.elements.screename.value;
      fetch('/getTweets', {
        method: 'POST',
        body: JSON.stringify({
          screename
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials' : true
         }
      })
        .then(res => res.json())
        .then(tweets => {
          if (tweets) passTweets(tweets);
        });
    } else if (fieldType === 'hashtag') {
      const hashtag = e.target.elements.hashtag.value;
      fetch('/getHashtags', {
        method: 'POST',
        body: JSON.stringify({
          hashtag
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials' : true
        }
      })
        .then(res => res.json())
        .then(tweets => {
          if (tweets) passTweets(tweets);
        });
    }
  };
  return (
    <main style={{ backgroundColor: pallete.canvasColor }}>
      <form
        className="input-ui"
        onSubmit={handleSubmit}
        style={{ backgroundColor: pallete.canvasColor }}
      >
        <div
          className="input-top"
          style={{ backgroundColor: pallete.primary1Color }}
        >
          <h1>Enter Screename or Hashtag</h1>
        </div>
        <div className="inputs">
          <TextField
            onChange={e => onInputChange(e)}
            className="hashtag"
            floatingLabelText="Hashtag"
            name="hashtag"
          />
        </div>
        <div className="inputs">
          <TextField
            onChange={e => onInputChange(e)}
            className="screename"
            floatingLabelText="Twitter Screename"
            name="screename"
          />
        </div>

        <div className="input-bottom">
          <RaisedButton
            label="submit"
            type="submit"
            buttonStyle={{ backgroundColor: pallete.accent2Color }}
          />
        </div>
      </form>
      <aside>
        <p>
          This app uses the{' '}
          <a href="https://developer.twitter.com/en/docs"
            style={{ color: pallete.primary1Color }}
          >
           Twitter API
          </a>, the {' '}
          <a
            href="https://cloud.google.com/natural-language/docs/basics"
            style={{ color: pallete.primary1Color }}
          >
            Google NLP API
          </a>{' '}
          and the{' '}
          <a
            href="https://www.datumbox.com/machine-learning-api/"
            style={{ color: pallete.primary1Color }}
          >
            Datumbox Sentiment API
          </a>{' '}
          to get results.
        </p>
      </aside>
    </main>
  );
};

SentimentUI.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  tweets: PropTypes.array,
  fieldType: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired,
  passTweets: PropTypes.func.isRequired
};

export default SentimentUI;

