import {
  POST_LESSONS_FAIL,
  POST_LESSONS_REQUEST,
  POST_LESSONS_SUCCESS,
  SELECT_VIDEO_FAIL,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
} from "./lessonTypes"
import axios from "axios"
import { parseCookies } from "nookies"

const cookies = parseCookies()

export const postLessons = (user, items, slug) => async (dispatch) => {
  try {
    // //console.log(cookies.token)

    dispatch({ type: POST_LESSONS_REQUEST })

    if (user._id) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/instructor/course/lesson/${slug}`,
        { ...items },
        config
      )
      // //console.log("data", data)

      dispatch({
        type: POST_LESSONS_SUCCESS,
        payload: data,
      })
    } else {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const { data } = await axios.post(
        `/api/instructor/course/lesson/${slug}`,
        { ...items },
        config
      )
      // //console.log("data", data)

      dispatch({
        type: POST_LESSONS_SUCCESS,
        payload: data,
      })
    }

    // //console.log("ster", items)
  } catch (error) {
    dispatch({
      type: POST_LESSONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const selectLesson = (video) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_VIDEO_REQUEST })

    const data = video

    dispatch({
      type: SELECT_VIDEO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SELECT_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
