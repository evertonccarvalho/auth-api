import { v4 as uuidv4 } from 'uuid';

export abstract class UUID {
  static generate() {
    return uuidv4();
  }
}
