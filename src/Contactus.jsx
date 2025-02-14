import { useNavigate } from "react-router-dom";

function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary">📞 Contact Us</h1>

      {/* Contact Numbers */}
      <div className="mt-4">
        <p className="fs-5">☎️ <strong>+91 6678573958</strong></p>
        <p className="fs-5">☎️ <strong>+91 9876544125</strong></p>
        <p className="fs-5">☎️ <strong>+91 7545679773</strong></p>
      </div>
    </div>
  )
}
export default ContactUs;