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

async function initRollout() {
  const options = {}

  // Register the flags with Rollout
  Rox.register('', Flags);

  // Setup the Rollout key
  await Rox.setup('5ea2b2fcc5d49a44579da526', options);

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
