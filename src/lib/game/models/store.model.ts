// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { IState } from './state.model';

export interface IAction {
  type: string;
}

export type Reducer<T> = (state: T, action: IAction) => IState;

export interface IStore {
  dispatch(action: IAction): void;
  getState(): IState;
}

export interface IStoreStatic {
  new(reducer: Reducer<IStore>): IStore;
}

export class Store implements IStore {
  protected state: IState;

  public constructor(
    protected reducer: Reducer<IStore>,
    preloadedState: IState
  ) {
    this.state = preloadedState;
  }

  public dispatch(action: IAction) {
    this.state = this.reducer(this.state, action);
  }

  public getState(): IState {
    return this.state;
  }
}
