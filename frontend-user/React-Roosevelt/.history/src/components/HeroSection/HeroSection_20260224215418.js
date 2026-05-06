.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.hero-overlay {
  position: relative;
  z-index: 2;
  width: 80%;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 15px;
  }
}

.btn-custom {
  background-color: $primary;
  color: $color_texto;
  border-radius: 999px;
  padding: 12px 32px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $btn-hover-bg;
    color: $color_texto;
  }
}