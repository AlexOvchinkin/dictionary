export type Word = {
    original: string,
    translate: string
}

export type WordObject = {
    word: Word,
    translates: Word[]
}

export type WordExt = {
    original: string,
    translate: string,
    isWrong?: boolean,
    isRight?: boolean
}

export type Algorithm = {
    name: string,
    data: WordObject
}

export type LearningData = {
    learning: number,
    training: number
}

export const HOME_PAGE: string = '';
export const ENTER_PAGE: string = 'enter';
export const TRAINING_PAGE: string = 'training';
export const REGISTRATION_PAGE: string = 'registration';
export const AUTHORISATION_PAGE: string = 'authorisation';






















