export type Word = {
    original: string,
    translate: string
}

export type WordExt = {
    original: string,
    translate: string,
    isWrong?: boolean,
    isRight?: boolean
}
