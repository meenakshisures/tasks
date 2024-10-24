import { NameLengthPipe } from './name-length.pipe';

describe('NameLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new NameLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
