import React from 'react';
import { FormLabel, Icon, InputGroup, Button } from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';

interface FileUploadProps {
  id: string
  name: string
  label?: string
  type?: string
  accept?: string
  onChange:  (e: any) => void
}

const FileUpload = ({
  id,
  name,
  label,
  type,
  accept,
  onChange,
}: FileUploadProps) => {
  return (
    <div>
      <FormLabel
        htmlFor={id}
        className="text-gray-700 dark:text-white">
        {label}
      </FormLabel>
      <Button leftIcon={<Icon as={FiFile} />}>
        Upload
        <input
          id={id}
          name={name}
          type={type}
          className="opacity-0 absolute left-0 max-w-[110px]"
          accept={accept}
          onChange={onChange}
        />
      </Button>
    </div>
  )
}

export default FileUpload

FileUpload.defaultProps = {
  label: '',
  placeholder: '',
  type: 'file',
  accept: 'image/*',
  onchange: () => {},
}