import { ApiQueryKeys } from '../../../constants/apiQueryKeys'
import { createUseQuery } from '../../common/createUseQuery'
import { fetchToken } from '../fetchers/fetchToken'

export const useToken = createUseQuery({
  queryKey: ApiQueryKeys.TOKEN,
  fetcher: fetchToken,
  selector: res => res?.data || [],
})
