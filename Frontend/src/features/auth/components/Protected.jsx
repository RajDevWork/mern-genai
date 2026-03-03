import { useAuth } from '../Hooks/useAuth'
import { Navigate } from 'react-router'

const Protected = ({children}) => {
    const {IsLoading,User} = useAuth()

    if(IsLoading){
        return <main><h1>Loading....</h1></main>
    }
    if(!User){
      // console.log('Okay')
      return <Navigate to="/login" />
    }
  return (
    children
  )
}

export default Protected