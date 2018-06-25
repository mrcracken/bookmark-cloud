package com.example.easynotes.repository;

import com.example.easynotes.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by IBA Group on 2018.
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	// https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/
	// https://github.com/pkainulainen/spring-data-jpa-examples/tree/master/query-methods
	// https://stackoverflow.com/questions/44647630/validation-failed-for-query-for-method-jpql
	// https://lishman.io/spring-data-jpa-repository-queries
	 @Query(value = "SELECT * FROM users u WHERE LOWER(u.username) = LOWER(:usernameId)" , nativeQuery = true)
	    public User findByUsername(@Param("usernameId") String usernameId);
	 @Query(value = "SELECT * FROM users u WHERE u.id = :usernameId" , nativeQuery = true)
	    public User findUserById(@Param("usernameId") Long whose);
	
}
