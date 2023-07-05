package com.jpa.bookjpa.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String email;
	private String matkhau;
	private String doituong;
	private String giohang;
	
	public User() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMatkhau() {
		return matkhau;
	}

	public void setMatkhau(String matkhau) {
		this.matkhau = matkhau;
	}

	public String getDoituong() {
		return doituong;
	}

	public void setDoituong(String doituong) {
		this.doituong = doituong;
	}

	public String getGiohang() {
		return giohang;
	}

	public void setGiohang(String giohang) {
		this.giohang = giohang;
	}

	public User(int id, String name, String email, String matkhau, String doituong, String giohang) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.matkhau = matkhau;
		this.doituong = doituong;
		this.giohang = giohang;
	}
	
	
	
	
	
}
