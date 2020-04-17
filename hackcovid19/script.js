function load_data() {
    $.getJSON('data.json', function(data) {         
        console.log(data.responseText);
    });
}