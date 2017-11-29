/**
* Calculate the streng of the password given.
* The strength is measured in a scale from 0 to 10.
* 
* The rules are as follows:
* 1. If the password has at least one lowercase letter,
* the strength is increased by 2.
* 2. If the password has at least one uppercase letter,
* the strength is increased by 2.
* 3. If the password has at least one number,
* the strength is increased by 2.
* 4. If the password has at least one special character,
* the strength is increased by 2.
* 5. If the password has more than 8 charactes,
* the strength is increased by 2.
*
* @param string password The password to check
* @return int THe strength of the password
*/
function getPasswordStrength(password) {

    // Regular expressions to check the password
    var rules = new Array();
    rules.push("[A-Z]"); // For uppercase letters
    rules.push("[a-z]"); // For lowercase letters
    rules.push("[0-9]"); // For numbers 
    rules.push("[$@$!%*#?&]"); // For special characters

    var score = 0;

    // Validation for each rule
    for (var i = 0; i < rules.length; i++) {
        if((new RegExp (rules[i])).test(password)) {
            score += 2;
        }
    }	

    // Rule for password length
    if(password.length > 8) {
        score += 2;
    }

    return score;
}

/**
* Checks the password strength every time the user types a new character
* Updates the strength bar according to the password strength and shows
* any necessary messages.
*/
function checkPassword() {
    // Obtains the password
    var password = this.value;

    // Get the password strength
    var strength = getPasswordStrength(password);
    var message = "";
    var status = "danger";

    // Updates the message and the strength bar
    switch(strength) {
        case 0:
        case 2:
            message = "Very Weak";
            status = "danger";
            break;
        case 4:
            message = "Weak";
            status = "danger";
            break;
        case 6:
            message = "Normal";
            status = "warning";
            break;
        case 8:
            message = "Strong";
            status = "info";
            break;
        case 10:
            message = "Very Strong";
            status = "success";
            break;
    }

    // Clear the messages
    $("#password-error").html("");
    $("#strength-indicator").html("");

    // Show error message if the password is too short
    if(password.length < 5) {
        $("#password-error").html("Too short");
    }

    // Updates the strength bar
    $("#strength-bar").removeClass("bg-danger bg-warning bg-info bg-success").addClass("bg-" + status);
    $("#strength-bar").css("width", (strength * 10).toString() + "%");

    // Show the strength of the password
    $("#strength-indicator").html(message);
    $("#strength-indicator").removeClass("text-danger text-warning text-info text-success").addClass("text-" + status);
}

/**
* Checks if the password confirmation matches the password introduced
*/
function checkPasswordConfirmation() {
    var password = $("#password").val();
    var password_confirmation = $("#password-confirmation").val();

    $("#password-confirm-error").html("");
    if(password != password_confirmation) {
        $("#password-confirm-error").html("The passwords do not match");
    }
}

// Set the event listeners
$("#password").keyup(checkPassword);
$("#password-confirmation").keyup(checkPasswordConfirmation);
