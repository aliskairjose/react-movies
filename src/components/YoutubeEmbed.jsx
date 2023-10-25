/* eslint-disable react/prop-types */

export default function YoutubeEmbed({embedId}) {
  return (
    <div className="video-responsive">
    <iframe
      width="540"
      height="300"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
  )
}
