package com.bookmark.cloud.controller;

import com.bookmark.cloud.exception.ResourceNotFoundException;
import com.bookmark.cloud.model.User;
import com.bookmark.cloud.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import java.util.Properties;    
import javax.mail.*;    
import javax.mail.internet.*;   

/**
 * Created by IBA Group on 2018.
 */
@RestController
@RequestMapping("/api")
public class UserController {

	public static String fromEmail = "tibo2013w@gmail.com";  //change for your email
	public static String fromEmailPassword = "NKnnshfhr78";  //change for your password
	public static String toEmailSubject = "Bookmark Cloud";
	
    @Autowired
    UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody User user) {
    	String msg = 	"Hello! "
    					+ "\n\nYou have been successfully registered for Bookmark Cloud!  \n\nUsername: " + user.getUsername() + "\nPassword:  " + 
    					user.getPassword() + 
    					"\n\n With best wishes,\n Team Bookmark Cloud.";
    	sendEmail(fromEmail, fromEmailPassword, user.getEmail(), toEmailSubject, msg);  
        return userRepository.save(user);
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable(value = "id") Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
    
    @GetMapping("/users/select/{username}")
    public User getUserByUsername(@PathVariable(value = "username") String username) {
        return userRepository.findByUsername(username);
    }
    
    @GetMapping("/users/restore/{username}")
    public User getUserRestorePassword(@PathVariable(value = "username") String username) {
    	User user = userRepository.findByUsername(username);
    	String msg = 	"Hello! "
						+ "\n\nYour Username: " + user.getUsername() + "\nPassword:  " + 
						user.getPassword() + 
						"\n\n With best wishes,\n Team Bookmark Cloud.";
    	sendEmail(fromEmail, fromEmailPassword, user.getEmail(), toEmailSubject, msg);  
        return userRepository.findByUsername(username);
    }
    
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable(value = "id") Long userId,
                                           @Valid @RequestBody User userDetails) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());

        
        
        
        User updatedUser = userRepository.save(user);
        return updatedUser;
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        String msg = 	"Hello! "
				+ "\n\nYou have been successfully deleted from Bookmark Cloud!" + 
				"\n\n With best wishes,\n Team Bookmark Cloud.";
        sendEmail(fromEmail, fromEmailPassword, user.getEmail(), toEmailSubject, msg);  

        userRepository.delete(user);

        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/users/admin/{id}")
    public ResponseEntity<?> deleteUserByAdmin(@PathVariable(value = "id") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        String msg = 	"Hello! "
				+ "\n\nYou have been deleted from Bookmark Cloud due to violation of rules!" + 
				"\n\n With best wishes,\n Team Bookmark Cloud.";
        sendEmail(fromEmail, fromEmailPassword, user.getEmail(), toEmailSubject, msg);  

        userRepository.delete(user);
        
        return ResponseEntity.ok().build();
    }
    
    // method for sending email of successful registration
    public static void sendEmail(final String from,final String password,String to,String sub,String msg)	{  
        //Get properties object    
        Properties props = new Properties();    
        props.put("mail.smtp.host", "smtp.gmail.com");    
        props.put("mail.smtp.socketFactory.port", "465");    
        props.put("mail.smtp.socketFactory.class",    
                  "javax.net.ssl.SSLSocketFactory");    
        props.put("mail.smtp.auth", "true");    
        props.put("mail.smtp.port", "465");    
        //get Session   
        Session session = Session.getInstance(props,    
         new javax.mail.Authenticator() {    
	         protected PasswordAuthentication getPasswordAuthentication() {    
	         return new PasswordAuthentication(from,password);  
	         }    
        });    
        //compose message    
        try {    
	         MimeMessage message = new MimeMessage(session);    
	         message.addRecipient(Message.RecipientType.TO,new InternetAddress(to));    
	         message.setSubject(sub);    
	         message.setText(msg);    
	         //send message  
	         Transport.send(message);    
	         System.out.println("Message sent successfully for email " + to);    
        } catch (MessagingException e) {throw new RuntimeException(e);}    
           
  }  
}
