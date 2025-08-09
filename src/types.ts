
export interface Ibook{
  //id: string, 
  title: string
  author: string
  genre: "FICTION"|"NON_FICTION"|"SCIENCE"|"HISTORY"|"BIOGRAPHY"|"FANTASY"
  isbn: string
  description?: string
  copies: number
  available: boolean
}

export interface IBookWithId extends Ibook {
  _id: string;
}

export interface IBookByIdResponse {
  success: boolean;
  message: string;
  book: Ibook;
}