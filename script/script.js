'use strict';

$(() => {
    console.log('Document ready for action ...');


    //  Zu Teilaufgabe A - Ein- u. Ausgabe von Formularwerte
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


    //  Zu Teilaufgabe B - Inhalte dynamisch ein- u. ausblenden
    $.getJSON('../script/content.json')
    .done((data) => {
        contentData.setContent(data);
        showContent();
    })
    .fail((jqXHR, errorMessage, error) => {
        console.error(errorMessage);
    });

    $('#descriptionOut').hide();
    $('#menuList').children().on('click', showContent);
});


function setNameOut(name) {
    name ? $('#nameOut').text(name) : $('#nameOut').text($('#name').attr('placeholder'));
}

const contentData = {
    $content: undefined,

    setContent: function(content) {
        this.content = content
    },
    getContent: function(selection = 'css') {
        return this.content[selection];
    }
}

function showContent(e) {
    $('#descriptionOut').fadeOut(
        () => {
            e ? $('#descriptionOut').text(contentData.getContent($(e.target).data().content)) : $('#descriptionOut').text(contentData.getContent());
            $('#descriptionOut').slideDown();
        }
    );
    if(e) { toggleActiveLink(e.target) }
}

function toggleActiveLink(target) {
    $('#menuList').children().removeClass('active');
    $(target).addClass('active');
}