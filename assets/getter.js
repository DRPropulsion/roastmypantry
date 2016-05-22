/*function getRecipes(url, callback) {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
            cfunc(xhttp);
        }
    };
	xhttp.open("GET", url, true);
	xhttp.send();
}*/

//checks to see if keypress is enter
function checkForEnter() {
	if (event.keyCode == 13)
	{
		addToList();
		document.getElementById("inputBox").placeholder = "";
	}
}

//adds object to pantry list
function addToList() {
	var input = document.getElementById("inputBox").value.trim();
	if (input !== "")
	{
		document.getElementById("inputBox").value = "";
		document.getElementById("list").innerHTML += ('<li><span class="libg" onclick="remove(this)">'+input+'</span></li>');
	} 
}

//clears the pantry list
function clearList() {
	document.getElementById("list").innerHTML = "";
}

//gets random food pun
function getPun() {
	var punlist = [
		"\"Have you ever tried to eat a clock? It's very time consuming.\"",
		"\"The girl quit her job at the doughnut factory because she was fed up with the hole business.\"",
		"\"I relish the fact that you've mustard the strength to ketchup to me.\"",
		"\"I decided that becoming a vegetarian was a missed steak.\"",
		"\"When I opened the first snow-pea pod, one fell out and rolled under the fridge. One might say it was an escapea.\"",
		"\"Old colanders never die, they just can't take the strain anymore.\"",
		"\"Her company distributes gift boxed cashews and she has a delivery guy that drives her nuts.\"",
		"\"When making butter there is little margarine for error.\"",
		"\"My wife uses a kitchen implement to shred garlic and parmesan cheese, both of which I hate. It really is the grater of two evils.\"",
		"\"I went to a buffet dinner with my neighbor, who is a taxidermist. After such a big meal, I was stuffed.\"",
		"\"My mom ran out of poultry seasoning so she winged it.\"",
		"\"I get distracted by all the meats in the deli section, must be my short attention spam.\"",
		"\"We were going to ship a truck load of food, but we found it just wasn't palatable.\"",
		"\"My best friend and I attended culinary school together and then opened our own restaurant. I guess we are taste buds.\"",
		"\"The evil onion had many lairs.\"",
		"\"I tried to finish the leftovers, but ... foiled again.\"",
		"\"I can't tell you where to buy soy sauce tonight, but I can shoyu tamari.\"",
		"\"The cannibal hitman preferred take out food.\"",
		"\"It's very rare to find a steak this well done by a medium.\"",
		"\"Even covered in salad dressing my lettuce looked bare, so I put some cloves on it.\"",
		"\"My friend came around for dinner. We ate for 20 minutes, then he fainted again.\"",
		"\"I met a man who loves eating couches. I think he has a suite tooth.\"",
		"\"Two loaves of bread wanted to get married, so they eloafed.\"",
		"\"\'I agree with you wholeheartedly,\' said the artichoke grower.\"",
		"\"People who eat their apples stem and seed and all improve their core values.\"",
		"\"A man was ambidextrous, he could eat sugar with both hands.\"",
		"\"The Vatican's supplier of duck eggs is elected by sacred balut.\""];
	var randomindex = Math.floor(Math.random() * punlist.length);
	return punlist[randomindex];
}

//jquery functions: api ping and hover coloration for clear button
$(document).ready(function() {
	$("#searchbutton").click(function() { 
		//$.get("http://food2fork.com/api/search?key=c8b4412d38aeeade93c0bab3425f24ce&q=", function(data) {
		addToList();
		var listofingredients = document.getElementById("list").innerHTML;
		//console.log(listofingredients);
		var unparsedingredientsquery = listofingredients.split(('</span></li><li><span class="libg" onclick="remove(this)">'));
		var ingredientquery = "";
		var postedingredients = "<p>You searched for: ";
		for (var i = 0; i < unparsedingredientsquery.length; i++) {
			if (i === unparsedingredientsquery.length - 1) {
				var item = unparsedingredientsquery[i];
				item = item.substring(0, item.length - 12);
				if (i===0) {
					item = item.substring(46);
				}
				postedingredients += ('<span class="libg">'+item+'</span>');
				ingredientquery += item;
			}
			else {
				var item = unparsedingredientsquery[i];
				if (i===0) {
					item = item.substring(46);
				}
				postedingredients += ('<span class="libg">'+item+'</span>') + " ";
				ingredientquery += item + "%2C%20";
			}
		}
		postedingredients += "</p>";
		if (ingredientquery==="") {
			document.getElementById("inputBox").placeholder = "You can't cook without ingredients!";
		}
		else {
			$.get("https://cz9dldanfb.execute-api.us-east-1.amazonaws.com/prod/ingredient/"+ingredientquery, function(data) {
				//console.log(data);
				document.getElementById("postedlist").innerHTML = "";
				document.getElementById("recipelist").innerHTML = "";
				var parseddata = "";
	/* 			var unparsedingredients = listofingredients.split("</li><li>");
				var postedingredients = "<p>You searched for: ";
				
				for (var i = 0; i < unparsedingredients.length; i++) {
					if (i === unparsedingredients.length - 1) {
						var item = unparsedingredients[i];
						item = item.substring(0, item.length-5);
						postedingredients += item;
					}
					else {
						var item = unparsedingredients[i];
						if (i===0) {
							item = item.substring(4);
						}
						postedingredients += item + " ";
					}
				}

				postedingredients += "</p>"; */
				
				/*THIS IS HOW YOU PARSE THE JSON
				for (var i = 0; i < data["recipes"].length; i++)
				{
					console.log(data["recipes"][i]);
				}
				*/
				
				for (var i = 0; i < data["recipes"].length; i++) {
					var socrank = Math.floor(100 * data["recipes"][i]["social_rank"])/100.0;
					parseddata += ('<li class="recipe">'
								+'<a href="'+data["recipes"][i]["source_url"]+'"><img src="'+data["recipes"][i]["image_url"]+'"></img></a>'
								+'<span><h1 class="recipeh1"><a href="'+data["recipes"][i]["source_url"]+'">'+data["recipes"][i]["title"]+'</a></h1>'
								+'<h2 class="recipeh2"><a href="'+data["recipes"][i]["publisher_url"]+'">from '+data["recipes"][i]["publisher"]+'</a></h2>'
								+'<h3>Social Rank  </h3>'
								+'<span class="rank">'+socrank+'</span></span>'
								+'<p class="pun">'+getPun()+'</p></li>');
				}
				if (data["recipes"].length === 0) {
					parseddata += '<span class="error">Alphabet Soup!  It looks like there\'s nothing containing all of your ingredients.  Please try a less detailed search.</span>';
				}
				var modalobject = document.getElementById("recipeModal")
				document.getElementById("postedlist").innerHTML += postedingredients;
				document.getElementById("recipelist").innerHTML += parseddata;
				modalobject.style.display = "block";
			});
		}
	});
	$(".clearer").hover(function(){
		document.getElementById("clearbutton").style.backgroundColor = "grey";
	},
	function() {
		document.getElementById("clearbutton").style.backgroundColor = "#999999";
	});
});

