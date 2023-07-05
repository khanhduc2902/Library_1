package com.jpa.bookjpa.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jpa.bookjpa.book.Book;





@Service
public class UserService {
	
	@Autowired
	private UserRepository repo; 
	

	 
//	public List<User> getUsers() {
//		return repo.findAll();
//		
//	}
//	
//	public User getOneUser(int id) {
//		return repo.findById(id).get();
//	}
//	
//	public User getUser(int id) {
//		return repo.findById(id).get();
//	}
////	public User getUserWithTKAndMK(String email, String matkhau) {
////		return repo.getOneUser(email, matkhau);
////	}
//	
//	public void addOneUser(User l) {
//		repo.save(l);
//	}
//	public List<User> findUser(String email, String matkhau) {
//		return repo.findUser(email, matkhau);
//	}
//	public void removeUser(int id) {
//		repo.deleteById(id);
//	}
	
	public List<User> getAll() {
		return repo.findAll();
	}
	
	public User getOneUser(int id) {
		return repo.findById(id).get();
	}
	
	public void addOneUser(User l) {
		repo.save(l);
	}
	
	public void saveOneUser(User l) {
		repo.save(l);
	}
	
	public void removeUser(int id) {
		repo.deleteById(id);
	}
	
	public User findOneUser(String email, String matkhau) {
		return repo.findUser(email, matkhau);
	}
	
	public User findWithUserAndPass(String email, String matkhau) {
	    	return repo.findByEmailAndMatkhau(email, matkhau);
	}
	    
	   
	    
	public List<User> findUsersWithUsername(String username) {
	    	return repo.findUsersByEmail(username);
	}
	
	
	
//	public List<User> findUser(String email, String matkhau) {
//		return repo.findUser(email, matkhau);
//	}
	
}