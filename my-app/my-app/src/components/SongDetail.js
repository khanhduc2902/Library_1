import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SongDetail() {
  const [song, setSong] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/song/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSong(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <h1>Song Details</h1>
      <form id="formUpdate" action="" method="PUT">
        <div className="mb-3 row">
          <label for="id" className="col-sm-2 col-form-label">
            ID
          </label>
          <div className="col-sm-10">
            <input
              type="int"
              readOnly
              className="form-control-plaintext"
              id="id"
              value={song.id}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="tenbaihat" className="col-sm-2 col-form-label">
          Ten Bai Hat
          </label>
          <div className="col-sm-10">
            <input
              type="string"
              className="form-control"
              id="tenbaihat"
              value={song.tenbaihat}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="tacgia" className="col-sm-2 col-form-label">
           Tac Gia
          </label>
          <div className="col-sm-10">
            <input
              type="string"
              className="form-control"
              id="tacgia"
              value={song.tacgia}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="album" className="col-sm-2 col-form-label">
            Album
          </label>
          <div className="col-sm-10">
            <input
              type="string"
              className="form-control"
              id="album"
              value={song.album}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="hinhanh" className="col-sm-2 col-form-label">
          Hinh Anh
          </label>
          <div className="col-sm-10">
            <input
              type="string"
              className="form-control"
              id="hinhanh"
             
              value={song.hinhanh}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="file" className="col-sm-2 col-form-label">
            File
          </label>
          <div className="col-sm-10">
            <input
              type="string"
              className="form-control"
              id="file"
              value={song.file}
            />
          </div>
        
        </div>
      </form>
    </div>
  );
}

export default SongDetail;