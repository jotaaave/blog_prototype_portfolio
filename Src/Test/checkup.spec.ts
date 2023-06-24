import { CheckUp } from '../Classes/checkup';

const createSut = () => {
  const sut = new CheckUp();
  return sut;
};

const createBodyForSut = (user: string, email: string, password: string) => {
  const body = {
    user: user,
    email: email,
    password: password,
  };
  return body;
};

afterEach(jest.clearAllMocks);

describe('CheckUp Class:', () => {
  it('should be 0 strings in array in return the clean', () => {
    const sut = createSut();
    const body = createBodyForSut('Joaooo', 'jv1234@gmail.com', '12345678');
    expect(sut.clean(body).length).toBe(0);
  });

  it('should be something strings in array in return the clean', () => {
    const sut = createSut();
    const body = createBodyForSut('Joaoo', 'jv1234gmail.com', '1234568');
    expect(sut.clean(body).length).toBe(3);
  });

  it('should return true because incorret format in checkPassword', () => {
    const sut = createSut();
    expect(sut.checkPassword('1234567').status).toBeTruthy();
  });

  it('should return true because incorret format in checkUsername', () => {
    const sut = createSut();
    expect(sut.checkUsername('Joaoo').status).toBeTruthy();
  });

  it('should return true because email is not valid in checkEmail', () => {
    const sut = createSut();
    expect(sut.checkEmail('jvlfekfe.com').status).toBeTruthy();
  });
});
