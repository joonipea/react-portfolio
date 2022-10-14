import React, {useEffect, useState, useRef} from "react";
import { DynamicBackground } from "../DynamicBackground";
import axios from "axios";
import "./BeatUpload.css";

export const BeatUpload = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const filesMounted = useRef(false);
    const imageMounted = useRef(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        const data = {title, date, artist, album, url, image: imgUrl, description, tags: tags.split(",")};
        console.log(JSON.stringify(data));
        if(imgUrl === "" || url === "") {
            alert("Please try again");
        } else {
            /*
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}music/addSong`, data).then((res) => {
                console.log(res.data);
            }
            ).catch((err) => {
                console.log(err);
            });
            */
            fetch(`${process.env.REACT_APP_API_ENDPOINT}music/addSong`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
                }).then((response) => {
                    if (response.ok) {
                        alert("Post added successfully");
                    } else {
                        alert("Error adding post");
                    }
                }
            )
        }


    }
    useEffect(() => {
        if(filesMounted.current) {
            console.log(url);
            console.log(file[0]);
            const urldata = new FormData();
            urldata.append("file", file[0]);
            /*
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}upload`, urldata).then((res) => {
                console.log(res.data);
                setUrl(`${process.env.REACT_APP_API_ENDPOINT}${res.data.fileName}`);

            })
            .catch((err) => {
                console.log(err);
            }) 
            fetch(`${process.env.REACT_APP_API_ENDPOINT}upload`,{
                method: "POST",
                body: urldata,
            }).then((res, data) => {
                if(res.ok){
                console.log(res.json());
                console.log(data)
                console.log(data.filename)
                setUrl(`${process.env.REACT_APP_API_ENDPOINT}${data.filename}`);
                }else{
                    console.log("error");
                }
            })
            */
            async function getFileURL() {
                const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}upload`,{
                    method: "POST",
                    body: urldata,
                });
                const data = await res.json();
                console.log(data);
                if(data.success === null) {
                    console.log('loading');
                    return getFileURL()
                } else if (data.success === true) {
                    console.log("success");
                    return data;
                } else if (data.result === "error") {
                    console.log("error");
                    return data;
                }
            }
            getFileURL().then(data => {
                console.log(data);
                setUrl(`${process.env.REACT_APP_API_ENDPOINT}${data.fileName}`);
                console.log(url);
            }).catch(err => {
                console.log(err);
            })
        }else{
            filesMounted.current = true;
        }
    }, [file]);

    useEffect(() => {
        if(imageMounted.current) {
            const imgdata = new FormData();
            imgdata.append("file", image[0]);
            /*
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}upload`, imgdata).then((res) => {
                console.log(res.data);
                setImgUrl(`${process.env.REACT_APP_API_ENDPOINT}${res.data.fileName}`);
            })
            .catch((err) => {
                console.log(err);
            })
            */
           /*
            fetch(`${process.env.REACT_APP_API_ENDPOINT}upload`,{
                method: "POST",
                body: imgdata,
            }).then((res) => {
                if(res.ok){
                console.log(res);
                console.log(res.fileName);
                console.log(res.data);
                setImgUrl(`${process.env.REACT_APP_API_ENDPOINT}${res.filename}`);
                }
                else{
                    console.log("error");
                }
            })
            */
            async function getFileURL() {
                const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}upload`,{
                    method: "POST",
                    body: imgdata,
                });
                const data = await res.json();
                console.log(data);
                if(data.success === null) {
                    console.log('loading');
                    return getFileURL()
                } else if (data.success === true) {
                    console.log("success");
                    return data;
                } else if (data.result === "error") {
                    console.log("error");
                    return data;
                }
            }
            getFileURL().then(data => {
                console.log(data);
                setImgUrl(`${process.env.REACT_APP_API_ENDPOINT}${data.fileName}`);
                console.log(imgUrl);
            }).catch(err => {
                console.log(err);
            })
        }else{
            imageMounted.current = true;
        }
    }, [image]);

    return (
        <>
        <DynamicBackground />
        <div className="beat-upload">
            <div className="beat-upload__container">
                <h1>Upload a beat</h1>
                <form onSubmit={handleSubmit}>

                    <input onChange={e => setFile(e.target.files)} required type="file" name="file" id="file" accept="audio/*" />
                    <label htmlFor="file">Choose a song</label>
                    <input onChange={e => setImage(e.target.files)} required type="file" name="image" id="image" accept="image/*" />
                    <label htmlFor="image">Choose an image</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} required type="text" name="title" id="title" placeholder="Title" />
                    <input value={artist} onChange={e => setArtist(e.target.value)} required type="text" name="artist" id="artist" placeholder="Artist" />
                    <input value={album} onChange={e => setAlbum(e.target.value)} required type="text" name="album" id="album" placeholder="Album" />
                    <input value={date} onChange={e => setDate(e.target.value)} required type="datetime-local" name="date" id="date" />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required name="description" id="description" cols="30" rows="10" placeholder="Description"></textarea>
                    <input value={tags} onChange={e => setTags(e.target.value)} required type="text" name="tags" id="tags" placeholder="Tags" />



                    <input type="submit" value="Upload" />
                </form>
            </div>
        </div>
        </>
    );
}