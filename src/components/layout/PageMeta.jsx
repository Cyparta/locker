import React from "react";
import { Helmet } from "react-helmet";

const PageMeta = ({ title, desc, name="Papineau Locker",  type="product"}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
};

export default PageMeta;
