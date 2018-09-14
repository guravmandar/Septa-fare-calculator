var obj;
var data;
var purchaseType;

/* function where you are loading an object from JSON to javascript & loading data (which came from JSON file) from javascript to html*/
window.onload = function() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {

      check = document.getElementById('zones');
      info = document.getElementById('info');
      if (check.selectedIndex == 0 || info.selectedIndex == 0) {
        console.log("Disabled");
        document.getElementById('ride').disabled = true;
      }

      obj = JSON.parse(http.response);
      //console.log(obj);
      //console.log(obj.zones);
      data = obj.zones;
      var select = document.getElementById("zones");
      for (index in data) {
        select.options[select.options.length] = new Option(data[index].name, data[index].zone);
      }
      var type = document.getElementById("info");
      for (index in data) {
        if (index % 2 == 0) {
          type.options[type.options.length] = new Option(data[index].fares[index].type, data[index].fares[index].type);
        }

      }

    }
  }
  http.open("GET", "data/fares.json", true);
  http.send();
};

var zone;
var days;
var rides;

/* Getting user input values from html to javascript & doing calculation  for fare based on data from JSON file*/
function values(zone, days, rides) {
  var product;
  var price;
  var val = data[zone - 1];
  // console.log(val);
  // console.log(val.fares.length);
  // console.log(val.fares[1].type);
  // console.log(val.fares[1].purchase);


  console.log(days);
  for (var i = 0; i < val.fares.length; i++) {
    if (days == val.fares[i].type && purchaseType == val.fares[i].purchase) {
      if (val.fares[i].type == "anytime") {
        price = val.fares[i].price / val.fares[i].trips;
        //console.log(price);
      } else {
        price = val.fares[i].price;
        //console.log(price);
      }
      product = rides * price;
      return product;


    }

  }
}

/*Taking value of radio-box from html file & storing it in javascript for calculation purpose */
function toggle() {
  if (document.getElementById("rdo1").checked) {
    purchaseType = document.getElementById("rdo1").value;
    //console.log(purchaseType);
  } else if (document.getElementById("rdo2").checked) {
    purchaseType = document.getElementById("rdo2").value;
    //console.log(purchaseType);
  }
}
