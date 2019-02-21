import {KijijiProvider} from "@business/search/provider/KijijiProvider"
import {IProvider} from "@business/search/provider/IProvider"

export enum ProviderType {
  KIJIJI = 'kijiji'
}

const providerMap: Map<ProviderType, IProvider> = new Map([
  [ProviderType.KIJIJI, new KijijiProvider()]
])

export function getProvider(type: ProviderType): IProvider | null {
  if (!providerMap.has(type)) {
    return null
  }

  return providerMap.get(type)
}

