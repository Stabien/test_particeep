export interface Movie {
  id: string
  title: string
  category: string
  likes: number
  dislikes: number
}

export interface State {
  movies: Movie[]
}

export interface MovieLikeData {
  id: string
  likes?: number
  dislikes?: number
  removePreviousLike?: boolean
  removePreviousDislike?: boolean
  value: number
}
