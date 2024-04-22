//Selezioni tutte le row dove mostrerò il contenuto di default
const artistiPresenti = document.querySelectorAll('.mostrarisultati');
//Aggiungo: seleziono il tag <input> per poi aggiungergli un addEventListener(keydown)
const inputTag = document.getElementById('searchField');

function search(){
    
    //Prendo il valore 
    const input = document.getElementById('searchField').value;
    //Aggiungo: condizione if se l'input rimane vuoto
    if (input === "") {
        return;
    }
    //Aggiungo: pulire l'input dopo il click
    document.getElementById('searchField').value = "";
    //Aggiungo: svuotare il <div> per evitare che ad ogni nuova ricerca si aggiungano nuovi risultati 
    document.getElementById('searchSection').innerHTML = "";
    //Aggiungo: svuoto anche il corpo del modale
    document.getElementById('modalBody').innerHTML = "";
    
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`)
    //trasformo il risutat in json
    .then(response => response.json())
    .then(data => {
        // Estraggo i dati necessari dal JSON
        const canzoni = data.data;
        const container = document.getElementById('searchSection');
        //Aggiungo: seleziono il <div> con id "modalBody" dove inserirò i titoli degli album
        const modalBody = document.getElementById('modalBody');
        //Aggiungo: creo un tag <ul> e lo inserisco dentro il <div> che ho appena selezionato
        const ul = document.createElement('ul');
        modalBody.appendChild(ul);
        //CICLO
        canzoni.forEach(canzone => {
        const card = document.createElement('div');
        //Aggiungo: creo un tag <li>
        const li = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${canzone.album.cover}" alt="${canzone.title}">
            <h3>${canzone.title}</h3>
            <p>${canzone.artist.name}</p>
            <p>${canzone.album.title}</p>
            `;
        //Aggiungo: inserisco i titoli degli album nei vari <li> e faccio 'appendChild'
        li.innerText =`${canzone.album.title}`;
        container.appendChild(card);
        ul.appendChild(li);
        document.getElementById('found').classList.remove('d-none');
        });
    });

artistiPresenti.forEach(artista => {
    //Estraggo da ogni risultato l'id dato che equivale al nome dell'artista
    let nomeArtista = artista.id;
    document.getElementById(nomeArtista).classList.add('d-none');
});
}

//Aggiungo: faccio in modo che venga eseguita la ricerca anche premento 'Enter'
inputTag.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search();
    }    
})

//Elaboro gli elementi che ho ottenuto
artistiPresenti.forEach(artista => {
    
    //Estraggo da ogni risultato l'id dato che equivale al nome dell'artista
    let nomeArtista = artista.id;
     //Inietto il nome dell'artista 
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${nomeArtista}`)
     
     //trasformo il risutati in oggetto
    .then(response => response.json())

      //Do un nome all'oggetto chiamandolo 'braniOttenuti' e lo elaboro
    .then(braniOttenuti => {

        //Dall'oggetto braniOttenuti prendo i "data"
        let canzoni = braniOttenuti.data;

        //Prendo il nome nomeArtista+'Section' e lo unisco ottenendo il nome dell'id
        let container = document.getElementById(nomeArtista+'Section');
        //Aggiungo: seleziono il <div> con id "modalBody" dove inserirò i titoli degli album
        const modalBody = document.getElementById('modalBody');
        //Aggiungo: creo un tag <ul> e lo inserisco dentro il <div> che ho appena selezionato
        const ul = document.createElement('ul');
        modalBody.appendChild(ul);
        //CICLO
        canzoni.forEach(canzone => {
            //Per ogni card elaboro il contenuto
            let card = document.createElement('div');
            //Aggiungo: creo un tag <li>
            const li = document.createElement('li');
            card.classList.add('card');
            card.innerHTML = `
            <img src="${canzone.album.cover}" alt="${canzone.title}">
            <h3>${canzone.title}</h3>
            <p>${canzone.artist.name}</p>
            <p>${canzone.album.title}</p>
            `;
            //Aggiungo: inserisco i titoli degli album nei vari <li> e faccio 'appendChild'
            li.innerText =`${canzone.album.title}`;
            container.appendChild(card);
            ul.appendChild(li);
            document.getElementById(nomeArtista).classList.remove('d-none');
        });
    })
});