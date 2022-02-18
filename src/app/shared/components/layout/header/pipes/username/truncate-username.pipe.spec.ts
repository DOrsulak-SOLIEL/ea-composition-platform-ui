import {TruncateUsernamePipe} from './truncate-username.pipe';

describe('truncate-username-pipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
