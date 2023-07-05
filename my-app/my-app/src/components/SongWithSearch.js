import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SongsWithSearch(props) {
  const [songs, setSongs] = useState([]);
  const { keyword } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/songs/search/${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      })
      .catch((err) => console.log(err));
  }, [keyword]);

  const handleView = (e) => {
    e.preventDefault();
    const formSearch = document.getElementById('formSearch');
    formSearch.setAttribute('action',`/songs/${e.target.dataset.id}`);
    formSearch.submit();
  };

  return (
    <div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ten Bai Hat</th>
              <th>Tac Gia</th>
              <th>Album</th>
              <th>Hinh Anh</th>
              <th>file</th>
              
            </tr>
          </thead>
  
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.id}</td>
                <td>{song.tenbaihat}</td>
                <td>{song.tacgia}</td>
                <td>{song.album}</td>
                <td>
                 {song.hinhanh}
                </td>
                <td>
                  {song.file}
                </td>
                <td>
                  <button data-id={song.id} onClick={handleView} className="btn btn-primary">View</button>
                </td>
                
              </tr>
              
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default SongsWithSearch;