import { AllCourses } from '../../../types/courses/courses'
import { wiseyStudy } from '../../index'

export const fetchPreviewCourses = () => wiseyStudy.get<AllCourses>('/core/preview-courses')
