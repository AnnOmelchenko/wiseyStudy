import HoverVideoPlayer from 'react-hover-video-player'
import { Link } from 'react-router-dom'

import './CourseSection.styled.scss'

import { RoutesManager } from '../../../../routesManager'
import Star from '../../../../ui-base/svg/Star.svg'
import { SkillsSection } from '../../../../ui-shared/skillsSection/SkillsSection'

interface Props {
  id: string
  title: string
  previewImage: string
  lessonsCount: number
  skills?: string[]
  videoSrc?: string
  rating: number
}

export const CourseSection = ({ id, title, previewImage, lessonsCount, skills, videoSrc, rating }: Props) => {
  return (
    <Link to={RoutesManager.view.root.getURL({ id })} className="course">
      <div>
        <div className="video">
          <HoverVideoPlayer
            videoId={videoSrc}
            videoSrc={videoSrc}
            pausedOverlay={
              <img
                src={previewImage + '/cover.webp'}
                alt={title}
                style={{
                  width: '360px',
                  height: '260px',
                  objectFit: 'cover',
                }}
              />
            }
          />
        </div>
        <div className="footer">
          <div className="rating">
            <p>Rating: {rating}</p>
            <img src={Star} alt="star" />
          </div>
          <p>Lessons: {lessonsCount}</p>
        </div>
      </div>
      <div className="descriptionWrapper">
        <div>
          <h4>{title}</h4>
          {skills && <SkillsSection skills={skills} />}
        </div>
      </div>
    </Link>
  )
}
