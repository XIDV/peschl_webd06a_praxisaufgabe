$(() => {
    console.log('Document ready for action ...');

    setNameOut();

    $('#name').on('keyup', e => {
        $('#instantReprint').val($(e.target).val());
    });

    $('#name').on('focusout', e => {
        if($(e.target).val() === '') {
            $('#submit').trigger('click');
        }
    });

    $('#submit').on('click', e => {
        setNameOut($('#name').val());
    });

});


function setNameOut(name) {
    name ? $('#nameOut').text(name) : $('#nameOut').text($('#name').attr('placeholder'));
}