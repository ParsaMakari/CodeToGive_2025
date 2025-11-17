import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/About.css";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";

export default function About({}) {
  const [faq, setFaq] = useState([]);
  const [subject, setSubject] = useState("who");

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/faq/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFaq(data);
      } catch (error) {
        console.error("Failed to fetch FAQ:", error);
      }
    };

    fetchFaq();
  }, []);
  return (
    <Card className="about-card">
      <Card.Header as="h3">About The Shield Of Athena</Card.Header>
      <Card.Body>
        {subject === "who" && (
          <>
            <Card.Title>Who we are?</Card.Title>
            <Card.Text>
              <p>
                The Shield of Athena is a non-profit organization for victims of
                family violence. We offer emergency shelter and professional
                services to women and their children. Our support, intervention
                and prevention services are culturally and linguistically
                adapted to meet the needs of many of Montreal's major
                ethnocultural communities.
              </p>
            </Card.Text>
            <Card.Text>
              <p>
                We offer three integrated services:
                <ul>
                  <li>
                    Our offices, located in Laval and Montréal, offer
                    multilingual services by professional social workers,
                    trained cultural intermediaries and supervised law students
                  </li>
                  <li>
                    Our shelter, Athena’s House, provides emergency housing to
                    women and their children 24/7, in a safe and empowering
                    environment
                  </li>
                  <li>
                    Across Montreal and Laval, our community outreach program
                    provides information to men and women in their own languages{" "}
                  </li>
                </ul>
                <strong>The Shield is a registered charity.</strong>
              </p>
            </Card.Text>
            <a
              className="about-nav-right"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSubject("vision");
              }}
            >
              Vision, mission and values
            </a>
          </>
        )}
        {subject === "vision" && (
          <>
            <Card.Title>Vision, mission and values</Card.Title>
            <Card.Text>
              <strong>Our Vision</strong>
              <br />{" "}
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;To play a leadership role in helping
                women and their children, as well as communities, break the
                cycle of psychological, emotional, verbal, economic and physical
                violence.
              </p>
            </Card.Text>
            <Card.Text>
              <strong>Our Mission</strong>
              <br />
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;The Shield is a charitable organization
                offering education, professional support, intervention and
                prevention services that are culturally and linguistically
                adapted to meet the needs of women, their children and
                ethnocultural communities.
              </p>
            </Card.Text>
            <Card.Text>
              <strong>Our Values</strong>
              <br />
              <ul>
                <li>A warm welcoming environment</li>
                <li>
                  Empower women by providing respect and support in their time
                  of need{" "}
                </li>
                <li>Promote an interdisciplinary and multisectoral approach</li>
                <li>Ensure the security and confidentiality of all clients </li>
                <li>
                  Provide equal access to services and issues of social justice{" "}
                </li>
                <li>
                  Act with integrity and professionalism in our interventions{" "}
                </li>
                <li>
                  A culturally sensitive approach that stresses violence is
                  unacceptable and non-negotiable irrespective of ethnic,
                  educational, religious, and socioeconomic background{" "}
                </li>
              </ul>
            </Card.Text>
            <a
              className="about-nav-left"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSubject("who");
              }}
            >
              Who we are?
            </a>
            <a
              className="about-nav-right"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSubject("FAQ");
              }}
            >
              FAQ
            </a>
          </>
        )}
        {subject === "FAQ" && (
          <>
            <div className="faq-container">
              <Accordion>
                {faq.map((item, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
             <a
              className="about-nav-left"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSubject("vision");
              }}
            >
                Vision, mission and values
            </a> 
          </>
        )}
      </Card.Body>
    </Card>
  );
}
