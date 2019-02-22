export interface ICronMetadata {
  readonly cronRule: string
  readonly key: string
  readonly action: () => Promise<any>
}

