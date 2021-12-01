/*Funkcija prikazuje sve detalje ulogovanog korisnika.*/
function showUser() {

	var user = JSON.parse(localStorage.getItem("Online_User"));

	document.getElementById('usernameView').value = user.username;
	document.getElementById('nameView').value = user.name;
	document.getElementById('surnameView').value = user.surname;
	document.getElementById('genderView').value = user.gender;
	document.getElementById('imageView').src = user.image;
	document.getElementById('dateView').value = user.dateOfBirth;
	document.getElementById('emailView').value = user.email;
	document.getElementById('phoneView').value = user.phone;
	document.getElementById('addressView').value = user.address;
}
/*Funkcija prikazuje sve detalje ulogovanog korisnika.*/
function changeUserShow() {

	var user = JSON.parse(localStorage.getItem("Online_User"));

	document.getElementById('usernameChange').value = user.username;
	document.getElementById('nameChange').value = user.name;
	document.getElementById('surnameChange').value = user.surname;
	document.getElementById('genderChange').value = user.gender;
	document.getElementById('dateChange').value = user.date;
	document.getElementById('emailChange').value = user.email;
	document.getElementById('phoneChange').value = user.phone;
	document.getElementById('addressChange').value = user.address;
}
/*Funkcija dozvoljava menjanje detalja ulogovanog korisnika
i snima ga pod istim kljucem i overwrituje.*/
function changeUserChange() {

	var username = document.getElementById("usernameChange");
	var password1 = document.getElementById("passwordChange1");
	var password2 = document.getElementById("passwordChange2");
	var name = document.getElementById("nameChange");
	var surname = document.getElementById("surnameChange");
	var gender = document.getElementById("genderChange");
	var image = document.getElementById("imageChange");
	var dateOfBirth = document.getElementById("dateChange");
	var email = document.getElementById("emailChange");
	var phone = document.getElementById("phoneChange");
	var address = document.getElementById("addressChange");

	if (password1.value == password2.value) {
		var User = {
		"username" : username.value,
		"password" : password2.value,
		"name" : name.value,
		"surname" : surname.value,
		"gender" : gender.value,
		"image" : "../imgs/profile_pics/" + image.files[0].name,
		"dateOfBirth" : dateOfBirth.value,
		"email" : email.value,
		"phone" : phone.value,
		"address" : address.value,
		}

		var oUser = JSON.parse(localStorage.getItem("Online_User"));

		localStorage.removeItem("Online_User");
		localStorage.removeItem(oUser.sysName);

		var len = localStorage.length;
		User["sysName"] = oUser.sysName;
		localStorage.setItem("Online_User", JSON.stringify(User));
		localStorage.setItem(oUser.sysName, JSON.stringify(User));

		alert("You have changed profile successfully!!!");
		window.location = "main_logged.html";
		}
	
	else {
		document.getElementById('passwordInput1').value = "";
		document.getElementById('passwordInput2').value = "";
		alert("Fields \"Password\" and \"Repeat the password\" must be equal");
	}


	
}

