/*Funckija kupi parametre unesene za kreiranje novog korisnika.
Snima ga u localStorage pod klucem "User" + broj upisanih korisnika + 1*/
function register() {

	var username = document.getElementById("usernameInput");
	var password1 = document.getElementById("passwordInput1");
	var password2 = document.getElementById("passwordInput2");
	var name = document.getElementById("nameInput");
	var surname = document.getElementById("surnameInput");
	var gender = document.getElementById("genderInput");
	var image = document.getElementById("imageInput");
	var dateOfBirth = document.getElementById("dateInput");
	var email = document.getElementById("emailInput");
	var phone = document.getElementById("phoneInput");
	var address = document.getElementById("addressInput");

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

		var len = localStorage.length;
		var l = 0;
		for(var i = 0; i <= len; i++){
			var t = localStorage.getItem("User" + i);
			if(t != null) {
			l = i + 1;
			}
		}
		var l1 = l
		var len1 = localStorage.length;
		User["sysName"] = "User" + l1++;
		localStorage.setItem("User" + l++, JSON.stringify(User));

		alert("You have registered successfully!!!");
		window.location = "main.html";
		}
	
	else {
		document.getElementById('passwordInput1').value = "";
		document.getElementById('passwordInput2').value = "";
		alert("Fields \"Password\" and \"Repeat the password\" must be equal");
	}


	
}

