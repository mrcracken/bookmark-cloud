package com.bookmark.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Created by IBA Group on 2018.
 */
@SpringBootApplication
@EnableJpaAuditing
public class BookmarkCloudApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookmarkCloudApplication.class, args);
	}
}
