import { useEffect, useState } from 'react'
import './App.css'

const url = 'https://dummyjson.com/products?limit=100'
function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const getProducts = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setProducts(data.products)
  }

  const nextPage = () => {
    setPage (page + 1)
  }

  const prevPage = () => {
    setPage (page - 1)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className='product-container'>
        {products.length &&
          products.slice((page * 10) - 10, page * 10).map(product => (
            <div key={product.id} className='product'>
              <div className='img-container'>
                <img src={product.thumbnail} />
              </div>
              <span>{product.title}</span>
            </div>
          ))
        }
      </div>
      <div className='controls'>
        <span className={`control ${page === 1 ? 'disabled' : ''}`} onClick={prevPage}>Previous</span>
        {products.length > 0 ? 
          (
            [...Array(products.length / 10)].map((val, idx) => (
              <span className='control' onClick={() => { setPage(idx + 1) }}>{idx + 1}</span>
            ))
          ) : ""
        }
        <span className={`control ${page === products.length / 10 ? 'disabled' : ''}`} onClick={nextPage}>Next</span>
      </div>
    </>
  )
}

export default App