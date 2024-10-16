import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

const CourseCard = ({ id, title, description, featuredImage, videoLink, onClick }) => {
  const navigate = useNavigate();

  return (
    <Card className="Card caliber-font" style={{ padding: "10px" }}>
      <LazyLoadImage
        onClick={() => onClick({ id, title, description, videoLink })}
        loading="lazy"
        src={featuredImage}
        effect="blur"
        placeholderSrc={featuredImage}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "5px"
        }}
      />
      <CardBody className="Paddings" style={{ height: "100%", paddingBottom: "5px" }}>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText style={{ height: "40px" }}>
          {description.length > 40 ? `${description.slice(0, 40)}...` : description}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default CourseCard;
