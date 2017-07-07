export type Word = {
    original: string,
    translate: string
}

export type WordObject = {
    word: Word,
    translates: Word[]
}

export type Algorithm = {
    name: string,
    data: WordObject
}

export type LearningData = {
    learning: number,
    training: number
}

export type CheckLetter = {
  letter: string,
  isShown: boolean,
  isEmpty: boolean
}

export type PickLetter = {
  letter: string,
  isShown: boolean,
  isWrong: boolean
}

export type UpdateObject = {
  position: number,
  checkLetter: CheckLetter,
  pickLetter: PickLetter
}

export const SOUND_PATH: string = 'sources/sounds/';

export const HOME_PAGE: string = '';
export const ENTER_PAGE: string = 'enter';
export const TRAINING_PAGE: string = 'training';
export const REGISTRATION_PAGE: string = 'registration';
export const AUTHORISATION_PAGE: string = 'authorisation';






















