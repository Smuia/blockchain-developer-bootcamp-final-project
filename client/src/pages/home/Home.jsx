import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import getImageForFundRaise from '../utils/get-image-for-fund-raise';
import AppContext from '../../app-context'; 
import { Folder2Open, PencilSquare } from 'react-bootstrap-icons';

import './Home.css';

export default function HomeWrapper() {

  const [fundRaiseForm, setFundRaiseForm] = useState({ title: '', goal: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [fundRaises, setFundRaises] = useState([]);
  
  const { fundRaise, account, web3 } = useContext(AppContext);

  const history = useHistory();

  /**
   * @description Function used to get the events
   */
  let getFundRaises = React.useCallback(async function getFundRaises() {
    return await fundRaise.methods.getHomeData().call()
  },[fundRaise.methods]
  );

  let navigateToFundRaise = React.useCallback(
    /**
   * @description Wrapper for keeping code DRY
   */
  function navigateToFundRaise(id) {
    history.push(`/fund-raise/${id}`)
  },[history]

  )


  /**
   * @description Setup the create event listener
   */
  let setupCreatePostListener = React.useCallback(function setupCreatePostListener() {
    fundRaise.events.EventCreated({}, (error, contractEvent) => {
      const { id } = contractEvent.returnValues
      navigateToFundRaise(id)
    })
  },[navigateToFundRaise,fundRaise.events]);

  
  useEffect(() => {
    (async function() {
      setupCreatePostListener()
      setFundRaises(await getFundRaises())
      setLoading(true)
    })()
  }, [setupCreatePostListener,getFundRaises])

  
  
  
  
  /**
   * @description On change handler for post modal
   * @param {Object} event
   */
  function onChange(event) {
    const { target } = event
    setFundRaiseForm(previousState => ({ ...previousState, [target.name]: target.value }))
  }

  /**
   * @description Submit handler for new post
   * @param {Object} event 
   */
  async function onSubmit(event) {
    event.preventDefault()
    const { title, goal, description } = fundRaiseForm
    await fundRaise.methods.createEvent(title, description, web3.utils.toWei(goal, 'ether')).send({ from: account })
  }

  

  return (
    loading ?
        <Home
        closeModal={() => setModalVisible(false)}
        onChange={onChange}
        onSubmit={onSubmit}
        modalVisible={modalVisible}
        openModal={() => setModalVisible(true)}
        fundRaises={fundRaises}
        onClickCard={id => navigateToFundRaise(id)}
      />
       :
      <div>loading...</div>
  )
}


export function Home({
  closeModal,
  onChange,
  onSubmit,
  modalVisible,
  openModal,
  fundRaises,
  onClickCard
}) {
  return (

    <Container fluid="lg" className="home">      
      <CreateModal
        onChange={onChange}
        onClose={closeModal}
        onSubmit={onSubmit}
        show={modalVisible}
      />
      
      <Row>
        <Col className="home-top-section">
          
          <div className="home-top-section-overlay"></div>
          <div className="home-button-header-container">
            <h2>WELCOME TO FUND-NET APP</h2>
            <p>A decentralized fund raising app running on the blockchain.</p>
            <Button className="createProjectBtn" onClick={openModal} variant="primary" size="lg"><PencilSquare/> Create a Campaign</Button>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col>
          <h2 className="pageTitle">Explore Our Campaigns</h2>
        </Col>
      </Row>
      <Row id="ExploreCampaigns"  style= {{marginBottom:"10px"}}>
        <small style= {{marginBottom:"4rem"}}><i>Our main mission and vision is to see
          the world where people come together for the best of each other. <br/>See the campaigns listed below.</i></small>

        {fundRaises.map((description) => (
          <Col key={description.id} style={{ marginBottom: '10px' }}>
            <FundRaise
              fundRaiseId={description.id}
              title={description.title}
              onClickCard={onClickCard}
            />
          </Col>
        ))}


      </Row>
    </Container>
  )
}

function FundRaise({
  fundRaiseId,
  title,
  onClickCard
}) {
  const fundRaiseImage = getImageForFundRaise(fundRaiseId)

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={fundRaiseImage}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button onClick={() => onClickCard(fundRaiseId)} variant="primary"><Folder2Open/> Learn More</Button>
      </Card.Body>
    </Card>
  )
}

function CreateModal({
  onChange,
  onClose,
  onSubmit,
  show
}) {

  return (
    <Modal show={show} onHide={onClose} id="myModal">
      <Modal.Header>
        <Container style={{textAlign:'center'}}>
          <Row>
            <Col><Modal.Title>Create Your Campaign</Modal.Title></Col>
          </Row>
          <Row>
            <Col> <small>This campaign will be displayed on the our campaign list</small></Col>
          </Row>
        </Container>
        
       
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Campaign Title</Form.Label>
            <Form.Control required type="text" name="title" onChange={onChange}/>
          </Form.Group>
          <Form.Group controlId="goal">
            <Form.Label>Goal (ETH)</Form.Label>
            <Form.Control required type="number" name="goal" placeholder="1" onChange={onChange}/>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Campaign Description</Form.Label>
            <Form.Control required as="textarea" name="description"  onChange={onChange}/>
          </Form.Group>
          <Button variant="secondary" onClick={onClose} className="me-1 mt-1">Close</Button>
          <Button variant="primary" type="submit" className="mt-1">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
