import { createApi } from './common/createApi'

export const wiseyStudy = createApi({
  baseURL: 'https://api.wisey.app/api/v1',
})

export const wiseyApp = createApi({
  baseURL: ' https://wisey.app',
})

export const apiInstances = [wiseyStudy, wiseyApp]
