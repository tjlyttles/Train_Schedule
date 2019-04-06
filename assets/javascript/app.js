
$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCYf4HR66OdlZi9MKcUPNLHFEjG_vVYeZs",
        authDomain: "trainscheduletracker-e0673.firebaseapp.com",
        databaseURL: "https://trainscheduletracker-e0673.firebaseio.com",
        projectId: "trainscheduletracker-e0673",
        storageBucket: "trainscheduletracker-e0673.appspot.com",
        messagingSenderId: "59235090380"
    };

    firebase.initializeApp(config);

    var database = firebase.database()

    var trainName = ''
    var dest = ''
    var firstTime = ''
    var freq = ''

    $('#add-form').on('click', function(){
        event.preventDefault()       

        trainName = $('#train-input').val().trim()
        dest = $('#dest-input').val().trim()
        firstTime = $('#time-input').val().trim()
        freq = $('#freq-input').val().trim()

        database.ref().push({
            TrainName: trainName,
            Destination: dest,
            FirstTrainTime: firstTime,
            Frequency: freq
        })

        $('#myForm').trigger('reset')

        return false
    })

    database.ref().on('child_added', function(snapshot){
        var sv = snapshot.val()
        
        console.log(sv.FirstTrainTime)
        var timeForm = moment(sv.FirstTrainTime, 'HH:mm').subtract(1, 'years')
        var diffTime = moment().diff(moment(timeForm), 'minutes')
        console.log(diffTime)

        var timeRemain = diffTime % sv.Frequency
        console.log(timeRemain)
        var minsAway = sv.Frequency - timeRemain
        console.log(minsAway)
        var nextTime = moment().add(minsAway, 'minutes')

        $('.table > tbody').append('<tr><td>' + sv.TrainName + '</td><td>' + sv.Destination + '</td><td>' + sv.Frequency + '</td><td>' + nextTime.format('hh:mm') + '</td><td>' + minsAway + '</td></tr>')

    })
})