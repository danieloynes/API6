# Teknisk dokumentasjon

## Bruk av API

- API-nøkkelen `a92382dc` brukes for å autentisere forespørsler til OMDb API.
- `fetch`-funksjonen brukes til å hente data fra API-et.

## Implementering av søkefunksjon

- Brukeren skriver inn et søkeord i søkefeltet.
- `searchMovie`-funksjonen sender en forespørsel til OMDb API med søkeordet.
- Resultatene vises i `movieResults`-diven.

## Anbefalte filmer

- Når siden lastes inn, vises 3 tilfeldige anbefalte filmer.
- Når brukeren søker etter en film, vises 3 anbefalte filmer relatert til søket.

## Utfordringer

- Håndtering av API-feil og tomme resultater.
- Sikre at anbefalte filmer er relevante og interessante.
