import React from "react";
import './About.css';


function About() {
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    function obfusucate(email) {
        var omail = '#';
        var o2mail = email.split('@');
        return(

            <a onMouseEnter={() => {
                document.querySelector('#obEmailLink').setAttribute(`href`,`mailto:${email}`);
                document.querySelector('#obEmailLink').innerHTML = email
            }} onMouseLeave={() => {
                document.querySelector('#obEmailLink').setAttribute(`href`,`${omail}`);
                document.querySelector('#obEmailLink').innerHTML = `<span class="obEmail">${o2mail[0]}</span><span>${o2mail[1]}</span>`
            }} id="obEmailLink" href={`${omail}`}>
                <span className="obEmail">{o2mail[0]}</span><span>{o2mail[1]}</span>
            </a>

        )
    }

return(
    <div className="about-container">
         <img alt="June Pratt with a purple coat on and Durham skyline in the background" className="about-image" src="../images/Me.jpg"></img>
         <div className="about-text-box">
            <h2>Hi, I'm June</h2>
            <p>Thank you for stopping by. I'm a Jr. frontend &amp; fullstack developer, musician, and dabbler from Durham, NC. I have a passion for design and art and bring that into my work.</p>
            <p>I have {getAge("2017/03/01")} years of experience working with HTML, CSS, Javascript, React, Liquid, Figma, and Adobe Creative Suites. I have {getAge("2020/03/01")} years of experience building and using APIs and backends with Express, Node, GraphQL, MySQL, and PostgreSQL.</p>
            <p>I firmly believe in web development as an art form, and I'm always excited to speak to other creatives. If you're looking to connect shoot me an email at {obfusucate("june@joonipea.com")}</p>
        </div>
    </div>
)
}

export default About