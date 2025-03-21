import { useState, useEffect } from "react";
import "./styles/gallery.css";
import images from "./assets/gallery/gallery.js";

const IMAGES_PER_PAGE = 9;

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  useEffect(() => {
    if (selectedImage || selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage, selectedVideo]);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const displayedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  return (
    <div className="section-gallery">
      <div className="gallery-container-general">
        <h2>Galería</h2>
        <p>
          Algunos de los mejores momentos capturados para que podamos
          atesorarlos en nuestra memoria. <br /> ¡Gracias por ser parte de este
          gran evento!
        </p>
        <div className="gallery-container">
          <div className="gallery-grid">
            {displayedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index}`}
                className="gallery-image"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1 ? "page-button active" : "page-button"
                }
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Full Screen Image Dialog */}
          {selectedImage && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedImage(null)}
            >
              <div className="modal-content-gallery">
                <img
                  src={selectedImage}
                  className="modal-image"
                  alt="Full view"
                />
              </div>
              <button
                className="close-button"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() =>
          setSelectedVideo("https://www.youtube.com/embed/Pug7pERktwk")
        }
        className="btn-video"
        style={{ margin: "2rem auto" }}
      >
        Ver video memoria
      </button>

      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content-gallery">
            <iframe
              className="iframe-video"
              src="https://www.youtube.com/embed/Pug7pERktwk?si=yl5tDiOSK1DurwHw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <button
            className="close-button"
            onClick={() => setSelectedVideo(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
