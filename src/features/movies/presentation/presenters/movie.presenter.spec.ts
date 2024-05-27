import { MovieEntity } from '@/features/movies/domain/entities/movie';
import { instanceToPlain } from 'class-transformer';
import { MoviePresenter } from './movie.presenter';

describe('MoviePresenter unit tests', () => {
  const createdAt = new Date();
  const updatedAt = new Date();
  const props: MovieEntity = {
    id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
    title: 'Test Movie',
    synopsis: 'This is a test movie',
    duration: 120,
    director: 'Test Director',
    year: 2023,
    createdAt,
    updatedAt,
  };
  let sut: MoviePresenter;

  beforeEach(() => {
    sut = new MoviePresenter(props);
  });

  describe('constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.title).toEqual(props.title);
      expect(sut.synopsis).toEqual(props.synopsis);
      expect(sut.duration).toEqual(props.duration);
      expect(sut.director).toEqual(props.director);
      expect(sut.year).toEqual(props.year);
      expect(sut.createdAt).toEqual(props.createdAt);
      expect(sut.updatedAt).toEqual(props.updatedAt);
    });
  });

  describe('instanceToPlain method', () => {
    it('should present data', () => {
      const output = instanceToPlain(sut);
      expect(output).toEqual({
        id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
        title: 'Test Movie',
        synopsis: 'This is a test movie',
        duration: 120,
        director: 'Test Director',
        year: 2023,
        createdAt,
        updatedAt,
      });
    });
  });
});
