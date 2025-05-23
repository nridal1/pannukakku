# Pannukakku-tilausjärjestelmä

Tämä on selainpohjainen tilaussovellus, jonka avulla asiakas voi tehdä pannukakkutilauksen valitsemalla täytteet, lisukkeet ja toimitustavan. Tilaukset tallennetaan `localStorageen`, ja kokki voi tarkastella niitä omassa näkymässään.

## 🔍 Projektin rakenne

- **order.html** – Asiakkaan näkymä, jossa tehdään tilaus
- **order.css** – Asiakkaan näkymän tyylit
- **script.js** – Tilauksen logiikka ja tallennus localStorageen
- **chef.html** – Kokin näkymä, jossa näytetään kaikki tilaukset
- **chef.css** – Kokin näkymän tyylit
- **(localStorage)** – Käytetään säilyttämään useita tilauksia

## 💡 Toiminnot

### Asiakas (order.html)

- Syöttää nimensä
- Valitsee pannukakun tyypin
- Valitsee täytteet ja lisukkeet
- Valitsee toimitustavan
- Näkee yhteenvedon tilauksestaan
- Tilauksen tiedot tallennetaan localStorageen

### Kokki (chef.html)

- Näkee kaikki tilaukset listattuna
- Voi tyhjentää kaikki tilaukset painikkeella ("Tyhjennä tilaukset")

## 🛠️ Teknologiat

- HTML
- CSS
- JavaScript
- Web Storage API (`localStorage`)

## 🚀 Käyttöohjeet

1. Avaa `order.html` selaimessa tehdäksesi tilauksen.
2. Tilauksen tiedot tallentuvat automaattisesti selaimen localStorageen.
3. Avaa `chef.html` selaimessa nähdäksesi kaikki saapuneet tilaukset.
4. Käytä "Tyhjennä tilaukset" -painiketta tarvittaessa poistamaan kaikki tilaukset.

> Huom: Tämä toimii vain samassa selaimessa, koska localStorage on selainkohtainen.

## 👩‍🍳 Esimerkkikuvaus toiminnasta

- Asiakas valitsee: **Suklaa-pannukakku + Banaani + Kermavaahto + Nouto**
- Tilauksen yhteenveto näytetään ja tallennetaan
- Kokin näkymässä näkyy:  
  `Tilaus 1`  
  Asiakas: Nadja  
  Tyyppi: Suklaa  
  Täytteet: Banaani  
  Lisukkeet: Kermavaahto  
  Toimitustapa: Nouto  
  Kokonaishinta: 7.50€

## 📁 Kehittäjä

**Nimi:** Nadja  
**Oppilaitos:** Business College
