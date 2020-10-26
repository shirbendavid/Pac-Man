
/* game settings */

function myFunction(val) {
    document.getElementById("BallsNumber").innerHTML = val;
}

$.validator.setDefaults({
    submitHandler: function () {
        alert("submitted!");
    }
});

$().ready(function () {
    // validate the comment form when it is submitted
    $("#commentForm").validate();

    $("#setting").validate({
        rules: {
            up: {
                required: true,
                checkKey1: true
            },
            down: {
                required: true,
                checkKey2: true
            },
            left: {
                required: true,
                checkKey3: true
            },
            right: {
                required: true,
                checkKey4: true
            },
            fiveBall: {
                checkColor1: true
            },
            fifteenBall: {
                checkColor2: true
            },
            twentyFiveBall: {
                checkColor3: true
            },
        },
        messages: {
            up: {
                required: "Please enter up move key", 
                checkKey1: "Each key should be different"
            },
            down: {
                required: "Please enter down move key",
                checkKey2: "Each key should be different"
            },
            left: {
                required: "Please enter left move key",
                checkKey3: "Each key should be different"
            },
            right: {
                required: "Please enter right move key",
                checkKey4: "Each key should be different"
            },
            fiveBall: {
                checkColor1: "Each ball should have a different color"
            },
            fifteenBall: {
                checkColor2: "Each ball should have a different color"
            },
            twentyFiveBall: {
                checkColor3: "Each ball should have a different color"
            }
        },
        submitHandler: function (form, event) {
            colorBalls[0] = $("#fiveBall").val();
            colorBalls[1] = $("#fifteenBall").val();
            colorBalls[2] = $("#twentyFiveBall").val();
            numOfBall = $("#numberOfBalls").val();
            timeOfGame = $("#timeOfGame").val();
            numOfMonsters = $("#numberOfMonsters").val();
            clearAllSettingsFields();
            newGame();
        }
    });
});

window.addEventListener("keydown", function(event) {
    var control = false;
    if(event.target.id === "up"){
        gameKeys[0] = event.code;
        control=true;
      }
    if(event.target.id === "down"){
        gameKeys[1] = event.code;  
        control=true;
      } 
    if(event.target.id === "left"){
        gameKeys[2] = event.code;
        control=true;
      }
      if(event.target.id === "right"){
        gameKeys[3] = event.code;
        control=true;
      }
    if(control)
      event.target.value = event.code;
  }, true);

jQuery.validator.addMethod("checkColor1", function (value, element) {
    color1 = $("#fiveBall").val();
    color2 = $("#fifteenBall").val();
    color3 = $("#twentyFiveBall").val();
    return !(color1 == color2 || color1 == color3);
});
jQuery.validator.addMethod("checkColor2", function (value, element) {
    color1 = $("#fiveBall").val();
    color2 = $("#fifteenBall").val();
    color3 = $("#twentyFiveBall").val();
    return !(color1 == color2 || color2 == color3);
});
jQuery.validator.addMethod("checkColor3", function (value, element) {
    color1 = $("#fiveBall").val();
    color2 = $("#fifteenBall").val();
    color3 = $("#twentyFiveBall").val();
    return !(color1 == color3 || color2 == color3);
});

jQuery.validator.addMethod("checkKey1", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key1==key2 || key1==key3 || key1==key4);
});
jQuery.validator.addMethod("checkKey2", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key2==key3 || key2==key4 || key2==key1);
});
jQuery.validator.addMethod("checkKey3", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key3==key4 || key3==key1 || key3==key2);
});
jQuery.validator.addMethod("checkKey4", function (value, element) {
    key1 = $("#up").val();
    key2 = $("#down").val();
    key3 = $("#left").val();
    key4 = $("#right").val();
    return !(key4==key1 || key4==key2 || key4==key3);
});

/*random settings by buttom*/
function randomSettings(){
    $("#up")[0].value="ArrowUp";
    $("#down")[0].value="ArrowDown";
    $("#right")[0].value= "ArrowRight";
    $("#left")[0].value= "ArrowLeft";
    gameKeys[0] = $("#up")[0].value;
    gameKeys[1] = $("#down")[0].value;
    gameKeys[2] = $("#left")[0].value;
    gameKeys[3] = $("#right")[0].value;
    $("#fiveBall")[0].value=getRandomColor();
    $("#fifteenBall")[0].value=getRandomColor();
    $("#twentyFiveBall")[0].value=getRandomColor();
    $("#numberOfBalls")[0].value=randomNumberOfBalls();
    $("#timeOfGame")[0].value = 60 + Math.floor((Math.random() * 100));
    $("#numberOfMonsters")[0].value=  randonNumberOfMonsters();
}

function randomNumberOfBalls(){
    var numBalls = '56789';
    var ballsNumber= '';
    for (var i = 0; i < 2; i++) {
        ballsNumber += numBalls[Math.floor(Math.random() * 5)];
    }
    if(ballsNumber<50 || ballsNumber>90){
        var min = Math.ceil(50);
        var max = Math.floor(90);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    else
        return ballsNumber;
}

function randonNumberOfMonsters(){
    var numMonsters = '1234';
    var monstersNumber='';
    for (var i = 0; i < 1; i++) {
        monstersNumber += numMonsters[Math.floor(Math.random() * 4)];
      }
      return monstersNumber;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function clearAllSettingsFields(){
    $("#up").val("");
    $("#down").val("");
    $("#left").val("");
    $("#right").val("");
    $("#numberOfBalls").val(50);
    $("#timeOfGame").val(60);
    $("#numberOfMonsters").val(1);  
  }


