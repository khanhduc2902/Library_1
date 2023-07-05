package com.jpa.bookjpa.book;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="book")
public class Book {
	
	@Id
	private int id;
	private String title;
	private String author;
	private String genre;
	private Date date;
	private int page;
	private int sold;
	private String anh;
	private String mota;
	private String danhgia;
	private String nhanxet;
	
	public Book() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSold() {
		return sold;
	}

	public void setSold(int sold) {
		this.sold = sold;
	}

	public String getAnh() {
		return anh;
	}

	public void setAnh(String anh) {
		this.anh = anh;
	}

	public String getMota() {
		return mota;
	}

	public void setMota(String mota) {
		this.mota = mota;
	}

	public String getDanhgia() {
		return danhgia;
	}

	public void setDanhgia(String danhgia) {
		this.danhgia = danhgia;
	}

	public String getNhanxet() {
		return nhanxet;
	}

	public void setNhanxet(String nhanxet) {
		this.nhanxet = nhanxet;
	}

	public Book(int id, String title, String author, String genre, Date date, int page, int sold, String anh,
			String mota, String danhgia, String nhanxet) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.date = date;
		this.page = page;
		this.sold = sold;
		this.anh = anh;
		this.mota = mota;
		this.danhgia = danhgia;
		this.nhanxet = nhanxet;
	}
	
	
	
	
	
	
	
	
	
	
}
