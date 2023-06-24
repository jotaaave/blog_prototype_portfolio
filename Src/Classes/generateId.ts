import { GenIdProtocol } from '../services/generateIdProtocol';

export class GenerateId implements GenIdProtocol {
  generateId(): string {
    const value: number[] = [];
    for (let i = 0; i < 3; i++) {
      value.push(Math.floor(Math.random() * (10 - 1)));
    }
    return value.join('');
  }
}
