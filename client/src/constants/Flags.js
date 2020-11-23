// import rox-browser from npm

import Rox from 'rox-browser'
import UserRepo from  '../store/UserRepo'

// define an exported object that contains the flags
const Flags = {
  followingView: new Rox.Flag(),
  history: new Rox.Flag(),
  shuffle: new Rox.Flag(),
  showoverride: new Rox.Flag(),
  repeat: new Rox.Flag(),
  jsonNba: new Rox.Variant('j1', ['j1', 'j2', 'j3']),
  startFollowingWord: new Rox.Variant('Follow', ['Follow', 'Start Following', 'Watch Him'])
};

const roxContainer = {
  title: new Rox.Configuration("Welcome"),
  useCDN: new Rox.Configuration(true),
  networkTimeout: new  Rox.Configuration(100),
  opacity: new Rox.Configuration(0.7)
};

async function initRollout() {
  const options = {}

  // Register the flags with Rollout
  Rox.register('', Flags);
  Rox.register('configs', roxContainer);
  // Setup the Rollout key
  await Rox.setup('5fbbbd683781a16e075d0ad7', options);

}

initRollout().then(function() {
  console.log('Done loading Rollout');
});

Rox.setCustomStringProperty('plan', () => UserRepo.getUser().plan);
Rox.setCustomStringProperty('email', () => UserRepo.getUser().email);
Rox.setCustomNumberProperty('playlist_count', () => UserRepo.getUser().playlistCount);
Rox.setCustomStringProperty('soundcloud_id', () => UserRepo.getUser().id);


//;
export default Flags;
