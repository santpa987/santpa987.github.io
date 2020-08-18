const app = document.getElementById('root2')
const detailForm = document.getElementById("detail")

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)
var index=0;
var request = new XMLHttpRequest()
//request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

var data="";
var BookedDate="";
var BookedSlot="";

request.open('GET', 'https://10.0.0.7:8080/slots?id=' + window.location.href.substring(window.location.href.indexOf('=')+1) )

request.onload = function () {
  // Begin accessing JSON data here
  data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {

		//Hide the booking Form in the html
		var bookingForm= document.getElementById("Booking")
       		 bookingForm.style.display = "none"

		//Hide the Information Form in the html
		var informationForm= document.getElementById("Infomration")
       		 informationForm.style.display = "none"

        console.log(data.name)
        const card1 = document.createElement('div')
        card1.setAttribute('class', 'card2')

        const card2 = document.createElement('div')
        card2.setAttribute('class', 'card2')

        const card3 = document.createElement('div')
        card3.setAttribute('class', 'card2')


        const Avatar = document.createElement('img')
        Avatar.src = "images/avatar.png"
        Avatar.height = "60"
        Avatar.width = "80"

        //alt="stethoscope stethoscope" height = "300" width="400"

        const Name = document.createElement('p')
        Name.textContent = "Name :" + data.name

		//const a = document.createElement('a')
        //h1.textContent = data.name

        const Type = document.createElement('p')
        Type.textContent = "Category : " + data.type

        const Degree = document.createElement('p')
        Degree.textContent = "Degree : " + data.degree

        const Rating = document.createElement('p')
        Rating.textContent = "Rating : " + data.rating

        const Review = document.createElement('p')
        Review.textContent = "Review : " + data.review

        const WF = document.createElement('p')
        WF.textContent = "Experience : "

		const Contact = document.createElement('p')
        Contact.textContent = "Contact : " + data.contact

		const Address = document.createElement('p')
        Address.textContent = "Addess : " + data.address

		const Fee = document.createElement('p')
        Fee.textContent = "Fee : " + data.fee


		const About = document.createElement('p')
        About.textContent = "About : " + data.about


        container.appendChild(card1)
        container.appendChild(card2)
        container.appendChild(card3)
        card1.appendChild(Avatar)
        card1.appendChild(Rating)
        card1.appendChild(Review)
        card2.appendChild(Name)
        card2.appendChild(Degree)
        card2.appendChild(Type)
        card2.appendChild(WF)
        card3.appendChild(Contact)
        card3.appendChild(Address)
        card3.appendChild(Fee)
        card3.appendChild(About)

		const Booking = document.createElement('div')
		//Booking.setAttribute('class', 'container')

		app.appendChild(Booking)

		const BookSlot = document.createElement('button')
		BookSlot.setAttribute('class', 'button')
		BookSlot.setAttribute('id','bookSlot')
        BookSlot.textContent = "Book Slot"

        Booking.appendChild(BookSlot)

        document.getElementById("bookSlot").addEventListener("click",showSlot);

        document.getElementById("bookingDateId").addEventListener("change",showSlot);

        function showSlot(){
       		 //Enable the booking Form
       		 bookingForm.style.display = "block"

			var bookSlot = document.getElementById("bookSlot")
			if(bookSlot)
			{
				bookSlot.parentNode.removeChild(bookSlot)
						const Booking2 = document.createElement('div')
						//Booking.setAttribute('class', 'container')

						app.appendChild(Booking2)

						const BookSlot2 = document.createElement('button')
						BookSlot2.setAttribute('class', 'button')
						BookSlot2.setAttribute('id','bookSlot2')
				        BookSlot2.textContent = "Confirm"

        				Booking2.appendChild(BookSlot2)
			}

			BookedDate = document.getElementById("bookingDateId").value
			index = (Date.parse(BookedDate) - Date.parse(data.slots[0].date) )/(3600000*24)

			//BookedSlot = document.getElementById("AM9").value
			//First half - Sunday
			if(data.slots[index].am9 == 'I')
			{
				document.getElementById("AM9").style.display = "none"
       		 	document.getElementById("AM10").style.display = "none"
       		 	document.getElementById("AM11").style.display = "none"
       		 	document.getElementById("PM12").style.display = "none"
		 	}
		 	else
		 	{
				document.getElementById("AM9").style.display = "inline"
				document.getElementById("AM10").style.display = "inline"
				document.getElementById("AM11").style.display = "inline"
				document.getElementById("PM12").style.display = "inline"
		 	}
		 	//Ssecond Half - Saturday or Sunday
			if(data.slots[index].pm2 == 'I')
			{
				document.getElementById("PM2").style.display = "none"
				document.getElementById("PM3").style.display = "none"
				document.getElementById("PM4").style.display = "none"
		 	}
		 	else
			{
				document.getElementById("PM2").style.display = "inline"
				document.getElementById("PM3").style.display = "inline"
				document.getElementById("PM4").style.display = "inline"
		 	}
		 	//remove this
		 	document.getElementById("AM11").disabled = true

		 	if(data.slots[index].am9 == 'N')
		 	{
		 		document.getElementById("AM9").disabled = true
		 		document.getElementById("AM9").style.color = "red"
			}
		 	else
		 	{
		 		document.getElementById("AM9").disabled = false
		 		document.getElementById("AM9").style.color = "White"
			}

		 	if(data.slots[index].am10 == 'N')
		 	{
		 		document.getElementById("AM10").disabled = true
		 		document.getElementById("AM10").style.color = "red"
			}
		 	else
		 	{
		 		document.getElementById("AM10").disabled = false
		 		document.getElementById("AM10").style.color = "White"
			}

		 	if(data.slots[index].am11 == 'N')
		 	{
		 		document.getElementById("AM11").disabled = true
		 		document.getElementById("AM11").style.color = "red"
			}
		 	else
		 	{
		 		document.getElementById("AM11").disabled = false
		 		document.getElementById("AM11").style.color = "White"
			}

		 	if(data.slots[index].pm12 == 'N')
		 	{
		 		document.getElementById("PM12").disabled = true
		 		document.getElementById("PM12").style.color = "red"
			}
		 	else
		 	{
		 		document.getElementById("PM12").disabled = false
		 		document.getElementById("PM12").style.color = "White"
			}

		 	if(data.slots[index].pm2 == 'N')
		 	{
		 		document.getElementById("PM2").disabled = true
		 		document.getElementById("PM2").style.color = "red"
			}
		 	else
		 	{
		 		document.getElementById("PM2").disabled = false
		 		document.getElementById("PM2").style.color = "White"
			}

		 	if(data.slots[index].pm3 == 'N')
			{
				document.getElementById("PM3").disabled = true
				document.getElementById("PM3").style.color = "red"
			}
		 	else
		 	{
		 		document.getElementById("PM3").disabled = false
		 		document.getElementById("PM3").style.color = "White"
			}

		 	if(data.slots[index].pm4 == 'N')
		 	{
		 		document.getElementById("PM4").disabled = true
		 		document.getElementById("PM4").style.color = "red"
			}
		 	else
		 	{
		 		document.getElementById("PM4").disabled = false
		 		document.getElementById("PM4").style.color = "White"
			}


		 		document.getElementById("bookSlot2").addEventListener("click",showInformation);
		 		document.getElementById("AM9").addEventListener("click",setBookedSlot9);
		 		document.getElementById("AM10").addEventListener("click",setBookedSlot10);
		 		document.getElementById("AM11").addEventListener("click",setBookedSlot11);
		 		document.getElementById("PM12").addEventListener("click",setBookedSlot12);
		 		document.getElementById("PM2").addEventListener("click",setBookedSlot2);
		 		document.getElementById("PM3").addEventListener("click",setBookedSlot3);
		 		document.getElementById("PM4").addEventListener("click",setBookedSlot4);

		}

		function setBookedSlot9(){
			BookedSlot = document.getElementById("AM9").value
		}

		function setBookedSlot10(){
					BookedSlot = document.getElementById("AM10").value
		}

		function setBookedSlot11(){
					BookedSlot = document.getElementById("AM11").value
		}
		function setBookedSlot12(){
					BookedSlot = document.getElementById("PM12").value
		}
		function setBookedSlot2(){
					BookedSlot = document.getElementById("PM2").value
		}
		function setBookedSlot3(){
					BookedSlot = document.getElementById("PM3").value
		}
		function setBookedSlot4(){
					BookedSlot = document.getElementById("PM4").value
		}

		function showInformation(){
       	//Enable the booking Form
       	informationForm.style.display = "block"

			var bookSlot2 = document.getElementById("bookSlot2")
			if(bookSlot2)
			{
				bookSlot2.parentNode.removeChild(bookSlot2)
						const Information = document.createElement('div')
						//Booking.setAttribute('class', 'container')

						/*detailForm.appendChild(Information)

						const BookSlot3 = document.createElement('button')
						BookSlot3.setAttribute('class', 'button')
						BookSlot3.setAttribute('id','bookSlot3')
				        BookSlot3.textContent = "Submit"

        				Information.appendChild(BookSlot3)*/
			}
			document.getElementById("bookSlot3").addEventListener("click",showThankyou);
		}

		function showThankyou(){


			//sending data
			var http = new XMLHttpRequest()
			http.open('PUT','https://10.0.0.7:8080/slots/date',true)

			//{"id":2,"name":"Sobha","degree":"MBBS","type":"Gyno","address":"Indiranagar","review":"One of the best","about":"I worked for helping people","rating":5,"contact":"8105889701","fee":500,"slots":[{"date":"2020-08-17","pm2":"A","pm3":"A","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-18","pm2":"A","pm3":"A","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-19","pm2":"A","pm3":"A","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-20","pm2":"N","pm3":"N","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-21","pm2":"N","pm3":"A","am10":"A","pm4":"N","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-22","pm2":"I","pm3":"I","am10":"A","pm4":"I","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-23","pm2":"I","pm3":"I","am10":"I","pm4":"I","am9":"I","pm12":"I","am11":"I"},{"date":"2020-08-24","pm2":"A","pm3":"A","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-25","pm2":"A","pm3":"A","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-26","pm2":"A","pm3":"A","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-27","pm2":"N","pm3":"N","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-28","pm2":"N","pm3":"A","am10":"A","pm4":"N","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-29","pm2":"I","pm3":"I","am10":"A","pm4":"I","am9":"A","pm12":"A","am11":"A"},{"date":"2020-08-30","pm2":"I","pm3":"I","am10":"I","pm4":"I","am9":"I","pm12":"I","am11":"I"},{"date":"2020-08-31","pm2":"A","pm3":"A","am10":"A","pm4":"A","am9":"A","pm12":"A","am11":"A"}]}
			//"slots":[{"date":"2020-08-17","pm2":"A"
			var formatSlot = BookedSlot.substring(BookedSlot.indexOf('00')+2) + BookedSlot.substring(0,BookedSlot.indexOf(':'))
			//var params = 'id=' + data.id + '&date=' + BookedDate + '&slot=' + BookedSlot
			var params = 'index=' + index + '&id=' + data.id + '&date=' + BookedDate + '&slot=' + formatSlot
			//var jsonParams = '{"id":"' + data.id + '","slots":[{"date":"' + BookedDate + '","' + formatSlot + '":"N"}]}'

			//http.setRequestHeader('content-type','application/x-www-form-urlencoded')
			http.setRequestHeader('content-type','application/json')

			http.onreadystatechange = function(){
			if(http.readySate == 4 && http.status ==200){
				alert(http.responseText)
				}
			}
			http.send(params)

			//save slot with id,date,slot as "N"
			alert("Thank you for your booking." + '\n' + '\n' + "Your appointment with DR." + data.name + '\n' + "dated on " + BookedDate + '\n' + "is booked for the slot of " + BookedSlot)

			//redirect to home page
			var htmlLoc = window.location.href
			var newLoc = htmlLoc.replace('slot','index')
			window.location.assign(newLoc)
		}


    }

  var date = new Date;
}

request.send('Santosh Sending from Application')
