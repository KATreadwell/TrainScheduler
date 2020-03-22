var firebaseConfig = {
    apiKey: "AIzaSyD9a8FeQuBkK2FSJBEd847V13dZ4G4R0nQ",
    authDomain: "trainscheduler-e81d0.firebaseapp.com",
    databaseURL: "https://trainscheduler-e81d0.firebaseio.com",
    projectId: "trainscheduler-e81d0",
    storageBucket: "trainscheduler-e81d0.appspot.com",
    messagingSenderId: "728984868764",
    appId: "1:728984868764:web:1360d2e3ee7333de395a59"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Global Variables
var database = firebase.database();
var trainName = "";
var destination = "";
var time = new Date();
console.log(time);
// var timeConverted = moment(time, "HH:mm").subtract(1, "years");
// console.log(timeConverted);
var frequency = 0;
console.log(frequency);
var currentTime = moment();
console.log(currentTime);
var diffTime = moment().diff(moment(time), "minutes");
console.log(diffTime);
var remainder = diffTime % frequency;
console.log(remainder);
var minTillTrain = frequency - remainder;
console.log(minTillTrain);
var minAway = moment().add(minTillTrain, "minutes");
console.log(minAway);

var timepicker = new TimePicker('time', {
    lang: 'en',
    theme: 'dark'
});
timepicker.on('change', function (evt) {
    var value = (evt.hour || '00') + ':' + (evt.minute || '00');
    evt.element.value = value;
});

//on press of "Submit", store values in dB and push input values to page
$("#submit").on("click", function(event) {
    event.preventDefault();
    var holdRow = "<div class = 'row'>";
    $("#add-class").append(holdRow);

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim(); 
    time = $("#time").val(); 
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName, 
        destination: destination,
        time: time,
        frequency: frequency,
    });

    var rowInfo = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(time),
        $("<td>").text(minAway),
     );
    
     $("#currentTable").append(rowInfo);
     $("#trainName").val("");
     $("#destination").val("");
     $("#time").val("");
     $("#frequency").val("");
  });

//grab values and take snapshot of them
// database.ref().on("child_added", function(snapshot) {
//     console.log(snapshot.val());
//     console.log(snapshot.val().employeeName);
//     console.log(snapshot.val().role);
//     console.log(snapshot.val().startDate);
//     console.log(snapshot.val().monthlyRate);
// });

