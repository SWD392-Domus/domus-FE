import React from 'react'

type Props = {}

const CreateUser: React.FC = (props: Props) => {
  return (
    <div>
        <h1 className="font-bold text-xl mt-2">Create User</h1>
        <h1 className="text-sm text-slate-500">
            Fill in some information about the user.
        </h1>
    </div>
  )
}

export default CreateUser