export interface AllCourses {
  courses: Omit<CourseDTO, 'lessons'>[]
}

export type Course = Omit<CourseDTO, 'lessonsCount'>

export interface CourseDTO {
  containsLockedLessons: boolean
  description: string
  duration: number
  id: string
  launchDate: string
  lessonsCount: number
  lessons: Lesson[]
  meta: Meta
  previewImageLink: string
  rating: number
  status: string
  tags: string[]
  title: string
}

export interface Meta {
  courseVideoPreview: VideoPreview
  duration: number
  link: string
  previewImageLink: string
  skills: string[]
  slug: string
}

export interface VideoPreview {
  duration: number
  link: string
  previewImageLink: string
}

export interface Lesson {
  duration: number
  id: string
  link: string
  meta: Meta | null
  order: number
  previewImageLink: string
  status: string
  title: string
  type: string
}
