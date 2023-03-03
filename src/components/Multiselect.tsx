import { SelectOption } from '@/types'
import { useState } from 'react'
import Select from 'react-select'

interface Props {
  options: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

const Multiselect = (props: Props): JSX.Element => {
  const { options, onChange: updateValue } = props
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

  const onChange = (value: SelectOption[]): void => {
    setSelectedOptions(value)
    updateValue(value)
  }

  return (
    <div className="sm:w-96 w-full">
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
