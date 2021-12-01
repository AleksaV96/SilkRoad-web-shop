/*Funckija za login. Proverava da li uneseno korisnicko
ime postoji, a zatim da li je lozinka ispravna.
Ukoliko prodje ove provere u localStorage se upisuje string
Online_User i prebacuje na stranicu ulogovanog korisnika*/
function login() {

	localStorage.removeItem("Online_User");
	var users = [];
	var temp_obj; 

	for (var key in localStorage) {
		if (key.toLowerCase().startsWith("user")) {
		temp_obj = localStorage.getItem(key);
		users.push(JSON.parse(temp_obj));
		}
	}
	
	var usr = document.getElementById("inpt_u").value;
	var pas = document.getElementById("inpt_p").value;
	
	var user_names = [];

	for (var x in users) {
		user_names.push(users[x].username);
	}

	var usr_indx = user_names.indexOf(usr);
	var onlineUser;

	if (usr_indx !== -1 ) {
		if (pas == users[usr_indx].password) {
		onlineUser = users[usr_indx];
		localStorage.setItem("Online_User", JSON.stringify(onlineUser));
		window.location = "main_logged.html";
		} 
		else {
			alert("wrong password!");
		}
	}
	else {
		alert("no such username");
	}
}

/*Funkcija uzima parametre ime i sliku ulogovanog usera,
i postalja ih na stranicu ulogovanog usera.*/
function onlineUser() {

	var user = JSON.parse(localStorage.getItem("Online_User"));
	document.getElementById("user_name").innerHTML = user.name;
	document.getElementById("prof_pic").src = user.image;
}

/*Funkcija brise string iz ls sa kljucem Online_User*/
function logout() {
	localStorage.removeItem("Online_User");
	window.location = "main.html"
}

/*Funkcija proverava da li postoji string u ls pod nazivom Online_User.
Ukoliko ne, znaci da korisnik nije ulogovan i vraca osnovnu stranu.*/
function checkIfOnline() {

	var o = localStorage.getItem("Online_User");
	if(o == null) {
		window.open("main.html", "_self");

	}
}