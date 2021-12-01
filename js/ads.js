/*Funkcija koja skuplja parametre za oglas i snima ga u localStorage pod kljucem
"Ad" + broj upisanih oglasa + 1*/
function createAd() {

	var name = document.getElementById("adNameInput");
	var price = document.getElementById("adPriceInput");
	var quantity = document.getElementById("adQInput");
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	var category = document.getElementById("adCategoryInput");
	var description = document.getElementById("adDescInput");
	var image = document.getElementById("adImageInput").files[0].name;
	var homeDelivery = document.getElementById("adHomeDlvrInput");

	var Ad = {
		"name" : name.value,
		"price" : price.value + " " + "RSD",
		"quantity" : quantity.value,
		"date" : day + "-" + month + "-" + year,
		"category" : category.value,
		"description" : description.value,
		"image" : "imgs/ad_imgs/" + image,
		"homeDelivery" : homeDelivery.value,
	}

	var len = localStorage.length;
	var l = 0;
	for(var i = 0; i <= len; i++){
		var t = localStorage.getItem("Ad" + i);
		if(t != null) {
			l = i + 1;
		}

	}
	localStorage.setItem("Ad" + l++, JSON.stringify(Ad));
	alert("You have created ad successfully!!!");
	window.location = "main_logged.html";
}

/*Funkcija koja dinamicki ucitava oglase snimljene u localStorage i prikazuje
ih na glavnoj strani*/
function parseAds() {
	for (var key in localStorage) {
		if (key.toLowerCase().startsWith("ad")) {
			var a = localStorage.getItem(key);
			var adInfo = JSON.parse(a);

			var name = adInfo.name;
			var image = adInfo.image;
			var price = adInfo.price;
			var category = adInfo.category;

			var ad = document.createElement("div");
			ad.classList.add("AdDiv");

			var img = document.createElement("img");
			img.setAttribute("src", image);
			img.classList.add("AdImg");

			var nameDiv = document.createElement("div");
			nameDiv.appendChild(document.createTextNode(name));
			nameDiv.classList.add("AdDesc");
			nameDiv.setAttribute("id", key);

			/*Ovaj deo funkcije dodeljuje svakom oglasu 
			evenListener koji uzima unikatan id od svakog 
			oglasa i na taj nacin pravi objekat izabranog oglasa*/

			nameDiv.addEventListener("click", function() {
   				var nm = this.id;
   				var selectedAd = JSON.parse(localStorage.getItem(nm));
   				selectedAd["id"] = nm;
   				selectedAd = JSON.stringify(selectedAd);
   				localStorage.setItem("selectedAd", selectedAd);
   				window.open("ad_view.html", "_self");
   			});

			var priceDiv = document.createElement("div");
			priceDiv.appendChild(document.createTextNode(price));
			priceDiv.classList.add("AdPrice");

			var cat = document.createElement("div");
			cat.appendChild(document.createTextNode(category));
			cat.classList.add("AdCategory");
			cat.setAttribute("style", "display: none");

			ad.appendChild(img);
			ad.appendChild(nameDiv);
			ad.appendChild(priceDiv);
			ad.appendChild(cat);

			document.getElementById("AdBench").appendChild(ad);

		}
	}
}

/*Funkcija pretrage. Filtraciona metoda*/
function search() {
	var input, filter, main, div, a;
  	input = document.getElementById("search_field");
  	filter = input.value.toUpperCase();
  	main = document.getElementById("AdBench");
  	div = main.getElementsByClassName("AdDiv");
  		for (var i = 0; i < div.length; i++) {
    	a = div[i].getElementsByClassName("AdDesc")[0];
  			if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    			div[i].style.display = "";
  			} else {
    			div[i].style.display = "none";
  			}
		}       
}

/*Funkcija kategorija. Koristi isti kod kao funkcija pretrage
ali umesto unosa podataka, klikom na zeljenu kategoruju promenljiva
pretrage dobija vrednost izabrane kategorije i vrsi dalje filtriranje*/
function category(category) {
	var input, filter, main, div, a;
  	filter = category;
  	main = document.getElementById("AdBench");
  	div = main.getElementsByClassName("AdDiv");
  		for (var i = 0; i < div.length; i++) {
    	a = div[i].getElementsByClassName("AdCategory")[0];
  			if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    			div[i].style.display = "";
  			} else {
    			div[i].style.display = "none";
  			}
		}       
}

/*Funkcija koja ucitava detalje pojedinacnog oglasa na stranici.
Ukoliko kucna dostava nije moguca, blokira se mogucnost da 
se cekira dugme homeDelivery*/
function adView() {

	var adOpen = JSON.parse(localStorage.getItem("selectedAd"));
	document.getElementById("adOpenImg").src = adOpen.image;
	document.getElementById("adOpenName").innerHTML = adOpen.name;
	document.getElementById("dateAdded").innerHTML = adOpen.date;
	document.getElementById("homeDelivery").innerHTML = adOpen.homeDelivery;
	document.getElementById("price").innerHTML = adOpen.price;
	document.getElementById("quantityShow").innerHTML = adOpen.quantity;
	document.getElementById("adDescription").innerHTML = adOpen.description;

	if(adOpen.homeDelivery == "NO"){
		document.getElementById("buy_inft").disabled = true;
	}
}

/*Funkcija prima parametar kolicine robe za kupovinu.
Pri kupovini pravi se novi string u ls sa umanjenom kolicinom
za odabrani iznos. Ukoliko nema dovoljno robe na stanju kupac 
biva obavesten*/
function buy() {
	var quantityInput = document.getElementById("payment").value;
	var adOpen = JSON.parse(localStorage.getItem("selectedAd"));
	var adQuantity = adOpen.quantity;
	var result = parseInt(adQuantity) - parseInt(quantityInput);
	if(parseInt(result) < 0) {
		alert("There is not enough items in stock!!!")
	}
	else {
		alert("Successfully bought");
		adOpen.quantity = result;
		var adOpenString = JSON.stringify(adOpen);
		localStorage.setItem(adOpen.id, adOpenString);
		localStorage.setItem("selectedAd", adOpenString);
	}
}

