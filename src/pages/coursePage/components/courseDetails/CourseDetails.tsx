import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './CourseDetails.styled.scss'
import { Course } from '../../../../types/courses/courses'
import { SkillsSection } from '../../../../ui-shared/skillsSection/SkillsSection'

interface Props {
  course: Course
}

export const CourseDetails = ({ course }: Props) => {
  const navigate = useNavigate()
  const { hash } = useLocation()
  const [currentTab, setCurrentTab] = useState(hash || '#description')
  const isDescriptionTab = currentTab === '#description'
  const isDetailsTab = currentTab === '#details'
  const isTagsTab = currentTab === '#tags'
  const date = new Date(course.launchDate)

  const handleTabChange = (e: React.MouseEvent) => {
    const id = (e.target as HTMLButtonElement).id
    navigate({ hash: `#${id}` })
    setCurrentTab(`#${id}`)
  }

  return (
    <div className="aboutWrapper">
      <div className="buttonsWrapper">
        <button id="description" className={isDescriptionTab ? 'active' : ''} onClick={handleTabChange}>
          Description
        </button>
        <button id="details" className={isDetailsTab ? 'active' : ''} onClick={handleTabChange}>
          Details
        </button>
        <button id="tags" className={isTagsTab ? 'active' : ''} onClick={handleTabChange}>
          Tags
        </button>
      </div>

      {isDescriptionTab && (
        <div className="tab">
          <p>{course.description}</p>
          {course.meta.skills && (
            <div className="skills">
              <SkillsSection skills={course.meta.skills} />
            </div>
          )}
        </div>
      )}
      {isDetailsTab && (
        <div className="tab">
          <div className="block">
            <h4>Launch Date: </h4>
            <p>{date.toDateString()}</p>
          </div>
          <div className="block">
            <h4>Rating: </h4>
            <p>{course.rating}</p>
          </div>
        </div>
      )}
      {isTagsTab && (
        <div className="tab">
          <p>{course.tags.join(', ').toUpperCase()}</p>
        </div>
      )}
    </div>
  )
}
