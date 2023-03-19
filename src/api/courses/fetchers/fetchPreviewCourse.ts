import { Course } from '../../../types/courses/courses'
import { wiseyStudy } from '../../index'

interface Params {
  courseId: string
}

export const fetchPreviewCourse = ({ courseId }: Params) => wiseyStudy.get<Course>(`/core/preview-courses/${courseId}`)
