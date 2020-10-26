var user = {
  firstname: "",
  lastName: "",
  username: "",
  password: "",
  email: "",
  birth: ""
};
var users = [];
var defaultUser = { firstname: "p", lastName: "p", username: "p", password: "p", email: "p@example.com", birth: "1/1/1990" };
users.push(defaultUser);

/*start page with welcome*/
$(document).ready(function () {
  welcome();
});

function welcome() {
  $("#welcomeDiv").show();
  $("#loginDiv").hide();
  $("#registerDiv").hide();
  $("#settingDiv").hide();
  $("#canvesDiv").hide();
  stopGame();

}

function login() {
  $("#welcomeDiv").hide();
  $("#loginDiv").show();
  $("#registerDiv").hide();
  $("#settingDiv").hide();
  $("#canvesDiv").hide();
  stopGame();
}

function register() {
  $("#welcomeDiv").hide();
  $("#loginDiv").hide();
  $("#registerDiv").show();
  $("#settingDiv").hide();
  $("#canvesDiv").hide();
  stopGame();
}

function setting() {
  $("#welcomeDiv").hide();
  $("#loginDiv").hide();
  $("#registerDiv").hide();
  $("#settingDiv").show();
  $("#canvesDiv").hide();
}

/*login form*/
function loginButton() {
  var userCheck = document.getElementById("checkUsername").value;
  var passwordCheck = document.getElementById("checkPassword").value;
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === userCheck) {
      if (users[i].password === passwordCheck) {
        user = users[i];
        clearFiledsLogin()
        setting();
        return;
      }
      else {
        alert("Wrong password. \nPlease try again");
        clearFiledsLogin()
        return login();
      }
    }
  }
  alert("User does not exist in the system");
  clearFiledsLogin()
}
/*Clear fields in login form*/
function clearFiledsLogin() {
  $("#checkUsername").val("");
  $("#checkPassword").val("");

}

/*exit from Model Dialog with esc*/
$(document).keydown(function (e) {
  if (e.keyCode == 27) {
    $("#closeModel").click();
  }
});

/*form of registration*/
$.validator.setDefaults({
  submitHandler: function () {
    alert("submitted!");
  }
});

$().ready(function () {
  // validate the comment form when it is submitted
  $("#commentForm").validate();

  // validate signup form on keyup and submit
  $("#signupForm").validate({
    rules: {
      firstname: {
        required: true,
        checkName: true
      },
      lastname: {
        required: true,
        checkName: true
      },
      username: {
        required: true,
        minlength: 2
      },
      password: {
        required: true,
        minlength: 6,
        checkPassword: true
      },
      confirm_password: {
        required: true,
        minlength: 6,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      birth: {
        required: true,
        checkDate: true
      }
    },
    messages: {
      firstname: {
        required: "Please enter your first name",
        checkName: "Your name should contain only letter"

      },
      lastname: {
        required: "Please enter your last name",
        checkName: "Your name should contain only letter"
      },
      username: {
        required: "Please enter a username",
        minlength: "Your username must consist of at least 2 characters"
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long",
        checkPassword: "Password must contain at least one letter and one number"
      },
      confirm_password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long",
        equalTo: "Please enter the same password as above"
      },
      birth: {
        required: "Pleasr enter a birthday",
        checkDate: "Please enter a valid date"
      },
      email: "Please enter a valid email address",
    },
    submitHandler: function (form, event) {
      var newUser = Object.create(user);
      newUser.firstName = $("#firstname").val();
      newUser.lastName = $("#lastname").val();
      newUser.username = $("#username").val();
      newUser.password = $("#password").val();
      newUser.email = $("#email").val();
      newUser.birth = $("#birth").val();
      users.push(newUser);
      alert(newUser.username + " has been created ");
      document.getElementById("signupForm").reset();
      login();
    }
  });
});

/*functions for validation data in registrtion*/
/*valid password - at least one letter and one number*/
jQuery.validator.addMethod("checkPassword", function (value, element) {
  return /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value) && /^[0-9a-zA-Z]+$/.test(value);
}),

  /*valid first name and last name*/
  jQuery.validator.addMethod("checkName", function (value, element) {
    return /^[^0-9]+$/.test(value);
  }),

  /*legal date*/
  jQuery.validator.addMethod("checkDate", function (value, element) {
    return Date.now() - new Date(value).getTime() > 0;
  });