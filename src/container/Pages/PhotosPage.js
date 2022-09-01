import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "../../basic/helpers";
import { getPhotosList } from "../../redux/actions/photosPageActions";
import { useLocation } from "react-router-dom";
import "../../styles/PhotosPage.css";
import { Image } from "react-bootstrap";
import ImageModal from "../Components/ImageModal";

const PhotosPage = () => {
  const location = useLocation();
  const locationStateData = location?.state;
  const dispatch = useDispatch();
  const photosListLoader = useSelector(
    (state) => state.rootReducer.photosPageReducer.loading
  );
  const photosList = useSelector(
    (state) => state.rootReducer.photosPageReducer.photos
  );
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    src: "",
    title: "",
  });

  const handleImageClick = (src, title) => {
    setModalShow(true);
    setModalData({
      src,
      title,
    });
  };
  const handleModalHide = () => {
    setModalShow(false);
    setModalData({
      src: "",
      title: "",
    });
  };

  const showPhotosList = (albumId) => {
    return (
      photosList?.length > 0 &&
      photosList
        .filter((data) => Number(data?.albumId) === Number(albumId))
        .map(
          (data) =>
            data?.thumbnailUrl && (
              <div key={data?.id} className="mx-5 my-2 photosListUI">
                <Image
                  alt={data?.title && data.title}
                  src={data.thumbnailUrl}
                  onClick={() =>
                    data.url && handleImageClick(data.url, data.title)
                  }
                />
              </div>
            )
        )
    );
  };

  useEffect(() => {
    locationStateData && dispatch(getPhotosList());
  }, [locationStateData]);

  return (
    <div>
      <p>
        Photo list of
        <span className="albumTitle"> {locationStateData?.albumName} </span>
      </p>
      {photosListLoader ? (
        loader()
      ) : (
        <div className="photosListContainer mx-5 my-2">
          {showPhotosList(locationStateData?.albumId)}
        </div>
      )}
      <ImageModal
        show={modalShow}
        modalData={modalData}
        onHide={handleModalHide}
      />
    </div>
  );
};

export default PhotosPage;
