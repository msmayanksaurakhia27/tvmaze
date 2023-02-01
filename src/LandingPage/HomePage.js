import React from 'react'
import './HomePage.css'
import { FaSearch } from "react-icons/fa";
import { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'carousel-react-rcdev'

const HomePage = () => {
    const [data, setData] = useState([]);

    const fetchText = async () => {
        let response = await fetch('https://api.tvmaze.com/shows')
            .then((response) => { return response.json() })
            .then((res) => setData(res));
            //console.log("aaa",response.image.medium);
    }
    if(data.lenth >0){
    // console.log("aaa",data[0].image.medium);
    }
    const genreDrama = JSON.parse(JSON.stringify(data)).filter((x) => x.genres.includes("Drama"));
    const genreAction = JSON.parse(JSON.stringify(data)).filter((x) => x.genres.includes("Action"));
    const genreRomance = JSON.parse(JSON.stringify(data)).filter((x) => x.genres.includes("Romance"));
    const genreHorror = JSON.parse(JSON.stringify(data)).filter((x) => x.genres.includes("Horror"));
    const genreThriller = JSON.parse(JSON.stringify(data)).filter((x) => x.genres.includes("Thriller"));
    console.log(genreDrama, "Drama");
    console.log(genreAction, "Action");
    console.log(genreRomance, "Romance");
    console.log(genreHorror, "Horror");
    console.log(genreThriller, "Thriller");
    console.log("singh", data);
    const handleChange = () => {
        return <>
            <img src="https://picsum.photos/200/100" alt="..." class="card-img-top"></img>
        </>
    }
    useEffect(() => {
        fetchText();
    },[])
    return (
        <>
            <div className='landing-page'>
                <div className='header-parent'>
                    <div className='header-leftchild'>
                        <h1>TV MAZE</h1>
                    </div>
                    <div className='header-rightchild'>
                        <FaSearch /> <input className='header-search' type='text'></input>
                    </div>
                </div>
                <hr className='header-line'></hr>
                <div className='parent-card'>
                    <h2>Genre 1</h2>
                    {/* <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false}>
                        {data.map((item) => (
                            <Link to="/images">
                                <img src={item.img} />
                            </Link>
                        ))}
                    </Carousel> */}
                </div>
            </div>
        </>
    )
}
export default HomePage;