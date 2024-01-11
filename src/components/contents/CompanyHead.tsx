import React from 'react'

type Props = {
  code: string;
}

const CompanyHead = (props: Props) => {

  const { code } = props;

  return (
    <div>{code}</div>
  )
}

export default CompanyHead;