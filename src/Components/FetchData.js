import React from 'react';
import { useEffect, useState } from 'react';
import '../App.css';
import ReactPaginate from 'react-paginate';

const FetchData = () => {

  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const[currentItems, setCurrentItems]=useState(data)
    const [pageCount, setPageCount]=useState(0)

  const fetchData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`)
      .then(res => res.json())

      .then(data => {
        setData(data)
        setSearchResults(data)
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(data.length/itemsPerPage))
      })

  }
  console.log(data)
  const itemsPerPage =10;
  useEffect(() => {
    fetchData();
  

  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
   
    setItemOffset(newOffset);
}
  const handleChange = (event) => {
    setSearchTerm(event.target.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchData();
  }


  return (
    <div className="App" >
      <div >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className='form-input'
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search with title..."
          />
          <button className='btn' type="submit">Search</button>
        </form>

        {searchResults.length > 0 ? (
          <div className='sub-div'>
            {currentItems.map((result, index) => (
              <div key={index} className='card' style={{ border: '2px solid black', flex: "47%", margin: "3px", padding: "10px" }}>
                <h3>{result.id}</h3>
                <h5>{result.title}</h5>
                <p>{result.body}</p>
              </div>

            ))}
          </div>
        ) : null}
      </div>
      <div>
        <ReactPaginate

          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </div>
  );
}


export default FetchData;
