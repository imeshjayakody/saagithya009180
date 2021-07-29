var total_pass = 0;
var total_duration = 0;
var total_age_group = 0;
var total_extras = 0;
var totalCost = 0;
var count = 1;
var final_Booking = 0;
var loyalty = 0;

var ids = ["", "current_Booking", "age__group", "duration_field", "extras_field", "total_field"];
var headings = ["", "Pass:", "Age Group:", "Duration:", "Extras:", "Total:"];

var bookForm = document.getElementById("bookNowForm");
function handleForm(event) { event.preventDefault(); }
bookForm.addEventListener('submit', handleForm);

if (localStorage["Ticket"] == null || localStorage["Ticket"] == NaN || localStorage["Ticket"] == undefined) {
  localStorage["Ticket"] = "0";
}


//Function that is responsible to clear the fields
function clear() {
  for (let a = 5; a >= 1; a--) {
    document.getElementById(ids[a]).innerHTML = "";
  }
  document.getElementById("bookNowForm").reset();
  enable();
  document.getElementById("total_field").innerHTML = "0";
}

//Function that is required to find the Grand Total
function calTotalCost(value) {
  final_Booking = final_Booking + value;
  document.getElementById("grand_total").innerHTML = "Grand Total = " + final_Booking;
}

//Function to display the pass Type
function getPassValue(radio) {
  var pass_value =radio.value
  var pass_name= radio.nextElementSibling.innerText;
  document.getElementById("current_Booking").innerHTML = pass_name;
  total_pass=parseInt(pass_value);
  totalcostcal();
  disable();
}

//function to disable radioButton
function disable(){
  if (document.getElementById("day").checked){
    document.getElementById("Adult1").disabled=true;
    document.getElementById("Child1").disabled=true;
    document.getElementById("Adult2").disabled=true;
    document.getElementById("Child2").disabled=true;
  } 
  else if(document.getElementById("student").checked){
    document.getElementById("Adult").disabled=true;
    document.getElementById("Child").disabled=true;
    document.getElementById("Adult2").disabled=true;
    document.getElementById("Child2").disabled=true;
  }
  else{
    document.getElementById("Adult").disabled=true;
    document.getElementById("Child").disabled=true;
    document.getElementById("Adult1").disabled=true;
    document.getElementById("Child1").disabled=true;
  }
}
//function to enable radio button
function enable(){
  document.getElementById("Adult").disabled=false;
  document.getElementById("Child").disabled=false;
  document.getElementById("Adult1").disabled=false;
  document.getElementById("Child1").disabled=false;
  document.getElementById("Adult2").disabled=false;
  document.getElementById("Child2").disabled=false;
}

//Function to display the Ticket count
function getage(radio){
  var age_value= radio.value;
  var age_name = radio.nextElementSibling.innerText;
  document.getElementById("age__group").innerHTML = age_name;
  total_age_group= parseInt(age_value);
  totalCost();
}

//Function to display the Duration type
function getDurationValue(radio) {
  var duration_price = radio.value;
  var duration_name = radio.nextElementSibling.innerText;
  document.getElementById("duration_field").innerHTML = duration_name;
  total_duration= parseInt(duration_price);
  totalcostcal();
}

//Function to get the information of the selected checkboxes
function getCheckbox() {
  var extraTotal = 0;
  var val = 0;
  var extraname = "";
  
  var checkBoxes = document.getElementById("extrasContainer");
  var checkValue = checkBoxes.getElementsByTagName("input");
  
  for (let a = 0; a < checkValue.length; a++) {
    if (checkValue[a].checked == true) {
      val = parseInt(checkValue[a].value);
      extraname += checkValue[a].name + '<br>';
    }
    else {
      val = 0;
      extraname += "";
    }
    extraTotal = extraTotal + val;
  }
  total_extras = extraTotal;
  document.getElementById("extras_field").innerHTML = extraname;
  totalcostcal();
}

//function to get total cost of booking
function totalcostcal(){
  totalCost= total_pass + total_extras + total_age_group + total_duration;
  document.getElementById("total_field").innerHTML = totalCost;
}

