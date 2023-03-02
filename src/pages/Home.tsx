import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movies$ } from '@/data/movies.js'
import CardMovie from '@/components/CardMovie'
import { State, Movie, MultiselectOption } from '@/types'
import { fillMoviesAction } from '@/store/movieSlice'
import Multiselect from '@/components/Multiselect'

const Home = (): JSX.Element => {
  const dispatch = useDispatch()
  const movies = useSelector((state: State) => state.movies)
  const isLoaded = useSelector((state: State) => state.isLoaded)

  const [selectedOptions, setSelectedOptions] = useState<MultiselectOption[]>([])

  const renderMovieList = movies.map((movie) => {
    if (selectedOptions.includes(movie.category as unknown as MultiselectOption)) {
      return <CardMovie key={movie.id} data={movie} />
    }
    return <Fragment key={movie.id}></Fragment>
  })

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
    <div className="w-4/5 mx-auto mt-5">
      <div className="filter">
        <Multiselect options={multiselectOptions} onChange={setSelectedOptions} />
      </div>
      <div className="container flex flex-wrap flex-row">{renderMovieList}</div>
    </div>
  )
}

export default Home
