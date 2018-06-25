package com.example.easynotes.repository;

import com.example.easynotes.model.Note;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by IBA Group on 2018.
 */

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
		// https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/
		// https://github.com/pkainulainen/spring-data-jpa-examples/tree/master/query-methods
		// https://stackoverflow.com/questions/44647630/validation-failed-for-query-for-method-jpql
		// https://lishman.io/spring-data-jpa-repository-queries
		// https://stackoverflow.com/questions/34989759/issue-with-java-8-collectors-type-mismatch-cannot-convert-from-listobject-to
		 @Query(value = "SELECT * FROM notes n WHERE n.whose = :whoseId" , nativeQuery = true)
		    public List<Note> findByWhose(@Param("whoseId") Long whose);
		 @Query(value = "SELECT * FROM notes n WHERE n.folder = :folderId" , nativeQuery = true)
		    public List<Note> findByFolder(@Param("folderId") Long folder);
}
