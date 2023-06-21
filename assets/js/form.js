
//variables
var main;
		


function defaultData(){
	localStorage.setItem('screen1',JSON.stringify({name:"The Super Mario Bros",poster:"superMario.jpeg", avaliable:50,sale:0}));
	localStorage.setItem('screen2',JSON.stringify({name:"Avatar: The Way of Water",poster:"avatar.jpeg",avaliable:50,sale:0}));
	localStorage.setItem('screen3',JSON.stringify({name:"The Little Mermaid",poster:"littleMermaid.jpeg",avaliable:50,sale:0}));
	localStorage.setItem('screen4',JSON.stringify({name:"First Love",poster:"firstlove.jpeg",avaliable:50,sale:0}));
	localStorage.setItem('screen5',JSON.stringify({name:"M3GAN",poster:"m3gan.jpeg",avaliable:50,sale:0}));
}

/*
 *  This function will create the  body of the html
*/	
function createform(){
	if (localStorage.length <1) { 
		defaultData();
	}

		// create the main tag to the body
		main = document.createElement('main');
		
        document.body.append(main);
		
		
		
		// create h1 inside the main tag
		var h1 = document.createElement('h1');
        var title = document.createTextNode("Theater Ticket");
        h1.appendChild(title);
        main.appendChild(h1);
        
      
        // create the p inside the main tag and under the h1
		var sub = document.createElement('p');
        var subtitle = document.createTextNode("From the below you can select the movie to buy a ticket");
        sub.id = "subtitle";
        sub.appendChild(subtitle);
        main.appendChild(sub);

		var buttonDiv = document.createElement('div');
		buttonDiv.className = 'buttonDiv';
		
		//clear button 
		var daily = document.createElement('button');
		daily.type = "button";
	
		
 		var dailytext = document.createTextNode("Daily Report");
		 daily.appendChild(dailytext);
		 daily.id = "daily";
		 daily.setAttribute("onclick", "dailyReportForm()");//clear data when user click


		//swip button 
		var swip = document.createElement('button');
		swip.type = "button";
	
		
 		var swiptext = document.createTextNode("Swap Movies");
		swip.appendChild(swiptext);
		swip.id = "swip";
		swip.setAttribute("onclick", "swipForm()");//clear data when user click
		
		buttonDiv.appendChild(daily);
		buttonDiv.appendChild(swip);


		main.appendChild(buttonDiv);
		

		//display movies selection
		var div = document.createElement('div');
		div.className = "screens";

		for (var i = 0; i < localStorage.length; i++) {

			var key = localStorage.key(i);
			if (key != 'totalSale'){

			var screenDetail = JSON.parse(localStorage[key]);

			let eachScreen = document.createElement('div');
			eachScreen.id = key;
			eachScreen.className = "eachScreen";


			//new screening button 
			var newscreening = document.createElement('button');
			newscreening.type = "button";
			newscreening.className = "newScreeningButton";
			var newscreeningtext = document.createTextNode("RSCREEN");
			newscreening.appendChild(newscreeningtext);


			let p = document.createElement('h3');
			let screenName = document.createTextNode(screenDetail['name']);
			p.appendChild(screenName);

			let img = document.createElement("img");
			img.src ='assets/images/' + screenDetail['poster'];
			img.alt = screenDetail['name'];


			let p2 = document.createElement('p');
			let ticketLeft = document.createTextNode("Available:"+ screenDetail['avaliable']);
			p2.appendChild(ticketLeft);

			let inputdiv =  document.createElement('div');
			inputdiv.className = "inputdiv";

			let input = document.createElement("INPUT");
			input.setAttribute("type", "number");
			input.setAttribute("min", "1");
			input.setAttribute("value", "1");


			//buy button 
			var buy = document.createElement('button');
			buy.type = "button";
			buy.className = "buyButton";
			var buytext = document.createTextNode("Buy");
			buy.appendChild(buytext);

			inputdiv.appendChild(input);
			inputdiv.appendChild(buy);

			if (screenDetail['avaliable'] == 0){
				buy.disabled = true;
				input.disabled = true;
			}
			
			eachScreen.appendChild(p);

			eachScreen.appendChild(newscreening);
			eachScreen.appendChild(img);
			eachScreen.appendChild(p2);
			eachScreen.appendChild(inputdiv);

			div.appendChild(eachScreen);
			}
		  }
		
		main.appendChild(div);

		//clear button 
		var clear = document.createElement('button');
		clear.type = "button";
	
		
 		var cleartext = document.createTextNode("Reset");
        clear.appendChild(cleartext);
		clear.id = "clear";
		clear.setAttribute("onclick", "clearLocalStorage()");//clear data when user click

		main.appendChild(clear);

	
		

}//createForm


