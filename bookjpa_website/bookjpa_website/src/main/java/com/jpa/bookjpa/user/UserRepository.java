package com.jpa.bookjpa.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.jpa.bookjpa.book.Book;



@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	@Query("select l From User l Where l.email = ?1 and l.matkhau = ?2")
	public User findUser(String email, String matkhau);
	
	@Query("select u from User u where u.email = ?1")
	public List<User> findUsersByEmail(String email);
	
	@Query("select u from User u where u.email = ?1 and u.matkhau = ?2")
	public User findByEmailAndMatkhau(String email, String matkhau);
}
