package com.example.easynotes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.easynotes.model.Folder;

public interface FolderRepository extends JpaRepository<Folder, Long> {
	// https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/
	// https://github.com/pkainulainen/spring-data-jpa-examples/tree/master/query-methods
	// https://stackoverflow.com/questions/44647630/validation-failed-for-query-for-method-jpql
	// https://lishman.io/spring-data-jpa-repository-queries
		 @Query(value = "SELECT * FROM folders f WHERE f.whose = :usernameId" , nativeQuery = true)
	    	public List<Folder> findFolderByUserId(@Param("usernameId") Long whose);
	
}
