import { useParams } from "react-router-dom"

export default function Detail() {
  const {mediaType, id} = useParams();
  return (
    <div>
      <p>Detail</p>
    </div>
  )
}
