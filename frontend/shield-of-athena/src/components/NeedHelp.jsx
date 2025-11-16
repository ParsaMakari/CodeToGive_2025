import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/About.css";

export default function NeedHelp() {
  return (
    <Card className="about-card">
      <Card.Header as="h3">Ressources</Card.Header>
      <Card.Body>
        <Card.Title style={{}}>
          Which of the above best describes your situation?
        </Card.Title>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>It is an emergency situation</Accordion.Header>
            <Accordion.Body>
              <div style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
                <section role="alert" aria-live="assertive">
                  <p>
                    <strong>Call 9-1-1 immediately.</strong>
                  </p>
                  <p>
                    <a href="tel:911">Call 9-1-1</a>
                  </p>
                </section>

                <section>
                  <h4 style={{ fontSize: "0.95rem", marginTop: "1rem" }}>
                    Conjugal violence — your rights and help
                  </h4>

                  <p>
                    Conjugal (domestic) violence is illegal in Canada. You have
                    the right to live in a violence-free home. The police are
                    trained to respond to violent situations and will not blame
                    you.
                  </p>

                  <h5 style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
                    Get immediate help (Québec)
                  </h5>

                  <p>
                    S.O.S. Violence conjugale — anonymous, free and
                    confidential:
                  </p>

                  <p>
                    <a href="tel:+15148739010">514-873-9010</a>
                    <br />
                    <a href="tel:+18003639010">1-800-363-9010</a>
                  </p>

                  <p>
                    This service is available throughout Québec and can help you
                    get to safety.
                  </p>
                </section>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>I need emergency shelter</Accordion.Header>
            <Accordion.Body>
              <div style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
                <section>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                    Emergency shelter (Shield of Athena)
                  </h3>

                  <p>
                    If you are a victim of family or conjugal violence, the
                    Shield of Athena can offer you and your children emergency
                    shelter. From Monday to Friday, 9 am to 5 pm, you can be
                    referred to our shelter, Athena’s House, where you may stay
                    for up to two months.
                  </p>

                  <p>
                    Please call our Montreal office at{" "}
                    <a href="tel:5142748117">514-274-8117</a> or{" "}
                    <a href="tel:18772748117">1-877-274-8117</a>,<br />
                    or our Laval office at{" "}
                    <a href="tel:4506886584">450-688-6584</a>.
                  </p>

                  <h4 style={{ fontSize: "0.95rem", marginTop: "1rem" }}>
                    Languages available at the shelter
                  </h4>

                  <p>
                    Arabic, Armenian, Creole, English, Farsi, French, Greek,
                    Hindi, Italian, Polish, Punjabi, Romanian, Russian, Spanish,
                    Turkish, Urdu
                  </p>

                  <p>
                    <a href="#">Click here</a> to see what services are
                    available at the shelter.
                  </p>

                  <h4 style={{ fontSize: "0.95rem", marginTop: "1rem" }}>
                    Outside office hours
                  </h4>

                  <p>
                    Please call S.O.S. Violence conjugale:
                    <br />
                    <a href="tel:5148739010">514-873-9010</a>
                    <br />
                    <a href="tel:18003639010">1-800-363-9010</a>
                  </p>

                  <p>
                    This is an anonymous, free and confidential service
                    available throughout Québec designed to help victims of
                    conjugal violence. You and your children can be referred to
                    an emergency shelter where you will be safe.
                  </p>
                </section>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="2">
            <Accordion.Header>I need someone to talk to</Accordion.Header>
            <Accordion.Body>
              <div style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
                <section>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                    Counselling and individual support
                  </h3>

                  <p>
                    In addition to our emergency shelter, Athena’s House, we can
                    offer you counselling and other individual support services
                    in the following languages:
                  </p>

                  <p>
                    Arabic, Armenian, Creole, English, Farsi, French, Greek,
                    Hindi, Italian, Punjabi, Romanian, Russian, Spanish,
                    Turkish, Urdu
                  </p>

                  <p>
                    We also offer a variety of support groups where you can
                    share your story and listen to others in a confidential and
                    secure environment.
                  </p>

                  <p>
                    Please contact us from Monday to Friday, 9 am to 5 pm at our
                    Montreal office at <a href="tel:5142748117">514-274-8117</a>{" "}
                    or <a href="tel:18772748117">1-877-274-8117</a>,<br />
                    or our Laval office at{" "}
                    <a href="tel:4506886584">450-688-6584</a>,<br />
                    or email us at{" "}
                    <a href="mailto:bouclierdathena@bellnet.ca">
                      bouclierdathena@bellnet.ca
                    </a>
                    .
                  </p>
                </section>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              My children are suffering from the situation
            </Accordion.Header>
            <Accordion.Body>
              <div style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
                <section>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                    Support for children and teens
                  </h3>

                  <p>
                    Exposure to violence may be affecting your children in a
                    number of ways, ranging from emotional instability to severe
                    behavioural problems.
                  </p>

                  <p>
                    We offer confidential support groups for children and teens
                    who have witnessed domestic violence. These groups provide a
                    safe environment where children and teens have the
                    opportunity to meet others with similar experiences.
                  </p>

                  <p>
                    If you think your children could benefit from these groups,
                    please contact us from Monday to Friday, 9 am to 5 pm at our
                    Montreal office at <a href="tel:5142748117">514-274-8117</a>{" "}
                    or <a href="tel:18772748117">1-877-274-8117</a>,<br />
                    or our Laval office at{" "}
                    <a href="tel:4506886584">450-688-6584</a>,<br />
                    or email us at{" "}
                    <a href="mailto:bouclierathena@bellnet.ca">
                      bouclierathena@bellnet.ca
                    </a>
                    .
                  </p>
                </section>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
    <Accordion.Header>I am no longer with my partner</Accordion.Header>
    <Accordion.Body>
      <div style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
        <p>
          Notify your neighbours and your landlord that your partner does not live with you anymore...
        </p>
        <ul>
          <li>Change locks if you haven’t moved.</li>
          <li>Secure your windows.</li>
          <li>Get a confidential phone number.</li>
          <li>Arrange meetings with ex-partner in public places.</li>
          <li>Establish children’s visitation in a neutral place.</li>
          <li>Inform school/daycare staff who can pick up your children.</li>
          <li>Have a lawyer accompany you to court if needed.</li>
          <li>Know your right to call police if harassed.</li>
        </ul>
      </div>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="5">
    <Accordion.Header>I am still with my partner</Accordion.Header>
    <Accordion.Body>
      <div style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
        <ul>
          <li>Make a safety plan: where to go in danger.</li>
          <li>Agree on a code with someone you trust.</li>
          <li>Open a separate bank account.</li>
          <li>Keep phone numbers of shelters nearby.</li>
          <li>Know signs of escalation and leave early.</li>
          <li>Call police if in danger (911).</li>
          <li>Discuss plan with children if safe.</li>
          <li>Do not leave without children; get police escort if needed.</li>
        </ul>
      </div>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="6">
    <Accordion.Header>I am preparing a departure kit</Accordion.Header>
    <Accordion.Body>
      <div style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
        <ul>
          <li>Legal documents – marriage certificate, deeds, mortgage, lease</li>
          <li>Bank books, credit/debit cards</li>
          <li>Social insurance and healthcare cards</li>
          <li>Immigration papers</li>
          <li>Birth certificates for you and your children</li>
          <li>Keys for home and car</li>
          <li>Medication for you and children</li>
          <li>Money</li>
          <li>Clothing</li>
          <li>Favourite toys/blankets for children</li>
          <li>Cherished items for yourself</li>
          <li>List of important phone numbers</li>
        </ul>
      </div>
    </Accordion.Body>
  </Accordion.Item>
        </Accordion>
      </Card.Body>
      <Card.Footer
        style={{
          fontSize: "1rem", // larger font
          fontWeight: "bold", // bold text
          color: "#333", // dark red color, you can change as needed
          backgroundColor: "transparent",
          borderTop: "none",
        }}
      >
        Remember that you are not alone: wife abuse is a crime in Canada.
      </Card.Footer>
    </Card>
  );
}
