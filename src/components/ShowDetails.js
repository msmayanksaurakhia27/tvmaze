import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../utilities/configureAxios';
import { Spin, Col, Row, Image, Rate } from 'antd';

const ShowDetails = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [crew, setCrew] = useState({})
  const [cast, setCast] = useState({})
  const getData = () => {
    setLoading(true)
    axiosInstance.get(`/shows/${id}`)
      .then((res) => {
        setLoading(false)
        if (res.data)
          setData(res.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getCrew = () => {
    setLoading(true)
    axiosInstance.get(`/shows/${id}/crew`)
      .then((res) => {
        setLoading(false)
        if (res.data)
        {
          let creator = res.data.filter((data) => data.type === "Creator")
          var creatorNames = creator.map(function (c) { return c.person.name; });
          setCrew(creatorNames)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getCast = () => {
    setLoading(true)
    axiosInstance.get(`/shows/${id}/cast`)
      .then((res) => {
        setLoading(false)
        if (res.data){
          setCast(res.data.map(function (c) { return c.person.name; }))
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getCast()
    getCrew()
    getData()
  }, [id])

  return (
    loading ? <center><Spin /></center> :
      (Object.keys(data).length === 0 ? <div><center>No details found</center></div> : <div>
        <Row>
          <Col span={7} style={{ paddingRight: "10px" }}>
            <Image
              width="100%"
              src={data?.image?.original}
            />
          </Col>
          <Col span={17}>
            <Row>
              <Col md={16} sm={24}>
                <h2>{data?.name} ({data?.rating?.average}/10)</h2>
              </Col>
              <Col md={8} sm={24}>
                <Rate allowHalf value={data?.rating?.average / 2} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h3>{`${new Date(data?.ended).getFullYear()} | ${data?.runtime} | ${crew.join(", ")}`}</h3>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h3>Cast: {`${cast.join(", ")}`}</h3>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div dangerouslySetInnerHTML={{ __html: data?.summary }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>)
  );
};

export default ShowDetails;
