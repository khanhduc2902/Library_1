package com.jpa.bookjpa.book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	@Query("select l From Book l Where l.title = ?1 and l.author = ?2")
	public List<Book> findBook(String title, String author);
}
