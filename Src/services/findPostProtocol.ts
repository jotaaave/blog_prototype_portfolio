import { BlogProtocol } from './blogProtocol';
import { BLogPostWithIdAndDate } from './interfaces';

export interface FindPostProtocol {
  findPost(id: number, blog: BlogProtocol): BLogPostWithIdAndDate | Error;
}
