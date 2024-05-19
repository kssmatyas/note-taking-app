# NoteTakingApp
## Hello, egy jegyzetelő alkalmazást készítettem:

- Projekt név: Note Taking App
- Ezen a linken éred el: note-app-76900.web.app
- Regisztrálni is a login oldalon tudsz ugyanúgy mintha loginelnél

## Mit hol találsz:
- Fordítási hiba nincs
- Futtatási hiba nincs
- Hosting url: note-app-76900.web.app
- Adatmodell: 2/4db van: src/app/models user és note
- Minden komponens 250 sornál rövidebb és a sorok 400 karkternél rövidebbek
- Teszteltem weben és mobilon is, jól jelent meg nekem, Projekt neve pl mobilon el is tűnik a szebb menü sáv megjelenítés miatt: src/app/app.component.scss
-  attribútum direktíva: ngclass: login.component.html, ngstyle: profile.component.html, ngmodel: login.component.html
- strukturális direktíva: ngif: app.component.html, ngfor: note-list.component.html
- Adatátadás szülő és gyermek között: Nincs
- 10+ angular material elem: mat-card, mat-card-title, mat-label, mat-form-field, mat-list, mat-list-item, mat-line, mat-icon-button, mat-toolbar, mat-dialog-actions, mat-raised-button, mat-card-header, mat-error...
- Loginnál és a New Notenál is angular formokkal van megvalósítva a bevitel
- Saját pipe: src/app/pipes/secondsToDatePipe.ts profile odalon a datet alakítja a megjelenített olvasható formátumra az eltárolt seconds helyett
- Lifecycle hook: ngOnInit van csak
- CRUD műveletek megvannak, lehet jegyzetet létrehozni, megtekinteni, változtatni és törölni is, Promise van használva
- CRUD ki van szervezve: src/app/services/note.service.ts
- Firestore adatbázis használva van
- Komplex lekérdezés: firebase.service.ts 62.sor, note.service.ts 21.sor
- Routeok: /profile, /new, /login, /
- Le van védve: /, /profile, /new
- Remélem tetszik az app <3
- Hosszabításban adtam be, szóval legalább 28pont kellene, ami elvileg meg is van


## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
