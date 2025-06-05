import React, { useState}  from 'react'
import apiClient from '../../service/ApiClient'
export default async function Signup() {
		const [name, setName]=useState('')

	await apiClient.signup(name,email,password)
  return (
	<div>Signup</div>
  )
}
