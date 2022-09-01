import API_URLS from "../../basic/constants/apiUrls";
import myAxios from "../../config/my-axios";

// get albums list
export function getAlbumsList() {
  const url = `/${API_URLS.albums_list}`;
  return myAxios.get(url).then((response) => {
    if (response.status === 200) {
      return {
        message: "Success",
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        data: "",
        error: "",
      };
    }
  });
}

// get user list
export function getUsersList() {
  const url = `/${API_URLS.users_list}`;
  return myAxios.get(url).then((response) => {
    if (response.status === 200) {
      return {
        message: "Success",
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        data: "",
        error: "",
      };
    }
  });
}
