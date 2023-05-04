import {} from 'react'

function Email(props) {
    const {id,email} = props;
  return (
    <div>
      <ul className=''>
        <li className=''>
            {email}
        </li>
      </ul>
    </div>
  )
}

export default Email
