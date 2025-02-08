// Check the network state before writing data
firebase.database().ref('/').onDisconnect().set({ isOffline: true }).then(() => {
  firebase.database().ref('/').once('value', (snapshot) => {
    if (snapshot.exists()) {
      // Data exists, proceed with write operation
       firebase.database().ref('/').set({data:'test'}).catch(error => {
         console.error('Error writing data:', error);
      });
    } else {
      // Handle the case where data does not exist
    }
  });
});
// Listen for network state changes
firebase.database().on('value', (snapshot) => {
  if (snapshot.val() === null) {
    console.log('Network is offline');
  } else {
    console.log('Network is online');
  }
});