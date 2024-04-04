document.addEventListener("DOMContentLoaded", () =>{
    
    
    //fetch data from json and add titles to dom
    fetch("http://localhost:3000/films")
    .then((data) => data.json())//converting data to json
    .then((posts) => {
        console.log(posts);
        let films = document.getElementById("films")
        for (let post of posts ){
            films.innerHTML += `<li>${post.title}</li>`
        }
    })
    
    // fetch data and add posters 
    fetch("http://localhost:3000/films")
    .then((data) => data.json())
    .then((posts) =>{
        console.log(posts);
        let poster = document.getElementById("poster")
        
        for (let post of posts){
            poster.src = `${post.poster}`
            poster.alt = `${post.title}`
            poster.innerHTML += `<img src = "${poster.src}" alt = "${poster.alt}">`
        }
    })
   
    //populate film data
    fetch("http://localhost:3000/films")
    .then((data) => data.json())
    .then((posts) =>{
        console.log(posts);
        for (let post of posts){
    const title = document.getElementById("title")
    title.innerText = post.title
    const runtime = document.getElementById("runtime")
    runtime.innerText = `${post.runtime} MINUTES`
    const showtime = document.getElementById("showtime")
    showtime.innerText = post.showtime
    const description = document.getElementById("film-info")
    description.innerText = `${post.description}`
   
//calculate available tickets 
    const tickets = document.getElementById('ticket-num')
    const totalTickets = parseInt(post.capacity, 10)
    tickets.innerText = totalTickets - `${post.tickets_sold}`

    const button = document.getElementById("buy-ticket").addEventListener('click', () => {
        if (tickets.innerText <= 0){
            //let buttonDiv = document.querySelector('.extra.content');
            button.innerHTML = "<button> SOLD OUT </button>"
        }
        else {
            const tickets_sold = post.tickets_sold + 1
            let obj = {tickets_sold}

            updateTicketNum(obj)
        }
        const updateTicketNum = (obj) => {
            options = {
                method: 'PATCH',
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
            body: JSON.stringify(obj)
            }
            fetch("http://localhost:3000/films")
            .then(data => data.json())
            .then(posts => {
                renderFirstFilm(posts)
            
            })
        }
    })
}
})


        
})
