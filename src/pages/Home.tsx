import { useState, useEffect, SetStateAction } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { movies$ } from '@/data/movies.js'
import '@/styles/App.css'
import CardMovie from '@/components/CardMovie'
import { State, Movie } from '@/types'

const Home = (): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([])
  const dispatch = useDispatch()
  const storeMovies = useSelector((state: State) => state.movies)

  const fillMovies = () => {
    return {
      type: 'FILL_MOVIES',
      movies: movies,
    }
  }

  const renderItem = storeMovies.map((item) => {
    return <CardMovie key={item.id} data={item} />
  })

  useEffect(() => {
    if (storeMovies.length === 0) {
      movies$
        .then((response) => setMovies(response as SetStateAction<Movie[]>))
        .catch((e) => console.log('test'))
      dispatch(fillMovies())
    }
  })

  return (
    <div className="App">
      <div className="container">{renderItem}</div>
    </div>
  )
}

export default connect((state: State) => {
  return {
    movies: state.movies,
  }
})(Home)
