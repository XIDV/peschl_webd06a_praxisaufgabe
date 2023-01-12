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
        createDisplayList(contentData.getContentNames())
        showContent();
        $('#menuList').children().on('click', showContent);
    })
    .fail((jqXHR, errorMessage, error) => {
        console.error(errorMessage);
    });

    $('#descriptionOut').hide();
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
    },
    getContentNames() {
        let names = [];
        for(let name in this.content) {
            names.push(name);
        }
        return names;
    }
}

function createDisplayList(nameList) {
    $.each(nameList, (key, value) => {
        $('#menuList').append($(document.createElement('li')).html(`${value} <i class="fa-solid fa-chevron-right"></i>`).attr('data-content', value));
        if(key === 0) { $('#menuList li').addClass('active') };
    });
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