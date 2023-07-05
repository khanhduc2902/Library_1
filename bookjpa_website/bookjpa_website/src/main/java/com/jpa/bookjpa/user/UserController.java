package com.jpa.bookjpa.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jpa.bookjpa.book.Book;

@CrossOrigin
@Controller
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserService service;
	@ResponseBody
	@GetMapping("/users")
	public List<User> getUSersList() {
		return service.getAll();
	}
	
	@ResponseBody
	@GetMapping("/user/{id}")
	public User getOneUser(@PathVariable int id) {
		return service.getOneUser(id);
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, path = "/users/add")
	public String addOneUser(@RequestBody User l) {
		User exitL = service.findOneUser(l.getEmail(), l.getMatkhau());
		if (exitL!=null) {
			return "User " + l.getEmail() + " va Matkhau " + l.getMatkhau() + " da ton tai! Vui long nhap lai";
		} else {
			service.addOneUser(l);
			return "Ban da add thanh cong User: " + l.getName();
		}
	}
	
	@ResponseBody
	@PutMapping("/user/{id}") 
	public String saveOneUser(@PathVariable int id, @RequestBody User l) {
		User exitL = service.findOneUser(l.getEmail(), l.getMatkhau());
		if (exitL!=null && l.getId() != exitL.getId()) {
			return "User " + l.getEmail() + " va Matkhau " + l.getMatkhau() + " da ton tai! Vui long nhap lai";
		} else {
			User oL = service.getOneUser(id);
			oL.setEmail(l.getEmail());
			oL.setMatkhau(l.getMatkhau());
			oL.setName(l.getName());
			oL.setDoituong(l.getDoituong());
			
			service.saveOneUser(oL);
			return "Ban da update thanh cong User: " + l.getName();
		}
	}
	
	@ResponseBody
	@DeleteMapping("/users/delete/{id}")
	public String removeUser(@PathVariable int id) {
		try {
			service.removeUser(id);
			return "Ban da xoa thanh cong User " + String.valueOf(id);
		} catch (Exception e) {
			return "Co loi da xay ra !!!";
		}
	}
	
	@PostMapping("/dangnhap")
	public ResponseEntity<?> dangnhap(@RequestBody User u) {
		User exitL = service.findOneUser(u.getEmail(), u.getMatkhau());
		if(exitL==null) {
			return ResponseEntity.status(400).body("Thong tin tai khoan mat khau sai");
		}else {
			
			
			return ResponseEntity.ok(exitL); 
		}
		
	}
	
	@PutMapping("/save/cart")
	public ResponseEntity<?> updateCart(@RequestBody User u) {
		List<User> lU = service.findUsersWithUsername(u.getEmail());
		if (lU.size() == 1) {
			lU.get(0).setGiohang(u.getGiohang());
			service.saveOneUser(lU.get(0));
			return ResponseEntity.ok("Đã cập nhật thành công Giỏ hàng của User " + u.getEmail());
		}
		return ResponseEntity.status(400).body("Cập nhật giỏ hàng thất bại!");
		
	}
	
	@PutMapping("/pay/cart")
	public ResponseEntity<?> payCart(@RequestBody User u) {
		List<User> lU = service.findUsersWithUsername(u.getEmail());
		if (lU.size() == 1) {
			lU.get(0).setGiohang("[]");
			service.saveOneUser(lU.get(0));
			return ResponseEntity.ok("Bạn đã thanh toán thành công!");
		}
		return ResponseEntity.status(400).body("Thanh toán thất bại!");	
	}
	
}
