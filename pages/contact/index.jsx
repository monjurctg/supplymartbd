import { Button, Card, Col, Image, Input, Row } from "antd";
import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        <Row gutter={[8, 8]} style={{ margin: 0 }}>
          <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ height: "100%" }}>
            <Card className="flex flexColumn" style={{ height: "100%" }}>
              {/* <Image
                width={160}
                src={
                  "https://wholesalecart.com/static/media/contact.3ac180d0.svg"
                }
                alt=""
              /> */}
              <h3>Contact Info:</h3>
              <div className="footer-contact" style={{ fontSize: "14px" }}>
                <div className="mb05 flexRow align-center">
                  <span>Address:</span>
                  <br />
                  <span>
                  Floor: 6 , House: 6/30, Eastern plaza( Hatirpool),
                    Dhaka,Bangladesh
                  </span>
                </div>

                <div className="mb05 flexRow align-center">
                  <span>Phone: </span>
                  <br />
                  <a href="tel:+8801311-881510" className="primaryTextColor">
                    +88 01311-881510
                  </a>


                </div>
              </div>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Card
              className="table"
              style={{ border: "1px solid #dedede", height: "100%" }}
              bodyStyle={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <label htmlFor="name">Name</label>
                  <Input
                    placeholder="Name"
                    style={{ marginTop: "0.5rem" }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <label htmlFor="name">Phone</label>
                  <Input
                    placeholder="Phone"
                    style={{ marginTop: "0.5rem" }}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Col>
                <Col xs={{ span: 24 }}>
                  <label htmlFor="name">Message</label>
                  <Input.TextArea
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    rows={4}
                    placeholder="Message"
                    style={{ marginTop: "0.5rem" }}
                  />
                </Col>
                <Col xs={{ span: 24 }}>
                  <a
                    href={`mailto:info@onesalemart.com?subject=${name + " " + phone
                      }&body=${message}`}
                  >
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      size="large"
                    >
                      Send
                    </Button>
                  </a>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Card style={{ margin: ".25rem", marginTop: "0.5rem" }}>
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.7371949325716!2d90.40190721498348!3d23.86346418453374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5c02a3e7a67%3A0xf9340f50ab8f3ded!2sOnesaleMart!5e0!3m2!1sen!2sbd!4v1633245543912!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "8px", overflow: "hidden" }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
