/**
    * Created by IBA Group on 2018.
    */ 

	// function for create new folder on the page
	function createFolder(){
		// select user from local storage
		var userId = localStorage.getItem(userId);
        //folder name from form
    	var name = document.getElementById('folderName').value;
    	// checking valid (function validateForm(name,url)) name and url. Name must not be empty
    	// and url must not be empty and have the form like google.com 
    	// or www.google.com
    	if(validateFormFolder(name)){
	    	//HTTP Request
	    	var xhr = new XMLHttpRequest();
	    	//POST method for http://localhost:8080/api/folders/create/whose
	    	xhr.open('POST', 'http://localhost:8080/api/folders/create/' + userId, true);
	    	//header
	    	xhr.setRequestHeader("Content-type", "application/json");
	    	//checking response status
	    	xhr.onreadystatechange = function () {
	    		//if OK
	    	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	        //var json = JSON.parse(xhr.responseText);
	    	    }
	    	}
	    	//prepare JSON to POST
	    	var data = JSON.stringify({ "name":name });
	    	//POST JSON
	    	xhr.send(data);
	    	//alert for OK
	    	alert("Folder " + name + " successfully added!");
    	}
    	//page reloading
    	window.location.reload();
	}
	
	
	// function for view folders for new bookmark
	function getFolders(){
		// get user ID
		 var userId = localStorage.getItem(userId);
	      //making AJAX request
	      var xhr = new XMLHttpRequest();
	      //GET method for http://localhost:8080/api/folders/select/whoes
	      xhr.open('GET', 'http://localhost:8080/api/folders/select/' + userId, true);
	      //function for checking status 
	      xhr.onload = function(){
	    	//checking status
	        if(this.status == 200){
	          //if OK here we parsing JSON
	          var folders = JSON.parse(this.responseText);
	          // prepare var for output
	          var output = '';
	          console.log(folders);
	          //output notes in a list
	          for(var i in folders){
	        	  //output note in a list. Here we generate HTML
	        	  output +=  
	        		  '<a class="dropdown-item" onclick="sendNote(' + folders[i].id + ')">' + folders[i].name + '</a>';
	          }
	          //output in index.html where div id=foldersMenu
	          document.getElementById('foldersMenu').innerHTML = output;
	        }
	      }
	      //GET JSON
	      xhr.send();
	}
	
	
	// function for load folders on the page
	function loadFolders(){
		// get user ID
		 var userId = localStorage.getItem(userId);
	      //making AJAX request
	      var xhr = new XMLHttpRequest();
	      //GET method for http://localhost:8080/api/folders/select/whoes
	      xhr.open('GET', 'http://localhost:8080/api/folders/select/' + userId, true);
	      //function for checking status 
	      xhr.onload = function(){
	    	//checking status
	        if(this.status == 200){
	          //if OK here we parsing JSON
	          var folders = JSON.parse(this.responseText);
	          // prepare var for output
	          var output = '';
	          //output notes in a list
	          for(var i in folders){
	        	  //output note in a list. Here we generate HTML
	        	  output += 
	        		  '<br>' +
	                  'Name <br> '+ '<h5>' + folders[i].name + '</h5>' +
	                  ' <a onclick="deleteFolder(\''+folders[i].id+'\')" class="btn btn-danger" href="#selectAllFolders">Delete</a> ' +
	                  ' ' + ' ' +
	                  ' <a onclick="visitFolder(\''+folders[i].id+'\')" class="btn btn-info" href="#selectAllFolders">Visit</a> ' +
	                  '<br>' + '<br>';
	          }
	          //output in index.html where div id=notes
	          document.getElementById('allFolders').innerHTML = output;
	        }
	      }
	      //GET JSON
	      xhr.send();
	}
	
	
	// function for view bookmarks in this folder
	function visitFolder(folderId){
		// new request
		 var xhr = new XMLHttpRequest();
	      //GET method for http://localhost:8080/api/folders/select/whoes
	      xhr.open('GET', 'http://localhost:8080/api/notes/folder/' + folderId, true);
	      //function for checking status 
	      xhr.onload = function(){
	    	//checking status
	        if(this.status == 200){
	          //if OK here we parsing JSON
	          var notes = JSON.parse(this.responseText);
	          // prepare var for output
	          var output = '';
	          //output notes in a list
	          for(var i in notes){
	        	  //output note in a list. Here we generate HTML
	        	  output += 
	        		  '-----------------------------------------------------------------------------------------------------------------------' +
	        		  '<br>' +
	                  'ID <br> '+ '<h3>' + notes[i].id + '</h3>' +
	            	  ' <div class="formOutput">' +
	            	  '<form id="myFormNote">' +
	            	  '<div class="form-group">' + 		
	            	  '<label>Site Name</label>' + 
	            	  '<input type="text" class="form-control" placeholder="' + notes[i].title + '">' +
	            	  '</div>' + 
	            	  '<div class="form-group">' + 
	            	  '<label>Site URL</label>' + 
	            	  '<input type="text" class="form-control" placeholder="' + notes[i].content + '">' +
	            	  '</div>' + 
	            	  '</form>' + 
	            	  '</div>' + 
	                  ' <a onclick="deleteNote(\''+notes[i].id+'\')" class="btn btn-danger" href="#selectAll">Delete</a> ' +
	                  ' ' + ' ' +
	                  ' <a onclick="visitNote(\''+notes[i].content+'\')" class="btn btn-info">Visit</a> ' +
	                  '<br>' + '<br>';
	          }
	          //output in index.html where div id=notes
	          document.getElementById('visitFolder').innerHTML = output;
	        }
	      }
	      //GET JSON
	      xhr.send();
	}
	
	
			
    // function for regestration note
    function sendNote(folderId){
    	// get user ID from local storage
    	var userId = localStorage.getItem(userId);
        //title from form
    	var title = document.getElementById('title').value;
    	//content from form
    	var content = document.getElementById('content').value;
    	// checking valid (function validateForm(name,url)) name and url. Name must not be empty
    	// and url must not be empty and have the form like google.com 
    	// or www.google.com
    	if(validateForm(title, content)){
    	//HTTP Request
    	var xhr = new XMLHttpRequest();
	    	//POST method for http://localhost:8080/api/notes/
	    	xhr.open('POST', 'http://localhost:8080/api/notes/create/' + userId, true);
	    	//header
	    	xhr.setRequestHeader("Content-type", "application/json");
	    	//checking response status
	    	xhr.onreadystatechange = function () {
	    		//if OK
	    	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	        //var json = JSON.parse(xhr.responseText);
	    	    }
	    	}
	    	//prepare JSON to POST
	    	var data = JSON.stringify({"title":title , "content":content , "folder":folderId});
	    	//POST JSON
	    	xhr.send(data);
	    	//alert for OK
	    	alert("Bookmark " + title + " successfully added!");
    	}
    	//page reloading
    	window.location.reload();
       }
    
    
    
    //function for loading all notes
    function loadNotes(){
      // get user ID from local storage
      var userId = localStorage.getItem(userId);
      //making AJAX request
      var xhr = new XMLHttpRequest();
      //GET method for http://localhost:8080/api/notes/
      xhr.open('GET', 'http://localhost:8080/api/notes/select/' + userId, true);
      //function for checking status 
      xhr.onload = function(){
    	//checking status
        if(this.status == 200){
          //if OK here we parsing JSON
          var notes = JSON.parse(this.responseText);
          // prepare var for output
          var output = '';
          //output notes in a list
          for(var i in notes){
        	  //output note in a list. Here we generate HTML
        	  output += 
        		  '------------------------------------------------' +
        		  '<br>' +
                  'ID <br> '+ '<h3>' + notes[i].id + '</h3>' +
            	  ' <div class="formOutput">' +
            	  '<form id="myFormNote">' +
            	  '<div class="form-group">' + 		
            	  '<label>Site Name</label>' + 
            	  '<input type="text" class="form-control" placeholder="' + notes[i].title + '">' +
            	  '</div>' + 
            	  '<div class="form-group">' + 
            	  '<label>Site URL</label>' + 
            	  '<input type="text" class="form-control" placeholder="' + notes[i].content + '">' +
            	  '</div>' + 
            	  '</form>' + 
            	  '</div>' + 
                  ' <a onclick="deleteNote(\''+notes[i].id+'\')" class="btn btn-danger" href="#selectAll">Delete</a> ' +
                  ' ' + ' ' +
                  ' <a onclick="visitNote(\''+notes[i].content+'\')" class="btn btn-info">Visit</a> ' +
                  '<br>' + '<br>';
          }
          //output in index.html where div id=notes
          document.getElementById('notes').innerHTML = output;
        }
      }
      //GET JSON
      xhr.send();
    }
    
    
    
  //function for loading note by id
    function loadNote(){
      //id from form  
      var noteId =document.getElementById('noteIdSelect').value;
      //checking valid id (function validateId(id)). ID must not be empty
      if(validateId(noteId)){
      //HTTP Request
      var xhr = new XMLHttpRequest();
      //GET method for http://localhost:8080/api/notes/id
      xhr.open('GET', 'http://localhost:8080/api/notes/' + noteId, true);
      //function for checking status 
      xhr.onload = function(){
    	//checking status
        if(this.status == 200){
          //if OK here we parsing JSON
          var note = JSON.parse(this.responseText);
          // prepare var for output
          var output = '';
          //output note in a list. Here we generate HTML
        	  output += 
	        	  'ID <br> '+ '<h3>' + note.id + '</h3>' +
	        	  ' <div class="formOutput">' +
	        	  '<form id="myFormNote">' +
	        	  '<div class="form-group">' + 		
	        	  '<label>Site Name</label>' + 
	        	  '<input type="text" class="form-control" id="titleUpdate" placeholder="' + note.title + '">' +
	        	  '</div>' + 
	        	  '<div class="form-group">' + 
	        	  '<label>Site URL</label>' + 
	        	  '<input type="text" class="form-control" id="contentUpdate" placeholder="' + note.content + '">' +
	        	  '</div>' +
	        	  '</form>' + 
	        	  '</div>' + 
	              ' <a onclick="deleteNote(\''+noteId+'\')" class="btn btn-danger" href="#selectById">Delete</a> ' +
	              ' ' + ' ' +
	              ' <a onclick="updateNote(\''+noteId+'\')" class="btn btn-secondary" href="#selectById">Edit</a> ' +
	              ' ' + ' ' +
	              ' <a onclick="visitBookmark(\''+note.content+'\')" class="btn btn-info" href="#">Visit</a> ';
        //output in index.html where <div id=note></div>
          document.getElementById('note').innerHTML = output;
        } 
        //if bookmark does not exist return Error
        else alert("Bookmark with ID " + noteId + " does not exist!");
      }
      //GET JSON
      xhr.send();
     }
    }
    

    
    // function for deleting note by Id
    function deleteNote(noteId){
    	//HTTP Request
    	var xhr = new XMLHttpRequest();
    	//DELETE method
    	xhr.open('DELETE', 'http://localhost:8080/api/notes/' + noteId, true);
    	//DELETE
    	xhr.send();
    	//alert for OK
    	alert("Your bookmark with was successfully deleted!");
    	//page reloading
    	//page reloading
    	window.location.reload();
     }
    

    // fubction for updating notes
    function updateNote(id){
		//title from form
    	var title =document.getElementById('titleUpdate').value;
    	//content from form
    	var	content =document.getElementById('contentUpdate').value;
    	// checking valid (function validateForm(name,url)) name and url. Name must not be empty
    	// and url must not be empty and have the form like google.com 
    	// or www.google.com
    	if(validateForm(title, content)){
	    	//HTTP Request
	    	var xhr = new XMLHttpRequest();
	    	//PUT method
	    	xhr.open('PUT', 'http://localhost:8080/api/notes/' + id, true);
	    	//header
	    	xhr.setRequestHeader("Content-type", "application/json");
	    	//checking response status
	    	xhr.onreadystatechange = function () { 
	    		// if OK
	    	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	        //var json = JSON.parse(xhr.responseText);
	    	    }
	    	}
		    //prepare JSON to PUT`
		    var data = JSON.stringify({"title":title , "content":content});
	    	//PUT JSON
	    	xhr.send(data);
	    	//alert for OK
	    	alert("Your bookmark with ID" + note.id + " was successfully updated!");
	    	//page reloading
	    	window.location.reload();
    	}
    }
    
    
    
    //function for visiting note
    function visitNote(url){
    	// checking for not empty URL
    	 if( url != "" )
    		//replace for site URL. Here we make an http:// prefix for bookmarks with url like google.com
    		window.location = "http://" + url;
    }

    
    
    //function for loading all users
    function loadUsers(){
      //making AJAX request
      var xhr = new XMLHttpRequest();
      //GET method for http://localhost:8080/api/notes/
      xhr.open('GET', 'http://localhost:8080/api/users/', true);
      //function for checking status 
      xhr.onload = function(){
    	//checking status
        if(this.status == 200){
          //if OK here we parsing JSON
          var users = JSON.parse(this.responseText);
          // prepare var for output
          var output = '';
          //output notes in a list
          for(var i in users){
        	  //output note in a list. Here we generate HTML
        	  output += 
        		  '------------------------------------------------' +
        		  '<br>' +
                  'ID <br> '+ '<h3>' + users[i].id + '</h3>' +
            	  '<div class="formOutput">' +
            	  '<form id="myFormNote">' +
            	  '<div class="form-group">' + 		
            	  '<label>Username</label>' + 
            	  '<input type="text" class="form-control" placeholder="' + users[i].username + '">' +
            	  '</div>' + 
            	  '<div class="form-group">' + 
            	  '<label>Password</label>' + 
            	  '<input type="text" class="form-control" placeholder="' + users[i].password + '">' +
            	  '</div>' + 
            	  '<div class="form-group">' + 
            	  '<label>Email</label>' + 
            	  '<input type="text" class="form-control" placeholder="' + users[i].email + '">' +
            	  '</div>' + 
            	  '</form>' + 
            	  '</div>' + 
                  ' <a onclick="deleteUser(\''+users[i].id+'\')" class="btn btn-danger" href="#selectAllUsers">Delete</a> ' +
                  '<br>' + '<br>';
          }
          //output in index.html where div id=notes
          document.getElementById('users').innerHTML = output;
        }
      }
      //GET JSON
      xhr.send();
    }

    
    
    // function for deleting user by Id (only Admin can do this)
    function deleteUser(userId){
    	//HTTP Request
    	var xhr = new XMLHttpRequest();
    	//DELETE method (only for admin)
    	xhr.open('DELETE', 'http://localhost:8080/api/users/admin/' + userId, true);
    	//DELETE
    	xhr.send();
    	//alert for OK
    	alert("User was successfully deleted!");
    	//page reloading
    	window.location.reload();
    	
    	
     }
    
    
    
 	//function for Log In
    function logIn(){
	      //username from form  
    	  var username = document.getElementById('username').value;
	      //password from form  
	      var password = document.getElementById('password').value;
	      // checking valid (function validateFormLogIn(username , password)) username and password. Username and password must not be empty
	      if(validateFormLogIn(username , password)) {
		      //HTTP Request
		      var xhr = new XMLHttpRequest();
		      //GET method for http://localhost:8080/api/users/select/username
		      xhr.open('GET', 'http://localhost:8080/api/users/select/' + username, true);
		      //function for checking status 
		      xhr.onload = function(){
		    	//checking status
		        if(this.status == 200){
		          //if OK here we parsing JSON
		          var user = JSON.parse(this.responseText);
		          // set user ID in local storage
		          localStorage.setItem(userId, user.id);
		          // get user ID from local storage
		          var userId = localStorage.getItem(userId);
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
		          //checking password
		          if(password == user.password){
			          	// switch case
			          	switch(user.role){
			          	// if role == 0 means this is user. Open home.html
			          	// https://stackoverflow.com/questions/8454510/open-url-in-same-window-and-in-same-tab
			          	case 0 : window.open("home.html","_self");
			          		//break
			          		break;
			          	// if role == 1 means this is admin. Open console.html
				        // https://stackoverflow.com/questions/8454510/open-url-in-same-window-and-in-same-tab	
			          	case 1: window.open("console.html","_self");
			          		//break
			          		break;
			          	}
			          } else alert("Sorry! Your password was incorrect!");
		          		// alert for incorrect password 			
		        }   console.log("Username = " + username);
	      }
	      //GET JSON
	      xhr.send();
	 }
    }
    
    
    
    // function for regestration new user
    function signUp(){
        //username from form
    	var username = document.getElementById('username').value;
    	//password from form
    	var password = document.getElementById('password').value;
    	//email from form
    	var email = document.getElementById('email').value;
    	// checking valid (function validateFormSignUp(username , password , email)) username, password and email. Username, password must not be empty
    	// and email too and also be like example@example.com
    	if(validateFormSignUp(username , password , email)){
	    	//HTTP Request
	    	var xhr = new XMLHttpRequest();
	    	//POST method for http://localhost:8080/api/users/
	    	xhr.open('POST', 'http://localhost:8080/api/users/', true);
	    	//header
	    	xhr.setRequestHeader("Content-type", "application/json");
	    	//checking response status
	    	xhr.onreadystatechange = function () {
	    		//if OK
	    	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	        //var json = JSON.parse(xhr.responseText);
	    	    }
	    	}
	    	//prepare JSON to POST
	    	var data = JSON.stringify({"username":username , "password":password , "email":email});
	    	//POST JSON
	    	xhr.send(data);
	    	//alert for OK
	    	alert("User " + username + " successfully added!");
	    	//page reloading
	    	// https://stackoverflow.com/questions/8454510/open-url-in-same-window-and-in-same-tab
	    	window.open("logIn.html","_self");
       }
    }
    
    
    
    // function restore password
    function forgottenPassword(){
	    //username from form  
		var username = document.getElementById('username').value;
	    // checking valid (function validateFormLogIn(username , password)) username and password. Username and password must not be empty
	    if(validateFormForgot(username)) {
	    //HTTP Request
	    var xhr = new XMLHttpRequest();
	    //GET method for http://localhost:8080/api/users/select/username
	    xhr.open('GET', 'http://localhost:8080/api/users/restore/' + username, true);
	    //function for checking status 
	    xhr.onload = function(){
	  	//checking status
	      if(this.status == 200){
	        //if OK here we parsing JSON
	        var user = JSON.parse(this.responseText);
	        	alert(user.username + ", your password was successfully sent to your email!")
	      }  else alert("Sorry! Username does not exist!");
	    }
	    //GET JSON
	    xhr.send();
	    	}
    }
    
    
    
    // Validate Form
    function validateForm(name , url){
	      // cheking name and url for not empty
	      if(!name || !url){
		    	//alert error  
		        alert('Please fill in the form');
		        //if error, return false
		        return false;
		      }
		      //https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
		      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		      //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
		      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		      //making regular expression for URL
		      var regex = new RegExp(expression);
		      //checking url and email
		      if(!url.match(regex)){
		    	//alert error
		        alert('Please use a valid URL like example.com');
		        //if error, return false
		        return false;
		      }
	      //if OK, return true
	      return true;
    }   
    
    
    
    // Validate Form for Sign Up
    function validateFormSignUp(username , password , email){
	      // cheking name and password for not empty
	      if(!username || !password){
		    	//alert error  
		        alert('Please fill in the form');
		        //if error, return false
		        return false;
		      }
		      //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
		      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		      //making regular expression for email
		      var regexEmail = new RegExp(re);
		      //checking url and email
		      if(!email.match(regexEmail)){
		    	//alert error
		        alert('Please use a valid email address');
		        //if error, return false
		        return false;
		      }
	      //if OK, return true
	      return true;
    } 
    
    
    
    // Validate Form for Log In
    function validateFormLogIn(username , password){
	      // cheking name and password for not empty
	      if(!username || !password){
		    	//alert error  
		        alert('Please fill in the form');
		        //if error, return false
		        return false;
	      	}
	      //if OK, return true
	      return true;
    }   
    
    
    
    // Validate Form for New Folder
    function validateFormFolder(name){
    	 // cheking name for not empty
	      if(!name){
		    	//alert error  
		        alert('Please fill in the form');
		        //if error, return false
		        return false;
	      	}
	      //if OK, return true
	      return true;
    }  
    
    
    // Validate Form for Forgoten Password
    function validateFormForgot(username) {
    	 // cheking name for not empty
	      if(!username){
		    	//alert error  
		        alert('Please fill in the form');
		        //if error, return false
		        return false;
	      	}
	      //if OK, return true
	      return true;
    }
    
    
    
    // Validate ID. Checking  ID form for not empty ID
    function validateId(id){
    	// cheking ID for not empty
    	if(!id){
	    		//alert error
	            alert('Please fill ID in the form');
	            //if error, return false
	            return false;
          	}
    	 //if OK, return true
    	 return true;
    }
