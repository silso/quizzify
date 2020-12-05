function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function submitForm() {
    var x = document.getElementById("name").value;
    document.getElementById("name1").innerHTML = "Name: " + x;

    var x = document.getElementById("home").value;
    document.getElementById("home1").innerHTML = "Home: " + x;

    var x = document.getElementById("education").value;
    document.getElementById("education1").innerHTML = "Education: " + x;

    var x = document.getElementById("birthday").value;
    document.getElementById("birthday1").innerHTML = "Birthday: " + x;

    var x = document.getElementById("profession").value;
    document.getElementById("profession1").innerHTML = "Profession: " + x;

    var x = document.getElementById("bio").value;
    document.getElementById("bio1").innerHTML = x;


    document.getElementById("myForm").style.display = "none";
}
