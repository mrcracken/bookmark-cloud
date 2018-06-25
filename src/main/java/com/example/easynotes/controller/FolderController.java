package com.example.easynotes.controller;

import com.example.easynotes.exception.ResourceNotFoundException;
import com.example.easynotes.model.Folder;
import com.example.easynotes.model.User;
import com.example.easynotes.repository.FolderRepository;
import com.example.easynotes.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
   

/**
 * Created by IBA Group on 2018.
 */
@RestController
@RequestMapping("/api")
public class FolderController {
	
    @Autowired
    FolderRepository folderRepository;
    
    @Autowired
    UserRepository userRepository;

    @GetMapping("/folders")
    public List<Folder> getAllFolders() {
        return folderRepository.findAll();
    }

    @PostMapping("/folders")
    public Folder createFolder(@Valid @RequestBody Folder folder) {
        return folderRepository.save(folder);
    }

    @GetMapping("/folders/{id}")
    public Folder getFolderById(@PathVariable(value = "id") Long folderId) {
        return folderRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "id", folderId));
    }
    
    @GetMapping("/folders/select/{whose}")
    public List<Folder> getFolderByUsername(@PathVariable(value = "whose") Long whose) {
        return folderRepository.findFolderByUserId(whose);
    }
    
    @PutMapping("/folders/{id}")
    public Folder updateFolder(@PathVariable(value = "id") Long folderId,
                                           @Valid @RequestBody Folder folderDetails) {

        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "id", folderId));

        folder.setName(folderDetails.getName());

        Folder updatedFolder = folderRepository.save(folder);
        return updatedFolder;
    }

    @DeleteMapping("/folders/{id}")
    public ResponseEntity<?> deleteFolder(@PathVariable(value = "id") Long folderId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "id", folderId));
        
        folderRepository.delete(folder);

        return ResponseEntity.ok().build();
    }
    
    // method for create note with whose = user.id
    @PostMapping("/folders/create/{whose}")
    public Folder createFolderWithWhose(@PathVariable(value = "whose") Long whose,
    	            @Valid @RequestBody Folder folder) {
    	    	
    	User user = userRepository.findUserById(whose);
    	folder.setWhose(user.getId());    	
    	return folderRepository.save(folder);
    }
           
  }  
