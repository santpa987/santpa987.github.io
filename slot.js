//Creating container to add doctor info in the html
const app = document.getElementById('edit')
const detailForm = document.getElementById("detail")
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)

//Creating some variables
var index=0;
var data="";
var BookedDate="";
var BookedSlot="";

//Fire a Rest call to bring the slot information of the doctor based on id.
var request = new XMLHttpRequest()
request.open('GET', 'https://10.0.0.7:8080/slots?id=' + window.location.href.substring(window.location.href.indexOf('=')+1) )
request.onload = function () {
  data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
		//Hide the booking Form in the html in the beginning
		var bookingForm= document.getElementById("Booking")
       		 bookingForm.style.display = "none"

		//Hide the Patient Information Form in the html at this point in time
		var informationForm= document.getElementById("Infomration")
       		 informationForm.style.display = "none"

		// Displaying the Doctor information in 3 column format
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

        const Name = document.createElement('p')
        Name.textContent = "Name :" + data.name

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
		app.appendChild(Booking)

		const BookSlot = document.createElement('button')
		BookSlot.setAttribute('class', 'button')
		BookSlot.setAttribute('id','bookSlot')
        BookSlot.textContent = "Book Slot"
        Booking.appendChild(BookSlot)

		//ShowSlot Function will be called onClick of BookSlot which will bring up the Slot information to the end User.
        document.getElementById("bookSlot").addEventListener("click",showSlot);

		//ShowSlot Function will be called change of BookingDate which will refresh the Slot information to the end User.
        document.getElementById("bookingDateId").addEventListener("change",showSlot);

        function showSlot(){
       		 //Enable the booking Form in the html
       		 bookingForm.style.display = "block"

			//Creating the next sequencial button
			var bookSlot = document.getElementById("bookSlot")
			if(bookSlot)
			{
				bookSlot.parentNode.removeChild(bookSlot)
						const Booking2 = document.createElement('div')
						app.appendChild(Booking2)

						const BookSlot2 = document.createElement('button')
						BookSlot2.setAttribute('class', 'button')
						BookSlot2.setAttribute('id','bookSlot2')
				        BookSlot2.textContent = "Confirm"

        				Booking2.appendChild(BookSlot2)
			}

			//Retrieving the index number index for the dateslot to get info of booked/ Available/ Invalid slots
			BookedDate = document.getElementById("bookingDateId").value
			index = (Date.parse(BookedDate) - Date.parse(data.slots[0].date) )/(3600000*24)

			//Disable the slot based on Days
			//slots are : "I" - Invalid, "N" - Not avaialble or already booked , A or else - Available
			//First half - Sunday
			if(data.slots[index].am9 == 'I')
			// slot are not present
			{
				document.getElementById("AM9").style.display = "none"
       		 	document.getElementById("AM10").style.display = "none"
       		 	document.getElementById("AM11").style.display = "none"
       		 	document.getElementById("PM12").style.display = "none"
		 	}
		 	else
		 	//slot are presented to user
		 	{
				document.getElementById("AM9").style.display = "inline"
				document.getElementById("AM10").style.display = "inline"
				document.getElementById("AM11").style.display = "inline"
				document.getElementById("PM12").style.display = "inline"
		 	}
		 	//Ssecond Half - Saturday or Sunday
			if(data.slots[index].pm2 == 'I')
			{
			// slot are not present
				document.getElementById("PM2").style.display = "none"
				document.getElementById("PM3").style.display = "none"
				document.getElementById("PM4").style.display = "none"
		 	}
		 	else
		 	//slot are presented to user
			{
				document.getElementById("PM2").style.display = "inline"
				document.getElementById("PM3").style.display = "inline"
				document.getElementById("PM4").style.display = "inline"
		 	}

		 	//remove this - for local testing
		 	document.getElementById("AM11").disabled = true

			//Need to show the status of slots

		 	if(data.slots[index].am9 == 'N')
		 	//As the slot is Unavailable then disable the slot button and change the color
		 	{
		 		document.getElementById("AM9").disabled = true
		 		document.getElementById("AM9").style.backgroundColor = "#dddddd"
			}
		 	else
		 	{
			//Slot is available then make it so
		 		document.getElementById("AM9").disabled = false
		 		document.getElementById("AM9").style.backgroundColor = "#5B6AA2"
			}

			//Need to repeat the same logic for all the slots
		 	if(data.slots[index].am10 == 'N')
		 	{
		 		document.getElementById("AM10").disabled = true
		 		document.getElementById("AM10").style.backgroundColor = "#dddddd"
			}
		 	else
		 	{
		 		document.getElementById("AM10").disabled = false
		 		document.getElementById("AM10").style.backgroundColor = "#5B6AA2"
			}

		 	if(data.slots[index].am11 == 'N')
		 	{
		 		document.getElementById("AM11").disabled = true
		 		document.getElementById("AM11").style.backgroundColor = "#dddddd"
			}
		 	else
		 	{
		 		document.getElementById("AM11").disabled = false
		 		document.getElementById("AM11").style.backgroundColor = "#5B6AA2"
			}

		 	if(data.slots[index].pm12 == 'N')
		 	{
		 		document.getElementById("PM12").disabled = true
		 		document.getElementById("PM12").style.backgroundColor = "#dddddd"
			}
		 	else
		 	{
		 		document.getElementById("PM12").disabled = false
		 		document.getElementById("PM12").style.backgroundColor = "5B6AA2"
			}

		 	if(data.slots[index].pm2 == 'N')
		 	{
		 		document.getElementById("PM2").disabled = true
		 		document.getElementById("PM2").style.backgroundColor = "#dddddd"
			}
		 	else
		 	{
		 		document.getElementById("PM2").disabled = false
		 		document.getElementById("PM2").style.backgroundColor = "5B6AA2"
			}

		 	if(data.slots[index].pm3 == 'N')
			{
				document.getElementById("PM3").disabled = true
				document.getElementById("PM3").style.backgroundColor = "#dddddd"
			}
		 	else
		 	{
		 		document.getElementById("PM3").disabled = false
		 		document.getElementById("PM3").style.backgroundColor = "5B6AA2"
			}

		 	if(data.slots[index].pm4 == 'N')
		 	{
		 		document.getElementById("PM4").disabled = true
		 		document.getElementById("PM4").style.backgroundColor = "#dddddd"
			}
		 	else
		 	{
		 		document.getElementById("PM4").disabled = false
		 		document.getElementById("PM4").style.backgroundColor = "5B6AA2"
			}


			//Next step to show the html on slot booking
			document.getElementById("bookSlot2").addEventListener("click",showInformation);

			//Event listner on each slot to make it selected
			document.getElementById("AM9").addEventListener("click",setBookedSlot9);
			document.getElementById("AM10").addEventListener("click",setBookedSlot10);
			document.getElementById("AM11").addEventListener("click",setBookedSlot11);
			document.getElementById("PM12").addEventListener("click",setBookedSlot12);
			document.getElementById("PM2").addEventListener("click",setBookedSlot2);
			document.getElementById("PM3").addEventListener("click",setBookedSlot3);
			document.getElementById("PM4").addEventListener("click",setBookedSlot4);

		}

		//reset selection function to reset the previously selected slot
		function resetSelection(){
			document.getElementById("AM9").className = "slot"
			document.getElementById("AM10").className = "slot"
			document.getElementById("AM11").className = "slot"
			document.getElementById("PM12").className = "slot"
			document.getElementById("PM2").className = "slot"
			document.getElementById("PM3").className = "slot"
			document.getElementById("PM4").className = "slot"
		}

		//On each selection change the class to show, its selected and take the value as BookedSlot
		function setBookedSlot9(){
			resetSelection()
			BookedSlot = document.getElementById("AM9").value
			document.getElementById("AM9").className = "active"
		}

		function setBookedSlot10(){
			resetSelection()
			BookedSlot = document.getElementById("AM10").value
			document.getElementById("AM10").className = "active"
		}

		function setBookedSlot11(){
			resetSelection()
			BookedSlot = document.getElementById("AM11").value
			document.getElementById("AM11").className = "active"
		}

		function setBookedSlot12(){
			resetSelection()
			BookedSlot = document.getElementById("PM12").value
			document.getElementById("PM12").className = "active"
		}

		function setBookedSlot2(){
			resetSelection()
			BookedSlot = document.getElementById("PM2").value
			document.getElementById("PM2").className = "active"
		}

		function setBookedSlot3(){
					resetSelection()
					BookedSlot = document.getElementById("PM3").value
					document.getElementById("PM3").className = "active"
		}

		function setBookedSlot4(){
					resetSelection()
					BookedSlot = document.getElementById("PM4").value
					document.getElementById("PM4").className = "active"
		}

		//Display the Patient Information form to the user
		function showInformation(){
       	//Enable the booking Form, As the form structure is already created in html
       	informationForm.style.display = "block"

			var bookSlot2 = document.getElementById("bookSlot2")
			if(bookSlot2)
			{
				bookSlot2.parentNode.removeChild(bookSlot2)
						const Information = document.createElement('div')
			}
			document.getElementById("bookSlot3").addEventListener("click",showThankyou);
		}

		//Let's show the Confirmation to the Patient
		function showThankyou(){
			//open the PUT Request
			var http = new XMLHttpRequest()
			http.open('PUT','https://10.0.0.7:8080/slots/date',true)

			//Format the slot value properly for the REST
			var formatSlot = BookedSlot.substring(BookedSlot.indexOf('00')+2) + BookedSlot.substring(0,BookedSlot.indexOf(':'))
			//Creating the Request header with required data format.
			//JSON can be created but to make it simple passing the request as String
			var params = 'index=' + index + '&id=' + data.id + '&date=' + BookedDate + '&slot=' + formatSlot
			http.setRequestHeader('content-type','application/json')

			http.onreadystatechange = function(){
			if(http.readySate == 4 && http.status ==200){
				alert(http.responseText)
				}
			}
			http.send(params)

			//Display the very simple confirmation to the end user.
			//Can be created a confirmation dialog to enhance the UI
			alert("Thank you for your booking." + '\n' + '\n' + "Your appointment with DR." + data.name + '\n' + "dated on " + BookedDate + '\n' + "is booked for the slot of " + BookedSlot)

			//redirect to home page
			var htmlLoc = window.location.href
			var newLoc = htmlLoc.replace('slot','index')
			window.location.assign(newLoc)
		}
    }
}
request.send('Santosh Sending from Application')