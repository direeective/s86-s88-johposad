import { Row, Col, Card, Button } from 'react-bootstrap';

export default function Highlights() {
  return (
    <Row className="my-4">
      <Col xs={12} md={6} lg={4} className="mb-4">
        <Card className="shadow-sm border-0">
          <Card.Img variant="top" src="/images/profile-pages.jpg" alt="Profile pages" />
          <Card.Body>
            <Card.Title>
              <h2>Profile Pages</h2>
            </Card.Title>
            <Card.Text>
              Pariatur adipisicing aute do amet dolore cupidatat. Eu labore aliqua eiusmod commodo occaecat mollit ullamco labore minim. Minim irure fugiat anim ea sint consequat fugiat laboris id. Lorem elit irure mollit officia incididunt ea ullamco laboris excepteur amet. Cillum pariatur consequat adipisicing aute ex.
            </Card.Text>
            <Button variant="primary">Read More</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={4} className="mb-4">
        <Card className="shadow-sm border-0">
          <Card.Img variant="top" src="/images/like-posts.jpg" alt="Like the posts" />
          <Card.Body>
            <Card.Title>
              <h2>Like the Posts</h2>
            </Card.Title>
            <Card.Text>
              Ex Lorem cillum consequat ad. Consectetur enim sunt amet sit nulla dolor exercitation est pariatur aliquip minim. Commodo velit est in id anim deserunt ullamco sint aute amet. Adipisicing est Lorem aliquip anim occaecat consequat in magna nisi occaecat consequat et. Reprehenderit elit dolore sunt labore qui.
            </Card.Text>
            <Button variant="primary">Read More</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} lg={4} className="mb-4">
        <Card className="shadow-sm border-0">
          <Card.Img variant="top" src="/images/join-community.jpg" alt="Join Our Community" />
          <Card.Body>
            <Card.Title>
              <h2>Join Our Community</h2>
            </Card.Title>
            <Card.Text>
              Minim nostrud dolore consequat ullamco minim aliqua tempor velit amet. Officia occaecat non cillum sit incididunt id pariatur. Mollit tempor laboris commodo anim mollit magna ea reprehenderit fugiat et reprehenderit tempor. Qui ea Lorem dolor in ad nisi anim. Culpa adipisicing enim et officia exercitation adipisicing.
            </Card.Text>
            <Button variant="primary">Read More</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
