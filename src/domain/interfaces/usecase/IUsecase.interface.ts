export interface IUseCase<I, O> {
  run(input: I): Promise<O>;
}
