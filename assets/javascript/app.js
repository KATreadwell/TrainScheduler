var firebaseConfig = {
    apiKey: "AIzaSyD9a8FeQuBkK2FSJBEd847V13dZ4G4R0nQ",
    authDomain: "trainscheduler-e81d0.firebaseapp.com",
    databaseURL: "https://trainscheduler-e81d0.firebaseio.com",
    projectId: "trainscheduler-e81d0",
    storageBucket: "trainscheduler-e81d0.appspot.com",
    messagingSenderId: "728984868764",
    appId: "1:728984868764:web:1360d2e3ee7333de395a59"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var trainName = "";
  var destination = "";
  var nextArrival = new Date();
  var minutesAway;
  var now = moment();
  var timepicker = new TimePicker('time', {
    lang: 'en',
    theme: 'dark'
  });
  timepicker.on('change', function(evt) {
    
    var value = (evt.hour || '00') + ':' + (evt.minute || '00');
    evt.element.value = value;
  
  });
