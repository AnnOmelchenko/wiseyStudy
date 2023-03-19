import './SkillsSection.styled.scss'

interface Props {
  skills: string[]
}

export const SkillsSection = ({ skills }: Props) => (
  <>
    <h5>Skills:</h5>
    <ul>
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </>
)
