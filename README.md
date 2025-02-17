# Proposta di Consegna

## Descrizione

 * Il sito è dedicato agli appassionati di videogiochi, offrendo una vasta selezione di giochi, con pagine dettagliate che includono descrizioni, immagini e generi; 
   grazie al campo di ricerca, puoi trovare giochi per nome, genere o piattaforma. 
 Gli utenti loggati, possono aggiungere o rimuovere giochi dai preferiti gestendo la loro lista personale ,accedere al proprio profilo, modificare i propri dati e partecipare alla chat live con altri utenti. Inoltre c'è una sidebar a disposizione che fornisce informazioni su utenti, generi e piattaforme.

## API

* API utilizzata :https://api.rawg.io/api/  ;    BaaS :supabase

## Stile

* Per lo stile è stato utilizzato : React Bootstrap version: 2.10.7

## Pagine

* Rimpiazza con le pagine visitabili

Pagina 1 - HomePage – Pagina principale con lista card dei giochi con la funzione infinite scroll, con una barra di ricerca di giochi per nome, genere o piattaforma che si attiva anche scrollando in basso, inoltre una sidebar a disposizione per accedere facilmente alle infomazioni personali ai generi e piattaforme.

Pagina 2 - Dettaglio Gioco – Pagina con informazioni sul gioco : descrizione, immagine e genere, con la possibilità di aggiungerlo ai preferiti,andare alla collection personale e una Livechat in tempo reale con gli utenti e una sidebar a disposizione per accedere facilmente alle info personali ai generi e piattaforme.

Pagina 3 - Giochi per Genere – Pagina dedicata ai giochi filtrati per genere di gioco.

Pagina 4 - Giochi per Piattaforma – Pagina dedicata ai giochi filtrati per piattaforma di gioco.

Pagina 6 - Registrazione Utente – Pagina per creare un nuovo account e accedere alle funzionalità avanzate.

Pagina 7 - Login Utente – Pagina di accesso per gli utenti registrati.

Pagina 8 - Profilo Utente – Pagina personale con immagine profilo, con lista dei giochi preferiti e altre informazioni personali.

Pagina 9 - Modifica Profilo – Pagina dedicata alla modifica dei dati personali dell’utente.

## User Interactions

* Lista di interazioni che utenti autenticati e non posso fare nell'applicazione.

* Utente non Loggato:

 - Scrollare con infinite scroll tra i giochi disponibili sulla piattaforma.
 - Ricerca giochi in base al genere.
 - Ricerca giochi in base alla piattaforma.
 - Ricerca giochi in base al nome.
 - Può visualizzare la pagina di dettaglio di ogni gioco con descrizione, immagine e genere.
 - Non può aggiungere giochi ai preferiti.
 - Non può rimuovere giochi dai preferiti.
 - Non può accedere alla chat live e interagire con altri utenti.
 - Non può accedere alla pagina profilo o modificarne i dati.

* Utente Loggato:

 - Può fare tutto ciò che può fare un utente non autenticato.
 - Aggiungere giochi ai preferiti.
 - Rimuovere giochi dai preferiti.
 - Accedere alla propria pagina profilo con la lista dei giochi preferiti.
 - Modificare i dati personali nel profilo.
 - Utilizzare la chat live e parlare con altri utenti.

## Context

* AppContext : gestire dati del gioco
* SesssionContext : sessione per lo stato di login utente
* FavouritesContext :  per gestire i giochi preferiti

## Deployment

* 
