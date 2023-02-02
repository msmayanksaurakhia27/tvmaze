import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../utilities/configureAxios';
import { Spin, Card } from 'antd';
import defaultImage from '../images/default.png';
import Carousel from 'carousel-react-rcdev';
import { Link } from 'react-router-dom';
const HomePage = () => {
    const [loading, setLoading] = useState(false)
    const [allShows, setAllShows] = useState([])
    const { Meta } = Card;

    useEffect(() => {
        setLoading(true)
        axiosInstance.get(`shows`)
            .then((res) => {
                let allGenre = []
                let shows = []
                setLoading(false)
                res.data.map(
                    show => allGenre = allGenre.concat(show['genres'])
                )
                allGenre = [...new Set(allGenre)]
                allGenre.forEach(genre => {
                    shows.push({
                        "genre": genre,
                        "shows": res.data.filter(show => {
                            return show?.genres?.includes(genre)
                        })
                    })
                })
                setAllShows(shows)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])
    return (
        loading ? <center><Spin /></center> :
            (
                Object.keys(allShows).length === 0 ? <div><center>No show found</center></div> :
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}>
                        {allShows.map((show, i) =>
                            <div style={{ margin: "auto", marginLeft: 0 }}>
                                <h2>{show.genre}</h2>
                                <Carousel key={i}>
                                    {show?.shows.map((detail, i) =>
                                        <Link to={`/shows/${detail?.id}`}>
                                            <Card
                                                key={i}
                                                hoverable
                                                style={{ maxWidth: "200px", minWidth: "200px", margin: "8px", height: "95%" }}
                                                cover={<img alt={detail?.name} src={detail?.image?.medium ?? defaultImage} />}
                                            >
                                                <Meta title={detail?.name} description={<div key={i} dangerouslySetInnerHTML={{ __html: detail?.summary?.length > 150 ? detail?.summary?.substring(0, 150) + "..." : detail?.summary }} />} />
                                            </Card>
                                        </Link>
                                    )}
                                </Carousel>
                            </div>
                        )}
                    </div>
            )
    );
};

export default HomePage;
