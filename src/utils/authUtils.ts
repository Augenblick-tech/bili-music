export const getCookies = async () => {
  try {
    return await window.biliAuth.getCookies()
  } catch (error) {
    const err = error as Error
    console.log(err.name)
    const cookie = document.cookie
    return cookie
  }
}

export const getUserId = async () => {
  try {
    const cookies = await getCookies()
    const userId = cookies.match(/DedeUserID=(\d+)/)?.[1]
    return userId
  } catch (error) {
    const err = error as Error
    console.log(err.name)
    return ""
  }
}
