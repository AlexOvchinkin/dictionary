import { DictionaryPage } from './app.po';

describe('dictionary App', () => {
  let page: DictionaryPage;

  beforeEach(() => {
    page = new DictionaryPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
