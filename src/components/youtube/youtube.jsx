import React from 'react';
import Youtube from 'react-youtube';

const YoutubePlayer = (props) => {
  const opts = {
    playerVars: {
      autoplay: 1,
      height: '0',
      width: '0',
      controls: '0',
      showinfo: '0',
      modestbranding: '1',
      fs: '0',
      mute: '1',
      modestbranding: '',
      rel: '0',
    },
  };

  const {TrailerUrl, myClass} = props;

  return <Youtube opts={opts} className={myClass} videoId={TrailerUrl} />;
};

export default YoutubePlayer;
