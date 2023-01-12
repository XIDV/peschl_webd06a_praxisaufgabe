# Anwendung von jQuery

Lösung der ESA 9 unter Verwendung von jQuery, Ajax, sowie SASS

## Teilaufgabe A:

Erfassung von Nutzer-Eingaben und Ausgabe im HTML-Dokument.

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
| `#content` | Speicher für die geladenen Inhalte. Wurde als `private` (`#`) deklariert, um den Zugriff ausschließlich über die folgenden Methoden zu ermöglichen. |
| `setContent(content)` | Speichern der Übergebenen Objekte im Attribut `#content`. |
| `getContent(selection = 'css'` | Rückgabe eines, durch den Parameter `selection` definierten Elements aus `#content`. Wird die Methode ohne Parameter aufgerufen wird als `selection` der `key` des ersten Objektes in `#content` verwendet. Dieser wird von der Methode `getFirstElementKey()` zurückgegeben. |
| `getContentNames()` | Methode gibt ein Array mit den Namen der in `#content` gesicherten Objekte zurück. |
| `getFirstElementKey()` | Rückgabe des ersten Objektes in `#content`. |

### Die Funktion `createDisplayList(nameList)`

Diese Funktion generiert die einzelnen Punkte der Auswahlliste. Hierbei wird der angezeigte Text sowie das `data-content`-Attribut entsprechend der übergebenen `nameList` dynamisch erstellt.  
Außerdem erhält das erste dieser Listenpunkte (`key === 0`) die Klasse `active`.

### Die Funktion `showContent(e)`

Mit dieser Funktion wird einerseits das animierte Ein- und Ausblenden des `#descriptionOut`-Elments und andererseits die Anzeige des spezifischen Inhalts, entsprechend des vom User selekterten Listenpunkts realisiert.  
Bezüglich der Animation werden die Methoden `.fadeOut()` und `.slideDown()` geschachtelt. Wenn die Animation von `.fadeOut()` abgeschlossen ist wird eine anonyme Callback-Funktion ausgeführt. Sofern `showContent(e)` mit einem Event-Objekt als Parameter aufgerufen wurde, wird in das Element `#description` out die spezifischen Inhalts-Daten mit `.text()` geladen. Die Selektion der Daten erfolgt mit der Methode `getContent($(e.target).data().content)` des `contentData`-Objekts. Als Parameter wird der Wert des `data-content`-Attrbutes des Listenpunktes verwendet, an dem das Event auftritt.  
Erfolgt der Aufruf von `showContent(e)` ohne Event-Objekt erfolgt der Aufruf von `getContent()` ebenfalls ohne Parameter was standardmäßig dazu führt, dass die Inhalte des ersten Elements in `#content` des `contentData`-Objektes selektiert, zurückgegeben und angezeigt werden.

Am Ende dieser Funktion wird, sofern sie mit einem Event-Objekt als Parameter aufgerufen wurde, der Aufruf der Funktion `toggleActiveLink(target)`. Als Parameter wird das HTML-Element übergeben, an dem das Event auftrat.

### Die Funktion `toggleActiveLink(target)`

Allen Kind-Elementen von `#menuList` wird die Klasse `active` entzogen. (`.removeClass(...)`)  
Das übergebene Element `target` erhält die Klasse `active`. (`addClass(...)`)

## Styling mit SASS

Kernelement für das Styling bildet die Datei `style.sass`. Diese bindet folgende Dateien ein:

| Datei | Erläuterung |
| --- | --- |
| `preset.css` | Grundkonfiguration |
| `colors.sass` | Definiert SASS-Variablen für Farben. |
| `var.sass` | Definiert SASS-Variablen für diverse sich wiederholende Einstellungen. |

---

&copy; Sebastian Peschl 2023
