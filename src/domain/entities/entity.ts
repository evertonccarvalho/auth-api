import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity<Props = any> {
  public readonly id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this.props = props;
    this.id = id || uuidv4(); // Gerando um UUID v4 caso o ID não seja fornecido
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
