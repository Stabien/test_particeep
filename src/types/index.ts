export interface Movie {
  id: string
  title: string
  category: string
  likes: number
  dislikes: number
  isLiked: boolean
  isDisliked: boolean
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

export interface SelectOption {
  label: string
  value: any
}
