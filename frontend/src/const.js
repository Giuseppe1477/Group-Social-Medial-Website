
const BASE_URL = 'https://wgnmuf440l.execute-api.us-east-2.amazonaws.com/dev/';

const SONG_URI = {
  moonlightSonata: 'https://soundcloud.com/glennmorrison/beethoven-moonlight-sonata',
  levels: 'https://soundcloud.com/aviciiofficial/avicii-levels-original-mix',
  musicSoundsBetter: 'https://www.youtube.com/watch?v=FQlAEiCb8m0',
  aroundTheWorld: 'https://www.youtube.com/watch?v=dwDns8x3Jb4',
  anotherBrick: 'https://soundcloud.com/marrucino/another-brick-in-the-wall-pink',
  money: 'https://soundcloud.com/lysergic-dream/pink-floyd-money-dark-side-of',
  backInBlack: 'https://soundcloud.com/rich-rd-hanyu/acdc-back-in-black',
  sevenNationArmy: 'https://www.youtube.com/watch?v=RDuzszjrdcc',
  gtaIII: 'https://soundcloud.com/heika-gerard-gamer/gta-3-theme-song-extended',
  vienna: 'https://www.youtube.com/watch?v=xsEBGhbSKVc',
  laVie: 'https://www.youtube.com/watch?v=9dctaE5SZTo',
}

const DEFAULT_TAGS =  ['Pop', 'Rock', 'Rap', 'Classical', 'Guitar', 'Piano', 'Metal', 'Jazz']
    .map(t => { return {tag: t}});

export {
    BASE_URL,
    SONG_URI,
    DEFAULT_TAGS,
};
