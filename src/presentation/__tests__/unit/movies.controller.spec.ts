import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetMoviesUseCase,
  GetMovieUseCase,
  UpdateMovieUseCase,
} from '@/application/use-case/movie';
import { MoviesController } from '@/presentation/controllers/movies.controller';
import { MoviePresenter } from '@/presentation/presenters/movie.presenter';
import { RedisModule } from '@/infra/data/cache/redis.module';
import { CreateMovieDto, UpdateMovieDto } from '@/application/dtos/movie';

describe('MoviesController', () => {
  let controller: MoviesController;
  let getMoviesUseCase: GetMoviesUseCase.UseCase;
  let createMovieUseCase: CreateMovieUseCase.UseCase;
  let getMovieUseCase: GetMovieUseCase.UseCase;
  let deleteMoviesUseCase: DeleteMovieUseCase.UseCase;
  let updateMoviesUseCase: UpdateMovieUseCase.UseCase;

  const moviePresenter = new MoviePresenter({
    id: 'some-uuid',
    title: 'Movie Title',
    synopsis: 'This is a test movie',
    duration: 120,
    year: 2023,
    director: 'Movie Director',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const movieListPresenter = [
    new MoviePresenter({
      id: 'some-uuid',
      title: 'Movie Title',
      synopsis: 'This is a test movie',
      duration: 120,
      year: 2023,
      director: 'Movie Director',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      controllers: [MoviesController],
      providers: [
        {
          provide: GetMoviesUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreateMovieUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetMovieUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteMovieUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateMovieUseCase.UseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    getMoviesUseCase = module.get<GetMoviesUseCase.UseCase>(
      GetMoviesUseCase.UseCase,
    );
    createMovieUseCase = module.get<CreateMovieUseCase.UseCase>(
      CreateMovieUseCase.UseCase,
    );
    getMovieUseCase = module.get<GetMovieUseCase.UseCase>(
      GetMovieUseCase.UseCase,
    );
    deleteMoviesUseCase = module.get<DeleteMovieUseCase.UseCase>(
      DeleteMovieUseCase.UseCase,
    );
    updateMoviesUseCase = module.get<UpdateMovieUseCase.UseCase>(
      UpdateMovieUseCase.UseCase,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Movie Title',
        synopsis: 'This is a test movie',
        duration: 120,
        year: 2023,
        director: 'Movie Director',
      };

      jest
        .spyOn(createMovieUseCase, 'execute')
        .mockResolvedValueOnce(moviePresenter);

      expect(await controller.create(createMovieDto)).toEqual(moviePresenter);
      expect(createMovieUseCase.execute).toHaveBeenCalledWith(createMovieDto);
    });

    it('should throw error if createMovieUseCase fails', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Movie Title',
        synopsis: 'This is a test movie',
        duration: 120,
        year: 2023,
        director: 'Movie Director',
      };

      const error = new Error('Failed to create movie');
      jest.spyOn(createMovieUseCase, 'execute').mockRejectedValueOnce(error);

      await expect(controller.create(createMovieDto)).rejects.toThrowError(
        error,
      );
      expect(createMovieUseCase.execute).toHaveBeenCalledWith(createMovieDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of movies', async () => {
      jest
        .spyOn(getMoviesUseCase, 'execute')
        .mockResolvedValueOnce(movieListPresenter);

      expect(await controller.findAll()).toEqual(movieListPresenter);
      expect(getMoviesUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const id = 'some-uuid';
      jest
        .spyOn(getMovieUseCase, 'execute')
        .mockResolvedValueOnce(moviePresenter);

      expect(await controller.findOne(id)).toEqual(moviePresenter);
      expect(getMovieUseCase.execute).toHaveBeenCalledWith({ id });
    });
  });

  describe('remove', () => {
    it('should delete a movie', async () => {
      const id = 'some-uuid';
      jest
        .spyOn(deleteMoviesUseCase, 'execute')
        .mockResolvedValueOnce(undefined);

      expect(await controller.remove(id)).toBeUndefined();
      expect(deleteMoviesUseCase.execute).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const id = 'some-uuid';
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Movie Title',
        synopsis: 'Updated Movie synopsis',
        year: 2024,
        director: 'Updated Movie Director',
      };

      const updatedMovie = new MoviePresenter({
        id: 'some-uuid',
        title: 'Updated Movie Title',
        synopsis: 'Updated Movie synopsis',
        duration: 120,
        year: 2024,
        director: 'Updated Movie Director',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest
        .spyOn(updateMoviesUseCase, 'execute')
        .mockResolvedValueOnce(updatedMovie);

      expect(await controller.update(id, updateMovieDto)).toEqual(updatedMovie);
      expect(updateMoviesUseCase.execute).toHaveBeenCalledWith({
        id,
        data: updateMovieDto,
      });
    });
  });
});
