function load_data() {
    var request = new XMLHttpRequest();
    request.open("GET", "data.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(my_JSON_object);
    console.log(my_JSON_object.age.question);
}