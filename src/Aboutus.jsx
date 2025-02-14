import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary">About Us</h1>

      {/* About Us Image */}
      <img 
        src="about.jpg"  // Image is in the public folder
        alt="About Us" 
        className="img-fluid rounded shadow-lg mb-4"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <p className="text-muted">
        Welcome to our store! We are committed to delivering the best quality products at affordable prices.
      </p>
      <p>
        Our journey started in 2020 with a mission to bring premium products to our customers. 
        We believe in quality, trust, and customer satisfaction.
      </p>

      {/* Navigate to Contact Us Page */}
      <button 
        className="btn btn-primary mt-3"
        onClick={() => navigate("/contactus")}>Contact Us</button>
    </div>
  );
}

export default AboutUs;