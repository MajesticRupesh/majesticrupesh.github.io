function load_data() {
    $.getJSON('data.json', function(data) {         
        alert(data);
    });
}