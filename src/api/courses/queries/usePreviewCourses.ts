import { ApiQueryKeys } from '../../../constants/apiQueryKeys'
import { createUseQuery } from '../../common/createUseQuery'
import { fetchPreviewCourses } from '../fetchers/fetchPreviewCourses'

export const usePreviewCourses = createUseQuery({
  queryKey: ApiQueryKeys.PREVIEW_COURSES,
  fetcher: fetchPreviewCourses,
  selector: res => res?.data || null,
})
