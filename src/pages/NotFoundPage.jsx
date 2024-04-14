import { Link } from "react-router-dom"


const NotFoundPage = () => {
  return (
    <div>
          <h1>The page you visited does not exist</h1>
          <Link to="/">Go Home</Link>
    </div>
  )
}

export default NotFoundPage