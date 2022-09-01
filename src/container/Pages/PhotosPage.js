import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "../../basic/helpers";
import { getPhotosList } from "../../redux/actions/photosPageActions";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/PhotosPage.css";
import { Button, Image } from "react-bootstrap";
import ImageModal from "../Components/ImageModal";

const PhotosPage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
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
    if (photosList.length === 0) id && dispatch(getPhotosList());
  }, [id]);

  return (
    <div>
      <div className="d-flex overflow-hidden my-3">
        <div style={{ flex: 1 }}>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
        <div> Photo list</div>
        <div style={{ flex: 1 }}></div>
      </div>
      {photosListLoader ? (
        loader()
      ) : (
        <div className="photosListContainer mx-5 my-2">
          {showPhotosList(id)}
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