function swipForm(){
	var div = document.createElement("div");
			
	div.classList.add('ontop');

	const select = '\
	<select id="select1">\
		<option value="">--Form--</option>\
		<option value="screen1">The Super Mario Bros</option>\
		<option value="screen2">Avatar: The Way of Water</option>\
		<option value="screen3">The Little Mermaid</option>\
		<option value="screen4">First Love</option>\
		<option value="screen5">M3GAN</option>\
	</select>';
	const select2 = '\
	<select id="select2">\
		<option value="">--To--</option>\
		<option value="screen1">The Super Mario Bros</option>\
		<option value="screen2">Avatar: The Way of Water</option>\
		<option value="screen3">The Little Mermaid</option>\
		<option value="screen4">First Love</option>\
		<option value="screen5">M3GAN</option>\
	</select>';

	var htmltext= '\
	<div class="form-popup" id="create-event-form"  method="POST"> \
	<button class="close-popup x-button"> x</button>\
		<div class="eventContainer">\
			<div id="swipForm">\
				<h2 style="margin-bottom: 2%">Swap Movies</h2>\
				<div id="select">';

	htmltext += select;
	htmltext +=select2;

	htmltext  += '\
				</div>\
				<button type="button" class="swiptTicket" onclick="swipTicket(this)">Swap</button>\
			</div>\
		</div>\
	</div>';

	div.innerHTML = htmltext;
	var main = document.getElementsByTagName('main')[0]
	main.append(div);

	$('main > *:not(.ontop)').addClass('blurred');

	$('.ontop').on('click', function(event) {
		if ($(event.target).is('.ontop')){
			event.preventDefault();
			$('main > *:not(.ontop)').removeClass('blurred');
			div.remove();
		}
	});
	$('.close-popup').on('click', function(event) {
		div.remove();
	});
}



/*
 *  This function will clear the local storage and reload the website.
*/	
function clearLocalStorage(){
	if (confirm("Are you sure want to clear all the data?") == true) {
		localStorage.clear();
		location.reload();
	  } else {
		location.reload();
	  }

}//Clear


function dailyReportForm(){
	var div = document.createElement("div");
			
	div.classList.add('ontop');

	var htmltext= '\
	<div class="form-popup" id="create-event-form"  method="POST"> \
	<button class="close-popup x-button">x</button>\
	<div class="eventContainer">\
			<div id="loginForm">\
				<h2 style="margin-bottom: 2%">Daily Report</h2>';

	

	htmltext += getDailyReport();

	htmltext += '<button type="button" class="swiptTicket" onclick="downloadRepoet()">Download Report</button></div></div></div>';

	div.innerHTML = htmltext;

	var main = document.getElementsByTagName('main')[0]
	main.append(div);

	$('main > *:not(.ontop)').addClass('blurred');

	$('.ontop').on('click', function(event) {
		if ($(event.target).is('.ontop')){
			event.preventDefault();
			$('main > *:not(.ontop)').removeClass('blurred');
			div.remove();
		}
	});
	$('.close-popup').on('click', function(event) {
		div.remove();
	});
}


function getDailyReport(){

	var text ='';
	var total = 0;
	for (var i = 0; i < localStorage.length; i++) {

		var key = localStorage.key(i);

		var screenDetail = JSON.parse(localStorage[key]);

		text += "<p>Total daily sale for " + key + " (" + screenDetail['name'] + "): " + screenDetail['sale'] + "</p>";
	
		total += screenDetail['sale'];
	}
	text += "<p>Overall Daily Sale: " + total + "</p>";

	return text;
	
}


function downloadRepoet(){

	var rows = 'screen,moveieName,sales\n';

	var total = 0;
	for (var i = 0; i < localStorage.length; i++) {

		var key = localStorage.key(i);

		var screenDetail = JSON.parse(localStorage[key]);

		rows += ""+ key + "," + screenDetail['name'] + "," + screenDetail['sale'] + "\n";
	
		total += screenDetail['sale'];
	}
	rows += " , , \n";
	rows += "Overall Daily Sale: , ," + total+"\n";
	
	let csvContent = "data:text/csv;charset=utf-8," 
		+ rows;

	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
}

function swipTicket(e){

	var input = e.parentElement.querySelectorAll("select");

	select1 = input[0].value;
	select2 = input[1].value;

	var data1 = JSON.parse(localStorage.getItem(select1));
	var data2 = JSON.parse(localStorage.getItem(select2));

	if ( select1 !="" && select2 !="" && (select1 != select2) && parseInt(data1['sale']) > 0 ){
		data1['sale'] = (parseInt(data1['sale']) - 1);
		data2['sale'] = (parseInt(data2['sale']) + 1);

		data1['avaliable'] = (parseInt(data1['avaliable']) + 1);
		data2['avaliable'] = (parseInt(data2['avaliable']) - 1);

		localStorage.setItem(select1,JSON.stringify(data1));
		localStorage.setItem(select2,JSON.stringify(data2));

		location.reload();
	}else{
		alert("You may did the same selection or the movie you select hasn't been sale it, please try again!");
		location.reload();
	}


	console.log(input);
}
 
 
$(document).ready(function(){
	$('.buyButton').click(function(){
        var element = $(this).parents("div");

		const idName = element[1].id;
		var myElement = document.getElementById(idName);
		var input = myElement.querySelectorAll("input");

		var data = JSON.parse(localStorage.getItem(idName));

		if (input[0].value > 0 && input[0].value <= parseInt(data['avaliable'])){
			data['sale'] = (parseInt(data['sale']) + parseInt(input[0].value));
			data['avaliable'] = (parseInt(data['avaliable']) - parseInt(input[0].value));

			localStorage.setItem(idName,JSON.stringify(data));

			location.reload();
		}else{
			alert("You should input the valid number, please try again!");
			location.reload();
		}

		
    }); 

	$('.newScreeningButton').click(function(){
        var element = $(this).parents("div");
	
		const idName = element[0].id;
		var data = JSON.parse(localStorage.getItem(idName));


		data['avaliable'] = 50;

		localStorage.setItem(idName,JSON.stringify(data));

		location.reload();
    }); 

});
	
