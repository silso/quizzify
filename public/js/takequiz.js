//from stackoverflow
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const answerColName = ['Correct answer', 'Wrong answer 1', 'Wrong answer 2', 'Wrong answer 3'];
function showQuestion(question) {
    $('#qid').html(question['Question']);
    let answers = answerColName.map(colName => [colName, question[colName]]);
    shuffle(answers);

    let html = ``;
    for (let i = 0; i < answers.length; i++) {
        const [colName, answer] = answers[i];
        html += `
            <label class='btn btn-lg btn-primary btn-block' style='
                animation: animationFrames ease ${i*0.2 + 0.5}s;
                animation-iteration-count: 1;
                transform-origin: 50% 50%;
            '>
                <span class='btn-label'>
                    <i class='fa fa-chevron-right fa-3x'></i>
                </span>
                <input type='radio' name='answer' value='${colName}'>
                ${answer}
            </label>
        `;
    }
    $('#quiz').html(html);
}

var score = 0;
var completion = 0;
var qCount = quiz.data.length;
var now = new Date()
var target  = new Date();
target.setTime(now.getTime() + (5 * 60 * 1000));
$(function(){
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
    	loading.hide();
    });
    
    function askQuestion(questionIndex) {
        if (completion >= qCount) {
            $('#quiz').html('');
            $('#qid').html('Good work!');
            clearInterval(interval);
            return;
        }

        showQuestion(quiz.data[questionIndex]);

        $('#quiz input').on('change', function () {
            $('#quiz label').fadeTo(100, 0, function() {
                let choice = $('#quiz').serializeArray()[0].value;
                console.log(choice);
                $('#answer').html($(this).checking(choice));

                askQuestion(questionIndex + 1);
            });
            return false;
        });
    }

    $.fn.checking = function(choice) {
        completion += 1;
        score += (choice === 'Correct answer') ? 1 : 0;
        $( "#completiontext" ).html(`${completion}/${qCount}`);
        $( "#scoretext" ).html(`${score}/${qCount}`);
        $( "#score" ).attr({"style":`width: ${score/qCount*100}%;`,"aria-valuenow":String(score/qCount*100),"aria-valuemin":"0","aria-valuemax":"100"});
        $( "#completion" ).attr({"style":`width: ${completion/qCount*100}%;`,"aria-valuenow":String(completion/qCount*100),"aria-valuemin":"0","aria-valuemax":"100"});
        if (choice === 'Correct answer') {
            return 'CORRECT';
        }
        else {
            return `INCORRECT, correct answer was "${quiz.data[completion - 1]['Correct answer']}"`;
        }
    };

    askQuestion(0);

    let interval = setInterval(function() {
      
        var now = new Date().getTime();
        
        // Find the distance between now and the count down date
        var distance = target - now;
      
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        // Display the result in the element with id="demo"
        document.getElementById("timertext").innerHTML = minutes + "m " + seconds + "s ";
        $( "#timer" ).attr({"style":"width: "+String((distance/(5 * 60 * 1000)*100))+"%;","aria-valuenow":String((distance/(5 * 60 * 1000)*100)),"aria-valuemin":"0","aria-valuemax":"100"});
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("timertext").innerHTML = "EXPIRED";
          alert("Out of time")
        }
    }, 1000);
});


