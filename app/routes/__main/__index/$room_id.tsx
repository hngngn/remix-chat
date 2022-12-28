import { useParams } from "@remix-run/react"

const Home = () => {
    const params = useParams()
    return <div>{params.room_id}</div>
}

export default Home
