import { MultiselectOption } from '@/types'
import { useState } from 'react'
import Select from 'react-select'

interface Props {
  options: MultiselectOption[]
}

const Multiselect = (
  props: Props,
  updateValue: (value: MultiselectOption[]) => void,
): JSX.Element => {
  const { options } = props
  const [selectedOptions, setSelectedOptions] = useState<MultiselectOption[]>([])

  const onChange = (value: MultiselectOption[]): void => {
    setSelectedOptions(value)
    updateValue(value)
  }

  return (
    <div className="multiselect-container">
      <Select
        value={selectedOptions}
        options={options}
        onChange={onChange}
        closeMenuOnSelect={false}
        isMulti
        placeholder="Filtrer par catégorie"
      />
    </div>
  )
}

export default Multiselect
