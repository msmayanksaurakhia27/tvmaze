import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, withRouter, Link, useLocation } from 'react-router-dom';
import { Layout, Input } from 'antd';
import Homepage from '../src/components/Homepage';
import SearchShow from './components/SearchShow';
import ShowDetails from './components/ShowDetails';
import queryString from 'query-string';
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const AppRouter = () => {
    const { search } = useLocation();
    const history = useHistory();
    const [searchValue, setSearchValue] = useState("")
    const onSearch = (value) => {
        value = value.trim();
        if (!value) {
            history.push(`/`);
        } else {
            history.push(`/search?q=${value}`);
        }
    }

    useEffect(()=> {
        const values = queryString.parse(search);
        if(values.q && values.q.trim()){
            setSearchValue(values.q.trim())
        } else {
            setSearchValue("")
        }
    }, [search])
    return (
        <Layout style={{ minHeight: "100vh", overflow:'hidden' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',

                }}
            >
                <Link to="/">
                    <div
                        style={{
                            float: 'left',
                            width: "40%",
                            height: 31,
                            margin: '16px 24px 16px 0',
                            backgroundImage: 'url("https://static.tvmaze.com/images/api/tvm_api.png")',
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "left"
                        }}
                    />
                </Link>
                <div
                    style={{
                        float: 'right',
                        width: '40%',
                        height: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Search placeholder="Search" value={searchValue} onChange={e=>setSearchValue(e.target.value)} onSearch={onSearch} allowClear enterButton />
                </div>
            </Header>
            <Content
                className="site-layout"
                style={{
                    padding: '50px',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: "white",
                    }}
                >

                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={Homepage}
                        ></Route>
                        <Route
                            path="/search"
                            component={SearchShow}
                        ></Route>
                        <Route
                            path="/shows/:id"
                            component={ShowDetails}
                        ></Route>
                    </Switch>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                © {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};
export default withRouter(AppRouter);