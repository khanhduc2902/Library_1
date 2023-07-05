package com.jpa.bookjpa.song;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;





@Service
public class SongService {
	@Autowired
	private SongRepository repo;
	
	public List<Song> getSongs() {
		return repo.findAll();
	}
	public Song getSongById(int id) {
		return repo.findById(id).get();
	}
	
	public List<Song> getSongsByKey(String keyword) {
		return repo.getSongsByKey(keyword) ;
	}
	
//	public void addSong(String tenbaihat, String tacgia, String album, String hinhanh,String file ) {
//		
//		
//		Song e = new Song(0, tenbaihat,tacgia, album, hinhanh , file );
//		repo.save(e);
//	}
	
//	public void addSongWC(Song e) {
//		repo.save(e);
//	}
}