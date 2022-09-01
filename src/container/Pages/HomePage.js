import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "../../basic/helpers";
import {
  getAlbumData,
  getUsersList,
} from "../../redux/actions/homePageActions";
import Accordion from "react-bootstrap/Accordion";
import "../../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

const accordion = (id, title, body) => {
  return (
    <Accordion>
      <Accordion.Item eventKey={id}>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>{body}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersListLoader = useSelector(
    (state) => state.rootReducer.homePageReducer?.userLoading
  );
  const albumListLoader = useSelector(
    (state) => state.rootReducer.homePageReducer?.albumLoading
  );
  const usersList = useSelector(
    (state) => state.rootReducer.homePageReducer?.users
  );
  const albumsList = useSelector(
    (state) => state.rootReducer.homePageReducer?.albums
  );

  const handleRouteChange = (payload) => {
    navigate("/photos", { state: payload });
  };

  const showUsersAlbum = (userId) => {
    return albumsList.map(
      (data) =>
        Number(data?.userId) === userId && (
          <div key={data?.id} className="UsersAlbumList">
            <li
              onClick={() =>
                handleRouteChange({ albumId: data.id, albumName: data.title })
              }
            >
              {data?.title}
            </li>
          </div>
        )
    );
  };

  const getUsersAlbumData = (userId) => {
    let UsersAlbumArray = [];
    albumsList?.length > 0 &&
      albumsList.forEach((ele) => {
        UsersAlbumArray.indexOf(Number(ele?.userId)) === -1 &&
          UsersAlbumArray.push(Number(ele?.userId));
      });

    return albumListLoader ? (
      loader()
    ) : UsersAlbumArray?.length > 0 &&
      UsersAlbumArray.includes(Number(userId)) ? (
      showUsersAlbum(Number(userId))
    ) : (
      <div>No Data Found</div>
    );
  };
  const showUsersList = () => {
    return (
      usersList?.length > 0 &&
      usersList.map((data) => (
        <div key={data?.id} className="mx-5 my-2">
          {accordion(
            data?.id,
            data?.name,
            data?.id && <ul>{getUsersAlbumData(data.id)}</ul>
          )}
        </div>
      ))
    );
  };

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getAlbumData());
  }, []);

  return (
    <div>
      <p>Users list</p>
      {usersListLoader ? loader() : showUsersList()}
    </div>
  );
};

export default React.memo(HomePage);
