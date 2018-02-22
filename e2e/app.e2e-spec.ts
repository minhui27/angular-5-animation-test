import { MyTest2Page } from './app.po';

describe('my-test2 App', function() {
  let page: MyTest2Page;

  beforeEach(() => {
    page = new MyTest2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
