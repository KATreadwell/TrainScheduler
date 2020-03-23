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

var database = firebase.database();
// var timepicker = new TimePicker('time', {
//     lang: 'en',
//     theme: 'dark'
// });
// timepicker.on('change', function (evt) {
//     var value = (evt.hour || '00') + ':' + (evt.minute || '00');
//     evt.element.value = value;
// });

// $("#time").timepicker();

//on press of "Submit", store values in dB and push input values to page
$("#submit").on("click", function (event) {
    event.preventDefault();
    var holdRow = "<div class = 'row'>";
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    // var time = $("#time").val();
    var time = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();
    $("#add-class").append(holdRow);

    // validate that form is completed prior to submission
    function validateForm() {
        if (trainName == "" || destination == "" || frequency == "" || time == "") {
            alert("All fields must be filled out.");
            return false;
        }
        return true;
    }

    if (validateForm()){
        database.ref().push({
            trainName,
            destination,
            time,
            frequency,
        });

        //clears input values
    $("#trainName").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
    }
 
});

// $("#delete").on("click", function (event) {
// function deleteRow(){
//     document.getElementById("currentTable").deleteRow(0);
// }
//     deleteRow();
// });


// grab values and take snapshot of them
database.ref().on("child_added", function(snapshot) {
    var train = snapshot.val();
    console.log(train.time); 
    console.log(moment(train.time));
    var diffTime = moment().diff(moment.unix(train.time), "minutes");
    console.log(diffTime);
    var remainder = diffTime % train.frequency;
    // console.log(remainder);
    var minAway = train.frequency - remainder;
    var nextArrival = moment().add(minAway, "minutes");
    // console.log(minAway);
    var rowInfo = $("<tr>").append(
        $("<td>").text(train.trainName),
        $("<td>").text(train.destination),
        $("<td>").text(train.frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway),
    );

    $("#currentTable").append(rowInfo);
});

