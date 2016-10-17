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