import Hls from 'hls.js'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import './CoursesList.styled.scss'

import { usePreviewCourses } from '../../../../api/courses/queries/usePreviewCourses'
import { Spinner } from '../../../../ui-base/spinner/Spinner'
import { CourseSection } from '../courseSection/CourseSection'

export const CoursesList = () => {
  const { data, isLoading } = usePreviewCourses()
  const [itemOffset, setItemOffset] = useState(0)
  const sortedCourses = data?.courses.sort((a, b) => b.rating - a.rating)
  const endOffset = itemOffset + 10
  const currentItems = sortedCourses?.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(sortedCourses?.length! / 10)

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 10) % sortedCourses?.length!
    setItemOffset(newOffset)
  }

  useEffect(() => {
    if (currentItems) {
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        const videoSrc = video.id
        if (Hls.isSupported()) {
          const hls = new Hls()
          hls.loadSource(videoSrc)
          hls.attachMedia(video)
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc
        }
      })
    }
  }, [currentItems])

  if (isLoading) {
    return (
      <div className="coursesSpinner">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="listWrapper">
      {data?.courses.length &&
        currentItems!.map(course => (
          <CourseSection
            key={course.id}
            id={course.id}
            title={course.title}
            previewImage={course.previewImageLink}
            lessonsCount={course.lessonsCount}
            skills={course.meta.skills}
            videoSrc={course.meta.courseVideoPreview?.link}
            rating={course.rating}
          />
        ))}
      <ReactPaginate
        containerClassName="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="<"
      />
    </div>
  )
}
