import { addProxyToUrl } from "@/utils/htmlUtil"

type MusicImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string
  placeholder?: React.ReactNode
}

const MusicImage = (props: MusicImageProps) => {
  const { src, placeholder } = props

  if (!src) return <>{placeholder}</>
  return <img {...props} src={addProxyToUrl(props.src ?? "")}></img>
}

export default MusicImage
