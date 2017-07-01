import { TestAngulrPage } from './app.po';

describe('test-angulr App', () => {
  let page: TestAngulrPage;

  beforeEach(() => {
    page = new TestAngulrPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
