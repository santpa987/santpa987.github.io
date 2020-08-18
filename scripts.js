const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()
//request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.open('GET', 'http://10.0.0.5:8080/doctor')

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {

  data.forEach((doc) => {
        console.log(doc.name)
        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        const h1 = document.createElement('h1')
        h1.textContent = "Dr." + doc.name

		//const a = document.createElement('a')
        //h1.textContent = doc.name

        const p1 = document.createElement('p')
        p1.textContent = "Category : " + doc.type

        const p2 = document.createElement('p')
        p2.textContent = "Degree : " + doc.degree

        const p3 = document.createElement('p')
        p3.textContent = "Rating : " + doc.rating

        const a = document.createElement('a')
        a.textContent = "Want to meet?"
        a.href="./slot.html?id=" + doc.id
        a.setAttribute('class', 'navigate')

        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p1)
        card.appendChild(p2)
        card.appendChild(p3)
        card.appendChild(a)
    })
    }

  var date = new Date;
}

request.send()
