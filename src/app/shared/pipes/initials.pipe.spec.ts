import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  it('create an instance', () => {
    const pipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return initial', () => {
    const firstName = 'Kelly';
    const lastName = 'Morgan';
    const pipe = new InitialsPipe();
    const expectedResult = 'KM';
    const result = pipe.transform(firstName, lastName);
    expect(result).toEqual(expectedResult);
  });
});
