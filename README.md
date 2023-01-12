# Anwendung von jQuery

Lösung der ESA 9 unter Verwendung von jQuery, Ajax, sowie SASS

## Teilaufgabe A:

Erfassung von Nutzer-Eingaben und Ausgabe im HTML-Dokumment.

Für die Lösung dieser Aufgabe wurden zwei Event-Listener am `input`-Element mit der ID `#name` und einer am `button`-Element mit der ID `#submit` registriert.  
Außerdem wurde die Funktion `setName(name)` implementiert, welche die Ausgabe einer User-Eingabe, bzw. die Ausgabe des Wertes des Attributes `placeholder` von `#name` realisiert.

| Event-Listener | Erläuterung |
| --- | --- |
| `$('#name').on('keyup', e => {...}` | Ausgabe der aktuellen Eingabe im deaktivierten `ìnput`-Elment mit der ID `#instantReprint` durch Verwendung der Methode `.val(...)` |
| `$('#name').on('focusout', e => {...}` | Wenn `#name` den Focus verliert **und** wenn `.val(...)` bei diesem Elment `''` (leerer String) zurückgibt, dann soll der `click`-Event-Listener, welcher an `#submit` registriert ist getriggert werden. |
| `$('#submit').on('click', e => {...}` | Bei einem Klick auf `#submit` wird die Funktion `setName(name)` aufgerufen. Als Wert f. den Parameter `name` dient der der Rückgabewert von `.val(...)` aufgerufen auf `#name`. |

`setName(name)` wird auch automatisch aufgerufen, wenn das DOM geladen wurde um eine korrekte, initiale Ausgabe im Ausgabe-Element `#nameOut` zu gewährleisten.

## Teilaufgabe B:

Dynamisches ein- / ausblenden von Inhalten.

Die Lösung dieser Aufgabe wurde um weitere Funktionen erweitert:

* Die darzustellenden Inhalte wurden in die Datei `content.json` ausgelagert.
* Die Darstellung der Auswahlliste erfolgt dynamisch, in Abhängigkeit der in `content.json` gesicherten Inhalte.
* Als Zwischenspeicher f. die geladenen Inhalte dient das Objekt `contentData`.
* Die Generierung und Anzeige der Auswahlliste, die Darstellung der Erläuterungen, sowie die Manipulation der Klassenzugehörigkeit der Auswahllisten-Elemente wurde in entsprechende Funktionen ausgelagert.

### Ajax-Anfrage (laden der externen Daten)

Einstiegspunkt stellte die Ajax-Anfrage mittels `$.getJSON(pfad)` dar.  
Ist diese Anfrage erfolgreich wird die Methode `.done((data) => {...}` aufgerufen. Die Callback-Funktion erfüllt die folgenden Aufgaben:

| Code-Zeile | Erläuterung |
| --- | --- |
| `contentData.setContent(data);` | Aufruf der Methode `setContent(data)` des `contentData`-Objekts. Der Parameter `data` enthält die eingelesenen Daten. |
| `createDisplayList(contentData.getContentNames());` | Aufruf der Funktion `createDisplayList(...)`. Als Parameter erhält diese Funktion den Rückgabewert der Methode `getContentNames()` des `contentData`-Objekts. |
| `showContent();` | Aufruf der Funktion (Event-Handler) `showContent` zur initialen Anzeige einer Begriffserläuterung. |
| `$('#menuList').children().on('click', showContent);` | Registrierung eines Event-Listeners vom Typ `click` an allen Kind-Elmenten der Liste mit der ID `#menuList`. |

### Das `contentData`-Objekt

| Attribut / Methode | Erläuterung |
| --- | --- |
| `#content` | Speicher für die geladenen Inhalte. Wurde als `private` (`#`) deklariert um den Zugiff ausschließlich über die folgenden Methoden zu ermöglichen. |
| `setContent(content)` | Speichern der Übergebenen Objekte im Attribut `#content`. |
| `getContent(selection = 'css'` | Rückgabe eines, durch den Parameter `selection` definierten Elements aus `#content`. Wird die Methode ohne Parameter aufgerufen wird als `selection` der String `'css'` verwendet. |
| `getContentNames()` | Methode gibt ein Array mit den Namen der in `#content` gesicherten Objekte zurück. |

### Die Funktion `createDisplayList(nameList)`

Diese Funktion generiert die einzelnen Punkte der Auswahlliste. Hierbei wird der angezeigte Text sowie das `data-content`-Attribut entsprechend der übergebenen `nameList` dynamisch erstellt.  
Außerdem erhält das erste dieser Listenpunkte (`key === 0`) die Klasse `active`.

### Die Funktion `showContent(e)`

Mit dieser Funktion wird einerseits das animierte Ein- und Ausblenden des `#descriptionOut`-Elments und andererseits die Anzeige des spezifischen Inhalts, entsprechend des vom User selekterten Listenpunkts realisiert.  
Bezüglich der Animation werden die Methoden `.fadeOut()` und `.slideDown()` geschachtelt.