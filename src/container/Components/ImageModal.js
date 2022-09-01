import { Modal, Button, Image } from "react-bootstrap";

export default function ImageModal(props) {
  const {
    modalData: { src, title },
    ...rest
  } = props;
  return (
    <Modal
      {...rest}
      dialogClassName="modal-90w"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title && title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image width="100%" alt={title && title} src={src && src} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
