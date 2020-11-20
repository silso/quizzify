var quiz = {
    data: [
        {
            "Question": "What country has the highest population density",
            "Correct Answer": "monaco",
            "Wrong answer 1": "peru",
            "Wrong answer 2": "dominican republic",
            "Wrong answer 3": "england"
        }, {
            "Question": "What country is the island of Sicily part of",
            "Correct answer": "italy",
            "Wrong answer 1": "uruguay",
            "Wrong answer 2": "czechoslovakia",
            "Wrong answer 3": "persia"
        }, {
            "Question": "In which country was the Rosetta stone found",
            "Correct answer": "egypt",
            "Wrong answer 1": "belarus",
            "Wrong answer 2": "nauru",
            "Wrong answer 3": "ireland"
        }, {
            "Question": "Marco Polo travelled to the Tatar Empire, what is it now called",
            "Correct answer": "china",
            "Wrong answer 1": "montenegro",
            "Wrong answer 2": "french polynesia",
            "Wrong answer 3": "uruguay"
        }, {
            "Question": "Paper money was first used in",
            "Correct answer": "china",
            "Wrong answer 1": "algeria",
            "Wrong answer 2": "philippines",
            "Wrong answer 3": "south africa"
        }
    ]
};

var score = 0
var completion = 0
var ans = 3;
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
    
    $("label.btn").on('click',function () {
    	var choice = $(this).find('input:radio').val();
    	//$('#loadbar').show();
        //$('#quiz').fadeOut()
        $('#answer').html($(this).checking(choice));
        $.when($('#quiz').fadeTo(500, 0))
            .then(function() {
                $('#quiz').show();
            });
        

    	setTimeout(function(){
            //$( "#answer" ).html(  $(this).checking(choice) );      
            //$('#quiz').show();
            //$('#loadbar').fadeOut();
            /* something else */
    	}, 1000);
    });

    $.fn.checking = function(ck) {
        if (ck != ans){
            completion = completion +10
            $( "#completiontext" ).html(String(completion/20)+'/5')
            $( "#scoretext" ).html(String(score/20)+'/5')
            $( "#completion" ).attr({"style":"width: "+String(completion)+"%;","aria-valuenow":String(completion),"aria-valuemin":"0","aria-valuemax":"100"});
            return 'INCORRECT';
        }
        else{
            score = score +10
            completion = completion +10
            $( "#completiontext" ).html(String(completion/20)+'/5')
            $( "#scoretext" ).html(String(score/20)+'/5')
            $( "#score" ).attr({"style":"width: "+String(score)+"%;","aria-valuenow":String(score),"aria-valuemin":"0","aria-valuemax":"100"});
            $( "#completion" ).attr({"style":"width: "+String(completion)+"%;","aria-valuenow":String(completion),"aria-valuemin":"0","aria-valuemax":"100"});
            return 'CORRECT';
        }
    }; 
});	


setInterval(function() {
  
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


