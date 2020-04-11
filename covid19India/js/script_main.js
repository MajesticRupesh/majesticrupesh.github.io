var colorMode = 1; // 1 for light 0 for dark

function func(event) {
    if(event.target.checked) {
        $('.navbar').removeClass('navbar-dark');
        $('.navbar').addClass('navbar-light');
        $('.navbar').removeClass('bg-dark');
        $('.navbar').addClass('bg-light');
    }
    else {
        $('.navbar').removeClass('navbar-light');
        $('.navbar').addClass('navbar-dark');
        $('.navbar').removeClass('bg-light');
        $('.navbar').addClass('bg-dark');
    }
    console.log("changed" + event.target.checked);
}