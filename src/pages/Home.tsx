import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movies$ } from '@/data/movies.js'
import CardMovie from '@/components/CardMovie'
import { State, Movie, SelectOption } from '@/types'
import { fillMoviesAction } from '@/store/movieSlice'
import Multiselect from '@/components/Multiselect'
import Select from 'react-select'

const itemPerPageOptions = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 12, label: '12' },
]

const Home = (): JSX.Element => {
  const dispatch = useDispatch()
  const movies = useSelector((state: State) => state.movies)
  const isLoaded = useSelector((state: State) => state.isLoaded)

  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

  const [pageNumber, setPageNumber] = useState(0)
  const [itemPerPage, setItemPerPage] = useState(4)
  const [displayNextButton, setDislayNextButton] = useState(true)

  const movieCategories: string[] = []

  for (const movie of movies) {
    if (!movieCategories.includes(movie.category)) {
      movieCategories.push(movie.category)
    }
  }

  const SelectOptions = movieCategories.map((category) => ({
    label: category,
    value: category,
  }))

  const getMovieListFiltered = (): Movie[] => {
    const movieList = []
    const selectedCategories = selectedOptions.map((option) => option.value)

    for (const movie of movies) {
      if (selectedCategories.includes(movie.category) || selectedOptions.length === 0) {
        movieList.push(movie)
      }
    }
    return movieList
  }

  const renderMovieList = (): JSX.Element[] => {
    const movieList = getMovieListFiltered()
    const indexBeginList = itemPerPage * pageNumber
    const indexEndList = itemPerPage * (pageNumber + 1)

    const listToRender = []

    for (let i = indexBeginList; i < indexEndList; i++) {
      if (i < movieList.length) {
        listToRender.push(<CardMovie key={movieList[i].id} data={movieList[i]} />)
      }
    }

    if (indexEndList >= movieList.length && displayNextButton) {
      setDislayNextButton(false)
    } else if (movieList.length > indexEndList && !displayNextButton) {
      setDislayNextButton(true)
    }
    return listToRender
  }

  const previousButton = (
    <button
      className="mr-auto sm:mr-2 bg-red-400 px-2 w-24 h-10 text-white rounded"
      onClick={() => setPageNumber(pageNumber - 1)}
    >
      Précédent
    </button>
  )

  const nextButton = (
    <button
      className="ml-auto sm:ml-2 bg-red-400 px-2 w-24 h-10 text-white rounded"
      onClick={() => setPageNumber(pageNumber + 1)}
    >
      Suivant
    </button>
  )

  const updateItemPerPage = (option: SelectOption): void => {
    setPageNumber(0)
    setItemPerPage(option.value)
  }

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
    <div className="w-4/5 mx-auto mt-5 py-5">
      <h1 className="text-2xl mb-3 text-bold">Catalogue de films</h1>
      <div>
        <Multiselect options={SelectOptions} onChange={setSelectedOptions} />
      </div>
      <div className="flex flex-wrap flex-row">{movies.length > 0 ? renderMovieList() : null}</div>
      <div className="w-full flex flex-col sm:flex-row justify-between">
        <div className="mt-2">
          <label htmlFor="select-item-per-page text-xs">Nombre d&apos;éléments affichés</label>
          <Select
            options={itemPerPageOptions}
            onChange={updateItemPerPage}
            aria-label="Nombre d'éléments par page"
            defaultValue={itemPerPageOptions[0]}
            name="select-item-per-page"
          />
        </div>
        <div className="mt-2 justify-between sm:mt-auto sm:w-fit sm:ml-auto flex flex-row">
          {pageNumber > 0 ? previousButton : null}
          {displayNextButton ? nextButton : null}
        </div>
      </div>
    </div>
  )
}

export default Home
