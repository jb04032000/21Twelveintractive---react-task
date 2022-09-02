import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loader } from "../../basic/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/PhotosPage.css";
import { Button, Image } from "react-bootstrap";
import ImageModal from "../Components/ImageModal";

const PhotosPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const albumName = location.state.albumName;
  const photosData = location.state.photosData;
  const photosListLoader = useSelector(
    (state) => state.rootReducer.photosPageReducer.loading
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

  const showPhotosList = () => {
    return (
      photosData?.length > 0 &&
      photosData.map(
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

  return (
    <div>
      <div className="d-flex overflow-hidden my-3">
        <div style={{ flex: 1 }}>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
        <div> Photo list</div>
        <div style={{ flex: 1 }}></div>
      </div>
      {location.state?.albumName && (
        <div className="container albumTitle">{albumName} </div>
      )}
      {photosListLoader ? (
        loader()
      ) : (
        <div className="photosListContainer mx-5 my-2">{showPhotosList()}</div>
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
