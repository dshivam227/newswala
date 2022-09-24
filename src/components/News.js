import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
 const [articles, setarticles] = useState([])
 const [page, setpage] = useState(1)
 const [totalResults, settotalResults] = useState(0)

 
    const updateNews=async ()=> {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7f67786f465048c8938623228a87875d&page=${page}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(parsedData.articles)
        // this.setState({ articles: parsedData.articles });
    }

    useEffect(() => {
        updateNews();
     
    }, [])
    
 
    const fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7f67786f465048c8938623228a87875d&page=${page+1}`;
        setpage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles( articles.concat(parsedData.articles ))
        // setState({ articles:});         
      };

    
        return (
            <div className='container my-3'>
                <h1 className="text-center">News - Wala</h1>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}
                    // loader={<h4>Loading...</h4>}
                />
                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title.slice(0, 40)} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}

                </div>
            </div>


        )
    
}

News.defaultProps = {
    country: 'in',
    category: 'science',
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
}
export default News