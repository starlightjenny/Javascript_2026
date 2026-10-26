
   // ---------- Date ----------

   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   var months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

   // Returns the current date and time as a Date object
   function getCurrentDate() {
      return new Date();
   }

   // Formats a date like "Monday, October 26, 2026 at 3:05 PM"
   function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      if (hours === 0) {
         hours = 12;
      }
      if (minutes < 10) {
         minutes = '0' + minutes;
      }

      return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() +
         ', ' + date.getFullYear() + ' at ' + hours + ':' + minutes + ' ' + ampm;
   }


   // ---------- Greeting ----------

   // Converts the first letter of a name to uppercase
   function capitalizeName(name) {
      name = name.trim();
      return name.charAt(0).toUpperCase() + name.slice(1);
   }

   // Builds a greeting based on the time of day, e.g. "Good Morning Professor!"
   function getGreeting(date) {
      var hour = date.getHours();
      var greeting;

      switch (true) {
         case (hour < 12):
            greeting = 'Good Morning';
            break;
         case (hour < 17):
            greeting = 'Good Afternoon';
            break;
         default:
            greeting = 'Good Evening';
      }

      var name = prompt('Please enter your name:');
      if (name === null || name.trim() === '') {
         name = 'friend';
      }

      return greeting + ' ' + capitalizeName(name) + '!';
   }


   // ---------- User Information ----------

   // Uses a regular expression to check for a valid email address
   function isValidEmail(email) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
   }

   // Prompts for an email until it is valid, then splits it into username and domain
   function getUserInfo() {
      var email = prompt('Please enter your email address:');

      while (email === null || !isValidEmail(email.trim())) {
         alert('Error: That is not a valid email address. Please try again.');
         email = prompt('Please enter your email address:');
      }

      var parts = email.trim().split('@');

      return {
         username: parts[0].toUpperCase(),
         domain: parts[1]
      };
   }


   // ---------- Quote of the Day ----------

   var quotesoftheday = [
      '"The only way to do great work is to love what you do." - Steve Jobs',
      '"The only thing we have to fear is fear itself." - Franklin D. Roosevelt',
      '"Not all those who wander are lost." - J.R.R. Tolkien',
      '"Imagination is more important than knowledge." - Albert Einstein',
      '"A journey of a thousand miles begins with a single step." - Lao Tzu'
   ];

   // Picks a random quote using a number between 0 and 4
   function getQuoteOfTheDay() {
      var randomNumber = Math.floor(Math.random() * 5);
      return quotesoftheday[randomNumber];
   }


   // ---------- Trivia Quiz ----------

   var trivia_questions = [
    'What is the capital city of France?',
    'Which planet is known as the Red Planet?',
    'What is the largest ocean on Earth? (One word)'
   ];

   // All answers are stored as lowercase strings
   var trivia_answers = [
    'paris',
    'mars',
    'pacific'
   ];

   var total_points = 9;

   // Points earned on each question, used to fill in the results table
   var question_points = [];


   function quiz() {
      var points = 0;


      for (var i = 0; i<trivia_questions.length; i++) {
         var guesses = 3;
         question_points[i] = 0;

         while (guesses > 0) {
            var user_answer = prompt(trivia_questions[i]);

            // Treat Cancel as an empty answer so toLowerCase() doesn't fail on null
            if (user_answer === null) {
               user_answer = '';
            }

            if (user_answer.trim().toLowerCase() === trivia_answers[i]) {
               points += guesses;
               question_points[i] = guesses;
               alert('Correct! You earned ' + guesses + ' points.');
               break; // Exit the loop
            }

            alert('Incorrect.');
            guesses -= 1;

            if (guesses > 0) {
               alert('Try again. You have ' + guesses + ' guesses left.');
            } else {
               alert('The correct answer was: ' + trivia_answers[i]);
            }

         }

      }
      return points;
   }

   // Calculates the score as a percentage rounded to 2 decimal places
   function getPercentage(score) {
      return (score / total_points * 100).toFixed(2);
   }


   // Adds one row to the results table for each question
   function showResultsTable() {
      var tableBody = document.getElementById('results-body');

      for (var i = 0; i < trivia_questions.length; i++) {
         var row = document.createElement('tr');

         var questionCell = document.createElement('td');
         questionCell.textContent = (i + 1);

         var pointsCell = document.createElement('td');
         pointsCell.textContent = question_points[i] + ' / 3';

         row.appendChild(questionCell);
         row.appendChild(pointsCell);
         tableBody.appendChild(row);
      }
   }


   // ---------- Main Script ----------

   var today = getCurrentDate();
   document.getElementById('date').textContent = 'Today is ' + formatDate(today);

   // Greeting and user information come before the trivia quiz
   document.getElementById('greeting').textContent = getGreeting(today);

   var userInfo = getUserInfo();
   document.getElementById('username').textContent = 'Username: ' + userInfo.username;
   document.getElementById('domain').textContent = 'Domain: ' + userInfo.domain;

   document.getElementById('quote').textContent = getQuoteOfTheDay();

   var finalScore = quiz();
   showResultsTable();
   document.getElementById('result').textContent = finalScore + ' / ' + total_points;
   document.getElementById('percentage').textContent = getPercentage(finalScore) + '%';
