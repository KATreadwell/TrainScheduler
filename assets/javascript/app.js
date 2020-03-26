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

//use Google for authentication
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });


//on press of "Submit", store values in dB and push input values to page
$("#submit").on("click", function (event) {
    event.preventDefault();
    var holdRow = "<div class = 'row'>";
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
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

    if (validateForm()) {
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

// grab values and take snapshot of them
database.ref().on("child_added", function (snapshot) {
    var train = snapshot.val();
    var diffTime = moment().diff(moment.unix(train.time), "minutes");
    var remainder = diffTime % train.frequency;
    var minAway = train.frequency - remainder;
    var nextArrival = moment().add(minAway, "minutes");
    var rowInfo = $("<tr>").append(
        $("<td>").text(train.trainName),
        $("<td>").text(train.destination),
        $("<td>").text(train.frequency),
        $("<td>").text(moment(nextArrival).format("HH:mm")),
        $("<td>").text(minAway),
        $("<td>").append('<button class="btn"><i class="fa fa-trash"></i></button>'),
        $("<td>").append('<button class="btn"><i class="fa fa-pencil"></i></button>'),
    );

    $("#currentTable").append(rowInfo);  
})

