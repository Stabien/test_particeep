import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movies$ } from '@/data/movies.js'
import '@/styles/App.css'
import CardMovie from '@/components/CardMovie'
import { State, Movie } from '@/types'
import { fillMoviesAction } from '@/store/movieSlice'
import Multiselect from '@/components/Multiselect'

const Home = (): JSX.Element => {
  const dispatch = useDispatch()
  const movies = useSelector((state: State) => state.movies)
  const isLoaded = useSelector((state: State) => state.isLoaded)

  const renderMovieList = movies.map((item) => <CardMovie key={item.id} data={item} />)

  const movieCategories: string[] = []

  for (const movie of movies) {
    if (!movieCategories.includes(movie.category)) {
      movieCategories.push(movie.category)
    }
  }

  const multiselectOptions = movieCategories.map((category) => ({
    label: category,
    value: category,
  }))

  useEffect(() => {
    if (!isLoaded) {
      movies$
        .then((response) => dispatch(fillMoviesAction(response as Movie[])))
        .catch((e) => {
          throw new Error(e)
        })
    }
  })

  return (
    <div className="App">
      <div className="filter">
        <Multiselect options={multiselectOptions} />
      </div>
      <div className="container">{renderMovieList}</div>
    </div>
  )
}

export default Home
