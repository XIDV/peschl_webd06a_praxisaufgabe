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
        createDisplayList(contentData.getContentNames());
        showContent();
        $('#menuList').children().on('click', showContent);
    })
    .fail((jqXHR, errorMessage, error) => {
        console.error(errorMessage);
    });

    $('#descriptionOut').hide();
});



//  zu A :: Ausgabe der eingegebenen Daten
function setNameOut(name) {
    name ? $('#nameOut').text(name) : $('#nameOut').text($('#name').attr('placeholder'));
}



//  zu B
class ContentData {
    #content = undefined;
    constructor() {
        this.#content = null;
    }
    setContent(content) {
        this.#content = content
    }
    getContent(selection = this.getFirstElement()) {
        return this.#content[selection];
    }
    getContentNames() {
        let names = [];
        for(let name in this.#content) {
            names.push(name);
        }
        return names;
    }
    getFirstElement() {
        return Object.keys(this.#content)[0];
    }
}
const contentData = new ContentData();


//  Generierung und Ausgabe der Auswahlliste
function createDisplayList(nameList) {
    $.each(nameList, (key, value) => {
        $('#menuList').append($(document.createElement('li')).html(`${value} <i class="fa-solid fa-chevron-right"></i>`).attr('data-content', value));
        if(key === 0) { $('#menuList li').addClass('active') };
    });
}

//  Ausgabe der Erläuterungen
function showContent(e) {
    $('#descriptionOut').fadeOut(
        () => {
            e ? $('#descriptionOut').text(contentData.getContent($(e.target).data().content)) : $('#descriptionOut').text(contentData.getContent());
            $('#descriptionOut').slideDown();
        }
    );
    if(e) { toggleActiveLink(e.target) }
}

//  Modifizierung der Klassenzugehörigkeit der Elemente d. Auswahlliste
function toggleActiveLink(target) {
    $('#menuList').children().removeClass('active');
    $(target).addClass('active');
}