package com.jpa.bookjpa.song;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface SongRepository extends JpaRepository<Song, Integer> {
	@Query("Select e From Song e Where e.tacgia LIKE %?1% ")
	public List<Song> getSongsByKey(String keyword);
//	
//	public List<Song> findAllByName(String key);	
}
