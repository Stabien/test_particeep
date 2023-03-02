import { MultiselectOption } from '@/types'
import { useState, useEffect } from 'react'

interface Props {
  options: MultiselectOption[]
}

const Multiselect = (props: Props): JSX.Element => {
  const { options } = props
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const updateOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const currentOption = (e.target as HTMLSelectElement).value

    if (selectedOptions.includes(currentOption)) {
      setSelectedOptions(selectedOptions.filter((option) => currentOption !== option))
    } else {
      setSelectedOptions([...selectedOptions, currentOption])
    }
  }

  const renderOptions = options.map((option, index): JSX.Element => {
    return (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    )
  })

  const renderSelectedOptions = selectedOptions.map((option, index) => {
    return <span key={index}>{option}</span>
  })

  return (
    <div className="multiselect-container">
      <div className="tag-container">{renderSelectedOptions}</div>
      <select onChange={(e) => updateOption(e)}>{renderOptions}</select>
    </div>
  )
}

export default Multiselect
