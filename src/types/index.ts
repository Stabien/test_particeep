export interface Movie {
  id: string
  title: string
  category: string
  likes: number
  dislikes: number
}

export interface State {
  movies: Movie[]
  isLoaded: boolean
}

export interface MovieLikeData {
  id: string
  likes?: number
  dislikes?: number
  removePreviousLike?: boolean
  removePreviousDislike?: boolean
  value: number
}

export interface MultiselectOption {
  label: string
  value: string
}
