import React from "react";

const GoogleMap = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14247.28882186676!2d-81.0820612!3d26.7819368!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dbf4193e239ff7%3A0x7a4ab82e5e38e0fc!2sGray&#39;s%20and%20Danny&#39;s%20Meat%20Plant!5e0!3m2!1sen!2seg!4v1678807713463!5m2!1sen!2seg"
        width="100%"
        title="Gray's and Danny's Meat Plant"
        height="389px"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
