
var arrayOfAnswers = ["A","B","C", "D"];

var stopTimer = false;
var seconds = 0;

var questions = [
  {
      question: "Commonly used data types DO Not Include:",
	  possibleAnswers : [
		"A. strings",
		"B. booleans",
		"C. alerts",
		"D. numbers"
	  ],	  
      answer: "C"
    },
    {
      question: "The condition in an if / else statement is encloed with ________.",
	  possibleAnswers : [
		"A. quotes",
		"B. curly brackets",
		"C. parantheses",
		"D. square brackets"
	  ],	  
      answer: "C"
    },
    {
      question: "Array in JavaScript can be used to store ________.",
	  possibleAnswers : [
		"A. numbers and strings",
		"B. other arrays",
		"C. booleans",
		"D. all the above"
	  ],	  
      answer: "A"
    },
    {
      question: "String values must be enclosed within ________ when being assigned to variables.",
	  possibleAnswers : [
		"A. commas",
		"B. curly brackets",
		"C. quotes",
		"D. parenthesis"
	  ],	  
      answer: "C"
    }    
  ];
  
	function isCorrectAnswer(index, correctAnswer)
	{	
		return arrayOfAnswers[index] == correctAnswer;	
	}
  
	
	function startAlerts(){			
		
		var countdown = setInterval(function() {	
		
		seconds = document.getElementById("countdown").innerText;		
		
		seconds = seconds - 1;
		
		document.getElementById("countdown").innerText = seconds;
		
		if (seconds <= 0 || stopTimer == true) {
			clearInterval(countdown);
			gotoScorePage();
		}
		}, 1000);			
	}
	
	
	function btnStartQuiz_Click(){				
		document.getElementById("header").style.display = "none";		
		document.getElementById("questionArea").style.display = "block";
		startAlerts();
		setTimeout(displayQuestion(0,null), 10000);			
	}
	
	function decrementInAlerts(){
		document.getElementById("countdown").innerText = parseInt(document.getElementById("countdown").innerText) - 10;
	}
	
	function displayQuestion(questionNo, answerChooseIndex)
	{		
	
			if(parseInt(document.getElementById("countdown").innerText) > 0 && stopTimer == false){
				var questionNo1 = questions[questionNo];
				var possibleAnswers = questionNo1.possibleAnswers;
				var buttonHtml = "";
				
				for(var i = 0; i< possibleAnswers.length ;i++)
				{
					buttonHtml += "<input id='btnQuestion-id_"+questionNo.toString()+"-answer_"+i.toString()+"' type='button' value='" + possibleAnswers[i] + "' onclick='answerClick(this)' /> <br/>";
				}
				 
				var questionHtml = "<div class='questionHTML'>" + 
				"<h2>" + questionNo1.question + "</h2>" + 
				buttonHtml + " </div>";
				
				document.getElementById("questions").innerHTML = questionHtml;				
			}
			else{
				gotoScorePage();
			}
	}
	
	async function answerClick(button){						
			
	if(parseInt(document.getElementById("countdown").innerText) > 0 && stopTimer == false){
	
		var questionNo = button.id.substring(button.id.indexOf("_") + 1,button.id.lastIndexOf('-'));
		var userSelectedAnswerIndex = button.id.substring(button.id.lastIndexOf("_") + 1,button.id.length);					
		
		
		if(parseInt(questionNo) + 1 == questions.length){
			
			displayResult(questionNo, userSelectedAnswerIndex, false);
			
			document.getElementById("questions").style.display = "none";
				
			gotoScorePage();
			
			stopTimer = true;
		}
		else{					
			displayResult(questionNo, userSelectedAnswerIndex, true); 
		}
	}
	else{
		gotoScorePage();
	}
			
		}		
		
	function displayResult(questionNo, userSelectedAnswerIndex, gotoNextPage){
		
		var resultHTML = "";
				
		 var question = questions[questionNo];				 
		 resultHTML += "<hr/> <br/> "; 
		
		if( isCorrectAnswer(parseInt(userSelectedAnswerIndex), question.answer))
		{
			resultHTML += "Correct";
		} 
		else{
			 resultHTML += "Incorrect answer"; 
			decrementInAlerts();
		}						
			
			document.getElementById("result").style.display = "block";
			document.getElementById("result").innerHTML = resultHTML;
			
		if(gotoNextPage){			
			setTimeout(function(){
				document.getElementById("result").style.display = "none";
				displayQuestion(parseInt(questionNo) + 1, userSelectedAnswerIndex);			
			}, 1000);
		}
		
	}
	
	function gotoScorePage(){
	
		
		document.getElementById("initials").style.display = "block";
		document.getElementById("questionArea").style.display = "none";
		
		
		var buildScoreHtml = " All done!<br/> Your final score is " + document.getElementById("countdown").innerText + ". <br/>";
		
		buildScoreHtml += "Enter initials: <input type='text' id='initialsID' /> &nbsp; <input type='button' value='Submit' onclick='viewHighScores();'/>";
		
		
		document.getElementById("initials").innerHTML = buildScoreHtml;
	}
	
	function viewHighScores(){		

		
		var oldItems = JSON.parse(localStorage.getItem('score')) || [];		
		
		var score = {};					
		
		score.initials =  document.getElementById("initialsID").value;
		score.score =  document.getElementById("countdown").innerText;	

		oldItems.push(score);		
		
		localStorage.setItem("score", JSON.stringify(oldItems));
		
		document.getElementById("initials").style.display = "none";
		document.getElementById("scoreList").style.display = "block";
		
		var highScoreHtml = "<h1>High scores:</h1>";				
		
		var scores = JSON.parse(localStorage.getItem("score"));
		var i = scores.length;
		
		while(i--){
			score = scores[i];
			if(score != null){
				highScoreHtml += "<input type='label' value='" + (i + 1).toString() + ". " + score.initials + " - " + score.score  + "' > <br/>";
			}
		}		
		
		document.getElementById("scoreList").innerHTML = highScoreHtml;
	}
