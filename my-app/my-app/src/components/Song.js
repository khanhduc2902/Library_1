import React, { useEffect, useState } from "react";

function Songs(props) {
  const [songs, setSongs] = useState([]);
  const [songsOnFilter, setSongsOnFilter] = useState([]);

  const handleChange = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setSongsOnFilter(
        songs.filter((song) => song.tacgia.includes(e.target.value) )
      );
    } else {
      setSongsOnFilter(songs);
    }
  };

  const handleSubmit = () => {
    const formSearch = document.getElementById('formSearch');
    const inputSearch = document.getElementById('inputSearch');
    formSearch.setAttribute('action', `/songs/search/${inputSearch.value}`);
    formSearch.onsubmit();
  };

  const handleView = (e) => {
    e.preventDefault();
    const formSearch = document.getElementById('formSearch');
    formSearch.setAttribute('action',`/song/${e.target.dataset.id}`);
    formSearch.submit();
  };

  useEffect(() => {
    fetch("http://localhost:8080/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setSongsOnFilter(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Search filter */}
      <div>
        <form id="formSearch" className="d-flex" role="search" action="" method="GET">
          <input
            id="inputSearch"
            onChange={handleChange}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
         
        </form>
      </div>
      {/* laptops List filtered */}
      <div>
        <h2 className="text-center">Song List</h2>
        <div className="row">
          <button className="btn btn-primary">Add Student</button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ten Bai Hat</th>
                <th>Tac Gia</th>
                <th>Album</th>
                <th>Hinh Anh</th>
                <th>File</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {songsOnFilter.map((song) => (
                <tr key={song.id}>
                  <td>{song.id}</td>
                  <td>{song.tenbaihat}</td>
                  <td>{song.tacgia}</td>
                  <td>{song.album}</td>
                  <td>
                   {song.hinhanh}
                  </td>
                  <td>{song.file}</td>
                  <td>
                    <button data-id={song.id} onClick={handleView} className="btn btn-primary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form action */}
      <form id="formAction" method="GET" action=""></form>
    </div>
  );
}

export default Songs;
