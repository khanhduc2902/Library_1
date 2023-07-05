package com.jpa.bookjpa.book;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BookService {
	@Autowired
	private BookRepository repo;
	
	public List<Book> getAll() {
		return repo.findAll();
	}
	
	public Book  getOneBook(long id) {
		return repo.findById(id).get();
	}
	
	public void addOneBook(Book l) {
		repo.save(l);
	}
	
	public void saveOneBook(Book l) {
		repo.save(l);
	}
	
	public void removeBook(long id) {
		repo.deleteById(id);
	}
	
	public List<Book> findBook(String title, String author) {
		return repo.findBook(title, author);
	}
	
}