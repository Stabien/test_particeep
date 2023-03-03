import { MultiselectOption } from '@/types'
import { useState } from 'react'
import Select from 'react-select'

interface Props {
  options: MultiselectOption[]
  onChange: (value: MultiselectOption[]) => void
}

const Multiselect = (props: Props): JSX.Element => {
  const { options, onChange: updateValue } = props
  const [selectedOptions, setSelectedOptions] = useState<MultiselectOption[]>([])

  const onChange = (value: MultiselectOption[]): void => {
    setSelectedOptions(value)
    updateValue(value)
  }

  return (
    <div>
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
