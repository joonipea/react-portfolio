import React, {useRef, useState} from "react";
import './WritePosts.css';


                                                 

const WritePosts = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    const contentRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submitting');
        const content = contentRef.current.innerHTML;
        const data = {title, content, date};
        console.log(JSON.stringify(data));
        alert(JSON.stringify(data));
        fetch(`${process.env.REACT_APP_API_ENDPOINT}blogs/addpost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                alert("Post added successfully");
            } else {
                alert("Error adding post");
            }
        })
    }
    return (
        <div>
        <h1>Write A Post</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="Title">Title
            <input value={title} onChange={e => setTitle(e.target.value)} name="Title" type="text" placeholder="Title" />
            </label>
            <label htmlFor="Date">Date
            <input value={date} onChange={e => setDate(e.target.value)}name="Date" type="datetime-local" />
            </label>
            <label htmlFor="Content">Content
            <div ref={contentRef} contentEditable="true" id="editor"></div>
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
    }
export default WritePosts;