import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { axiosInstance } from '../utilities/configureAxios';
import { Spin, Card } from 'antd';
import defaultImage from '../images/default.png'

const SearchShow = () => {
  const { search } = useLocation();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { Meta } = Card;

  useEffect(() => {
    setLoading(true)
    const values = queryString.parse(search);
    axiosInstance.get(`search/shows?q=${values.q}`)
      .then((res) => {
        setLoading(false)
        if (res.data)
          setData(res.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [search])
  return (
    loading ? <center><Spin /></center> :
      (Object.keys(data).length === 0 ? <div><center>No show found</center></div> :
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {data.map((detail, i) =>
            <Link key={i} to={`/shows/${detail?.show?.id}`}>
              <Card
                key={i}
                hoverable
                style={{ width: 240, margin: "8px", height: "97%" }}
                cover={<img alt={detail?.show?.name} src={detail?.show?.image?.medium ?? defaultImage} />}
              >
                <Meta title={detail?.show?.name} description={<div key={i} dangerouslySetInnerHTML={{ __html: detail?.show?.summary?.length > 150 ? detail?.show?.summary?.substring(0, 150) + "..." : detail?.show?.summary }} />} />
              </Card>
            </Link>
          )}
        </div>
      )
  );
};

export default SearchShow;
