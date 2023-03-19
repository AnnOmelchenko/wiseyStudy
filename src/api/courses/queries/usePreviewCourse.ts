import { ApiQueryKeys } from '../../../constants/apiQueryKeys'
import { createUseQuery } from '../../common/createUseQuery'
import { fetchPreviewCourse } from '../fetchers/fetchPreviewCourse'

export const usePreviewCourse = createUseQuery({
  queryKey: ApiQueryKeys.PREVIEW_COURSE,
  fetcher: fetchPreviewCourse,
  selector: res => res?.data || null,
})
