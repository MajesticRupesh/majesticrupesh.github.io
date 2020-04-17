function load_data() {
    document.write("loading");
}

var request = new XMLHttpRequest();
    request.open("GET", "data.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(my_JSON_object.age.options[1].value);   // 3
    console.log(my_JSON_object.age.question[0].english);    // how old are you