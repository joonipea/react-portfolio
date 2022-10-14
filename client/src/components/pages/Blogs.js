import React, {useState, useEffect} from "react";

const ListBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}blogs/getposts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setBlogs(data);
                });
            } else {
                alert("Error fetching posts");
            }
        })
    }, []);
        const blogList = blogs.map((blog, index) => {
            return (
                <div key={index}>
                    <a href={`/blogs/${(blog.title).replace(/ /g, "-")}`}><h2>{blog.title}</h2></a>
                    <p>{blog.date}</p>
                </div>
            )
        })
    return (
        <div>
            <h1>Blogs</h1>
            {blogList}
        </div>
    );
}

export default ListBlogs;