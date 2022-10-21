import React, {useEffect, useState} from 'react';

import './App.css';
import axios from "axios";
import MovieList from "./features/movieList/MovieList";
import storage from '../src/firebaseConfig'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

import ReactPlayer from 'react-player';


function App() {

  const [favoriteMovieList, setfavoriteMovieList] = useState([])
    const [file, setFile] = useState("");

    const [percent, setPercent] = useState(0);


    const [videoURL, setVideoURL] = useState("");

    const [movie, setMovie] = useState({
        original_language : '',
        original_title: '',
        videoLink: '',
        genre: ''
    });

    const [genres, setGenres] = useState([])
    const getGenre = async () => {
       return await axios.get('http://localhost:8000/api/genre')
    }


    const handleChange = (e) => {
        setMovie({...movie, [e.target.name]: e.target.value })

    }
    function handleChangeVideo(event) {
        setFile(event.target.files[0]);
    }


    function handleUpload() {

        if (!file) {
            alert("Please choose a file first!")
        }

        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );


                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setVideoURL(url)
                });
            }
        );

    }
    const handleChangeSelection = (e) => {
        console.log(e.value)
    }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setMovie({...movie, videoLink: videoURL })
      const data = {
          original_language: movie.original_language,
          original_title: movie.original_title,
          videoLink: movie.videoLink,
          genre : movie.genre
      }
      await axios.post('http://localhost:8000/api/movie',data)
          .then(res => console.log(res.data) )
          .catch(err => console.log(err))

  }

  useEffect(() => {
      getGenre().then(res =>

          setGenres(res.data.genres))
          .catch(err => console.log(err))
  },[])



  return (
      <>
        <h1>359 Flix - Movie HD</h1>
          <div>
              <form encType={'multipart/form-data'}>
                  <label>Language</label>
                  <input type='text'  name='original_language' onChange={handleChange}/>
                  <label>Title</label>
                  <input type='text'  name='original_title' onChange={handleChange} />
                  <input type="file"  onChange={handleChangeVideo}/>
                  <select name='genre' onChange={(e ) =>{
                      setMovie({...movie, [e.target.name] : e.target.value})
                  }}>
                  { genres.map(genre => (
                      <option  key={genre._id} value={genre._id}>{genre.name}</option>
                  ))
                  }
                  </select>

                  <button type="button" onClick={handleUpload}>Upload to Firebase</button>
                  <button type ="submit" onClick={handleSubmit}>Submit</button>
              </form>
              <p>{percent} "% done"</p>
              <div className='player-wrapper'>
                  <ReactPlayer
                      className='react-player fixed-bottom'
                      url= {videoURL}
                      width='100%'
                      height='100%'
                      controls = {true}
                  />
              </div>
          </div>
      </>
  );

}
export default App;