//Place Booking Function
function calBooking() {
    if (count > 1) {
        var confirmationMessage = confirm("You have " + (count - 1) + " item(s) in your Booking, do you wish to checkout?");
        if (confirmationMessage == true) {
            alert("Thank you for Booking!");
            location.reload();
        }else {
          location.reload();
        }
    }
    else {
      alert("Sorry no Bookings have been added or made.");
        location.reload();
    }
}

//Check Loyalty Button Function
function checkLoyalty() {
  if ((count-1)>3){
    for (let i = 1; i<count; i++){
      loyalty=(20*(count))-20;
    }
    alert("Total Loyalty Points Earned : " + loyalty);
  }
  else {
    alert("Book 4 or more Tickets to earn Loyalty ");
  }
}

//Add to favourites function
function addToFav() {
  if (document.getElementById(ids[1]).innerHTML !== "" && document.getElementById(ids[2]).innerHTML !== "" && document.getElementById(ids[3]).innerHTML !== "") {
    var favourite_Booking = [];
    for (let a = 0; a < 5; a++) {
      favourite_Booking[a] = document.getElementById(ids[a + 1]).innerHTML;
    }
    localStorage["fav_Ticket"] = JSON.stringify(favourite_Booking);
    alert("Your Booking has been added to favourites");
  }
  clear();
}

//Add the favourite to Booking
function addFavToBooking() {
  if (localStorage.getItem("fav_Ticket") === null) {
    alert("There is no Booking added to favourites");
  }
  else {
    var getFav = JSON.parse(localStorage["fav_Ticket"]);
    var totalBookingTable = document.getElementById("totalBookingTable");
    var addRow = totalBookingTable.insertRow(-1);
    
    for (let i = 0; i <= 5; i++) {
      var tempcell = addRow.insertCell(i);
      if (i == 0) {
        tempcell.innerHTML = "Ticket " + count;
      }
      else {
        tempcell.innerHTML = headings[i] + getFav[i - 1];
      }
    }
    count++;
    clear();
    calTotalCost(parseInt(getFav[4]));
    var rowLength = document.getElementById('totalBookingTable').rows.length;
    //rows = number of orders, cells in each row represent order attributes.
    for (var i = 0; i < rowLength; i++) {
      document.getElementById('totalBookingTable').rows[i].cells[0].className = "grandTotalContainer";
      document.getElementById('totalBookingTable').rows[i].cells[5].className = "grandTotalContainer";
    }
    total_pass = 0;
    total_age_group=0;
    total_duration = 0;
    total_extras = 0;
  }
}


//Function that is required to add the Current Order to the Total Order Table
function addtoTotalOrder() {
  if (document.getElementById(ids[1]).innerHTML !== "" && document.getElementById(ids[2]).innerHTML !== "" && document.getElementById(ids[3]).innerHTML !== "" ) {
    var totalBookingTable = document.getElementById("totalBookingTable");
    var addRow = totalBookingTable.insertRow(-1);
    for (let i = 0; i <= 5; i++) {
      var tempcell = addRow.insertCell(i);
      if (i == 0) {
        tempcell.innerHTML = "Ticket " + count;
        count=count+1;
      }
      else {
        tempcell.innerHTML = headings[i] + document.getElementById(ids[i]).innerHTML;
      }
    }
    var rowLength = document.getElementById('totalBookingTable').rows.length;
    //rows = number of orders, cells in each row represent order attributes.
    for (var i = 0; i < rowLength; i++) {
      document.getElementById('totalBookingTable').rows[i].cells[0].className = "grandTotalContainer";
      document.getElementById('totalBookingTable').rows[i].cells[5].className = "grandTotalContainer";
    }
    calTotalCost(parseInt(document.getElementById(ids[5]).innerHTML));
    clear();
    total_pass = 0;
    total_age_group=0;
    total_duration = 0;
    total_extras = 0;
  }
}

function submission(){
  alert("Thank you for your Donation!");
}