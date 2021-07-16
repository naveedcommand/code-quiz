
var arrayOfAnswers = ["A","B","C", "D"];

var stopTimer = false;
var seconds = 0;
var correntAnswers = 0;

var questions = [
  {
      question: "Commonly used data types DO Not Include:",
	  possibleAnswers : [
		"A. Strings",
		"B. Booleans",
		"C. Alerts",
		"D. Numbers"
	  ],	  
      answer: "C"
    },
    {
      question: "The condition in an if / else statement is enclosed with ________.",
	  possibleAnswers : [
		"A. Quotes",
		"B. Curly brackets",
		"C. Parentheses",
		"D. Square brackets"
	  ],	  
      answer: "C"
    },
    {
      question: "An Array in JavaScript can be used to store ________.",
	  possibleAnswers : [
		"A. Numbers and strings",
		"B. Other arrays",
		"C. Booleans",
		"D. All of the above"
	  ],	  
      answer: "A"
    },
    {
      question: "String values must be enclosed within ________ when being assigned to variables.",
	  possibleAnswers : [
		"A. Commas",
		"B. Curly brackets",
		"C. Quotes",
		"D. Parentheses"
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
		document.getElementById("initials").style.display = "none";		
		document.getElementById("scoreList").style.display = "none";	
		document.getElementById("scores").style.display = "none";
		document.getElementById("result").style.display = "none";
		
		document.getElementById("questionArea").style.display = "block";
		document.getElementById("questions").style.display = "block";
		document.getElementById("countdown").innerText = "60";
		stopTimer = false;
		correntAnswers = 0;
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
				var buttonHtml = "<div class='col-12 mt-5'>";
				
				for(var i = 0; i< possibleAnswers.length ;i++)
				{
					buttonHtml += "<button id='btnQuestion-id_"+questionNo.toString()+"-answer_"+i.toString()+"' type='button' class='btn btn-primary btn-lg custom_btn' onclick='answerClick(this)'>" + possibleAnswers[i] +"</button><br/>";
				}
				
				buttonHtml += "</div>";
				 
				var questionHtml = "<div class='row'> <div class='col-12'> <h1><strong>" + questionNo1.question + "</strong></h1></div>" + 
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
		
		if( isCorrectAnswer(parseInt(userSelectedAnswerIndex), question.answer))
		{
			resultHTML += "<em>Correct</em>";
			correntAnswers +=1;
		} 
		else{
			 resultHTML += "<em>Incorrect answer</em>"; 
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
		document.getElementById("initialsID").value = "";
		document.getElementById("questionArea").style.display = "none";
		document.getElementById("scoreList").style.display = "none";
		document.getElementById("scores").style.display = "none";
		document.getElementById("finalScore").innerHTML = correntAnswers;
	}
	
	function viewHighScores(isFromInitials){			
		
		document.getElementById("header").style.display = "none";		
		document.getElementById("initials").style.display = "none";		
		document.getElementById("scoreList").style.display = "none";	
		document.getElementById("scores").style.display = "none";
		document.getElementById("questionArea").style.display = "none";
		document.getElementById("questions").style.display = "none";
				
		var oldItems = JSON.parse(localStorage.getItem('score')) || [];		
		
		var score = {};					
		
		if(isFromInitials){
		
			score.initials =  document.getElementById("initialsID").value;
			score.score =  correntAnswers;	

			oldItems.push(score);		
			
			localStorage.setItem("score", JSON.stringify(oldItems));
		}
		
		document.getElementById("initials").style.display = "none";
		document.getElementById("scoreList").style.display = "block";
		document.getElementById("scores").style.display = "block";
		
		var highScoreHtml = "";				
		
		var scores = JSON.parse(localStorage.getItem("score"));
		var i = scores.length;
		
		while(i--){
			score = scores[i];
			if(score != null){
				highScoreHtml += "<input class='sccore_label' type='label' value='" + (i + 1).toString() + ". " + score.initials + " - " + score.score  + "' > <br/>";
			}
		}		
		
		document.getElementById("scores").innerHTML = highScoreHtml;
		
	}
	
	function goBack_Click(){
		document.getElementById("header").style.display = "block";
		
		document.getElementById("scoreList").style.display = "none";		
		document.getElementById("initials").style.display = "none";
		document.getElementById("initialsID").value = "";
		document.getElementById("questionArea").style.display = "none";
		document.getElementById("scoreList").style.display = "none";
		document.getElementById("scores").style.display = "none";
		
	}
	
	function clearHighScore_Click(){
		localStorage.removeItem("score");
		localStorage.clear();
		
		document.getElementById("header").style.display = "block";
		
		document.getElementById("scoreList").style.display = "none";		
		document.getElementById("initials").style.display = "none";
		document.getElementById("initialsID").value = "";
		document.getElementById("questionArea").style.display = "none";
		document.getElementById("scoreList").style.display = "none";
		document.getElementById("scores").style.display = "none";
	}
	
	
