import { useState, useEffect, useRef } from "react"
import { IconButton } from "@mui/material"
import { CiSearch } from "react-icons/ci"
import { useNavigate } from "react-router-dom"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { getBiliVideoSearch } from "@/api/BiliVideo"
import { BiliSearchResult } from "@/types/bili/BiliSearch"
import useDebounce from "@/hooks/useDebounce"
import BMSearchPreview from "./BMSearchPreview"
import BMSearchClasses from "./BMSearch.module.css"
import useOutsideClick from "@/hooks/useOutsideClick"

const BMSearch = ({ className }: MergeWithDefaultProps) => {
  const [searchField, setSearchField] = useState("")
  const [searchResult, setSearchResult] = useState<BiliSearchResult[]>()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [isShow, setIsShow] = useOutsideClick(inputRef, previewRef)

  const handleSearch = (keyword: string) => {
    if (!keyword) return
    setIsShow(false)
    navigate(`/search?keyword=${keyword}`)
  }

  const debouncedSearchField = useDebounce(searchField, 200)

  const handleSearchFieldChange = (result: BiliSearchResult[]) => {
    setSearchResult(result)
  }

  useEffect(() => {
    if (debouncedSearchField) {
      getBiliVideoSearch({
        keyword: debouncedSearchField,
      })
        .then((res) => {
          console.log(res)
          handleSearchFieldChange(res.data.result || [])
        })
        .catch((err) => {
          console.log(err)
          handleSearchFieldChange([])
        })
    }
  }, [debouncedSearchField])

  return (
    <div className={`${className ?? ""} flex space-x-2 ${BMSearchClasses["bili-music-search"]}`}>
      <div className="input-wrapper relative h-[--searchbar-height] w-[--searchbar-width] border border-gray-300 rounded-xl flex justify-center items-center p-2">
        <input
          type="text"
          ref={inputRef}
          className="text-gray-500 h-full w-full text-sm bg-transparent outline-none"
          value={searchField}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchField)
            }
          }}
          onChange={(e) => {
            setSearchField(e.target.value)
          }}
        />
        {isShow && (
          <BMSearchPreview
            ref={previewRef}
            data={searchResult}
            onClick={handleSearch}
            className={`${BMSearchClasses["search-preview"]}`}
          />
        )}
      </div>
      <IconButton className="w-10" onClick={() => handleSearch(searchField)}>
        <CiSearch />
      </IconButton>
    </div>
  )
}

export default BMSearch
