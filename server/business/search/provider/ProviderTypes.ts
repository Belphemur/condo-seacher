import {KijijiProvider} from "@business/search/provider/KijijiProvider"
import {IProvider} from "@business/search/provider/IProvider"
import {ISearchKeyword} from "@business/search/SearchKeyword"

export enum ProviderType {
  KIJIJI = 'kijiji'
}

const providerMap: Map<ProviderType, IProvider<ISearchKeyword>> = new Map([
  [ProviderType.KIJIJI, new KijijiProvider()]
])

export function getProvider(type: ProviderType): IProvider<ISearchKeyword> | null {
  if (!providerMap.has(type)) {
    return null
  }

  return providerMap.get(type)
}

