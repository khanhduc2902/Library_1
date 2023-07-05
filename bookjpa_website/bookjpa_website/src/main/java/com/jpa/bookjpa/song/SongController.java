package com.jpa.bookjpa.song;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;



@CrossOrigin
@Controller
public class SongController {
	@Autowired
	private SongService service;
	
	@ResponseBody
	@GetMapping("/songs")
	public List<Song> getAllSongs(Model model){
		return service.getSongs();
	}
	@ResponseBody
	@GetMapping("/song/{id}")
	public Song getSongById(@PathVariable int id) {
		return service.getSongById(id);
	}
	
	@ResponseBody
	@GetMapping("/songs/search/{keyword}")
	public List<Song> getSongsByKey(@PathVariable String keyword) {
		return service.getSongsByKey(keyword) ;
	}
	
//	@ResponseBody
//	@GetMapping("/song/save")
//	public String addSong(@RequestBody Song e1) {
//		service.addSongWC(e1);
//		return "ok!";
//	}
		
	
}
