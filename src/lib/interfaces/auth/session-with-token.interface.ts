import ISession from './session.interface';

export default interface ISessionWithToken extends ISession {
  token: string;
}
