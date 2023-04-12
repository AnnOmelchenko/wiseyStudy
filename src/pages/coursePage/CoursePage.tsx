import Hls from 'hls.js'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './CoursePage.styled.scss'

import { CourseDetails } from './components/courseDetails/CourseDetails'
import { usePreviewCourse } from '../../api/courses/queries/usePreviewCourse'
import { Lesson } from '../../types/courses/courses'
import { Loader } from '../../ui-base/loader/Loader'
import lock from '../../ui-base/svg/Lock.svg'

export const CoursePage = () => {
  const { id } = useParams<{ id: string }>()
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(undefined)
  const { data: course, isLoading } = usePreviewCourse({
    params: {
      courseId: id!,
    },
  })

  const sortedLessons = course?.lessons.sort((a, b) => a.order - b.order)

  useEffect(() => {
    if (!isLoading && course) {
      const videoMeta = JSON.parse(window.localStorage.getItem(course.id)!)
      if (videoMeta) {
        setCurrentLesson(course?.lessons.find(lesson => lesson.order === videoMeta.currentLesson))
        const video = document.getElementById('videoMeta') as HTMLMediaElement
        if (video) {
          video.currentTime = videoMeta.currentTime || 0
        }
      } else {
        setCurrentLesson(course?.lessons.find(lesson => lesson.order === 1))
      }
    }
  }, [isLoading, course])

  const updateVideoMeta = useCallback(
    (video: HTMLMediaElement) => {
      const videoMeta = {
        id: course!.id,
        currentLesson: currentLesson!.order,
        currentTime: video.currentTime,
      }
      window.localStorage.setItem(course!.id, JSON.stringify(videoMeta))
    },
    [course, currentLesson],
  )

  useEffect(() => {
    if (!isLoading && currentLesson) {
      const videoSrc = currentLesson.link!
      const video = document.getElementById('videoMeta') as HTMLMediaElement

      if (video) {
        video.addEventListener('timeupdate', () => updateVideoMeta(video))

        if (Hls.isSupported()) {
          const hls = new Hls()
          hls.loadSource(videoSrc)
          hls.attachMedia(video)
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc
        }

        return () => video.removeEventListener('timeupdate', () => updateVideoMeta(video))
      }
    }
  }, [isLoading, currentLesson, updateVideoMeta])

  const handleLessonClick = (order: number) => {
    setCurrentLesson(course?.lessons.find(lesson => lesson.order === order))
  }

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <div className="coursePage">
      {course && (
        <>
          <h3 className="title">{course.title}</h3>
          <div className="lessonsWrapper">
            <div className="videoWrapper">
              <video id="videoMeta" src={currentLesson?.link} controls />
              <h4>{currentLesson?.order + '. ' + currentLesson?.title}</h4>
            </div>
            <div>
              <h4>Lessons In This Course:</h4>
              <div className="lessonsList">
                {sortedLessons?.map(lesson => (
                  <div
                    className={`lessonSection ${lesson.order === currentLesson?.order ? 'active' : ''} ${
                      lesson.status === 'locked' ? 'disabled' : ''
                    }`}
                    key={lesson.order}
                    onClick={() => handleLessonClick(lesson.order)}
                  >
                    {lesson.status === 'locked' && <img src={lock} alt="lock" />}
                    <h3>{lesson.order + '. ' + lesson.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CourseDetails course={course} />
        </>
      )}
    </div>
  )
}
