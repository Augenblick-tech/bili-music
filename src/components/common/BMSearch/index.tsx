import { FC, useState } from "react"
import { FCProps } from "@/types/FCProps"
import { useAtom } from "jotai"
import { getBiliVideoSearch } from "@/api/BiliVideo"
import { BiliSearchAtom } from "@/stores/BiliVideo"
import { IconButton } from "@mui/material"
import { CiSearch } from "react-icons/ci"
import { useNavigate } from "react-router-dom"

const BMSearch: FC<FCProps> = ({ className }) => {
  const [searchField, setSearchField] = useState("")
  const [, setSearchResult] = useAtom(BiliSearchAtom)
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!searchField) return
    // const result = await getBiliVideoSearch(searchField)
    // console.log(result)
    // setSearchResult(result.data)
    // console.log('first search result: ', result.data.result[0])
    navigate(`/search?keyword=${searchField}`)
  }

  return (
    <div className={`${className} flex space-x-2`}>
      <div className="input-wrapper h-9 w-48 border border-gray-300 rounded-xl flex justify-center items-center overflow-hidden p-2">
        <input
          type="text"
          className="text-gray-500 h-full w-full bg-transparent outline-none"
          value={searchField}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          onChange={(e) => {
            setSearchField(e.target.value)
          }}
        />
      </div>
      <IconButton onClick={handleSearch}>
        <CiSearch />
      </IconButton>
    </div>
  )
}

export default BMSearch
