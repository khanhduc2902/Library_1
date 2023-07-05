package com.jpa.bookjpa.song;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="song")
public class Song {
	@Id
	private int id;
	private String tenbaihat;
	private String tacgia;
	private String album;
	private String hinhanh;
	private String file;
	
	public Song() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenbaihat() {
		return tenbaihat;
	}

	public void setTenbaihat(String tenbaihat) {
		this.tenbaihat = tenbaihat;
	}

	public String getTacgia() {
		return tacgia;
	}

	public void setTacgia(String tacgia) {
		this.tacgia = tacgia;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public String getHinhanh() {
		return hinhanh;
	}

	public void setHinhanh(String hinhanh) {
		this.hinhanh = hinhanh;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Song(int id, String tenbaihat, String tacgia, String album, String hinhanh, String file) {
		super();
		this.id = id;
		this.tenbaihat = tenbaihat;
		this.tacgia = tacgia;
		this.album = album;
		this.hinhanh = hinhanh;
		this.file = file;
	}
	
	
}
