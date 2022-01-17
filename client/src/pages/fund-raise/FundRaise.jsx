import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Col, Row, Button, Modal, Form, Alert } from 'react-bootstrap'
import getImageForFundRaise from '../utils/get-image-for-fund-raise'
import AppContext from '../../app-context'
import { CashStack, Gift } from 'react-bootstrap-icons'
//import NavBar from '../components/NavBar';

import './FundRaise.css'

export default function FundRaise({
  title,
  id,
  description,
  current,
  goal,
  closeModal,
  onChange,
  onSubmit,
  modalVisible,
  openModal,
  userIsFundRaiseCreator,
  withdraw,
  active
}) {
  return (
    <Container fluid="lg">
      
      <h1 className="mb-3">{title}</h1>
      {
        userIsFundRaiseCreator && active ?
          <Row>
            <Col className="p-2">
              <Button variant="danger" onClick={withdraw} size="lg"><CashStack/>  Withdraw Cash</Button>
            </Col>
          </Row> :
          null
      }
      <Row>
        <Col lg={6}>
          <div className="fund-raise-image" style={{ backgroundImage: `url("${getImageForFundRaise(id)}")` }}></div>
        </Col>
        {
          active ?
          <Col>
            <div className="fund-raise-side-panel mt-2 mt-lg-0">
              <div className="fund-raise-goal">{current} ETH raised of {goal} ETH</div>
              <div><p>We are glad that you are a great giver. If you wish to walk
                with us, click the button below and LET'S CHANGE THE WORLD!</p></div>
              <div className="fund-raise-donate-button-container">
                <Button variant="primary" onClick={openModal}><Gift/> <br/> Donate To This Project</Button>
              </div>
            </div>
          </Col> : 
          null
        }
      </Row>
      <br/>
      <h2>About {title} </h2>
      <p className="mt-3">{description}</p>
      <DonateModal
        onClose={closeModal}
        onChange={onChange}
        onSubmit={onSubmit}
        show={modalVisible}
      />
    </Container>
  )
}

function DonateModal({
  show,
  onClose,
  onSubmit,
  onChange
}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Donate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="amount">
            <Form.Label>Amount (ETH)</Form.Label>
            <Form.Control type="number" name="amount" onChange={onChange}/>
          </Form.Group>
          <Button variant="secondary" onClick={onClose} className="me-1 mt-1">Close</Button>
          <Button variant="primary" type="submit" className="mt-1">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export function FundRaiseWrapper() {
  const [donateForm, setDonateForm] = useState('')
  const [loading, setLoading] = useState(true)
  const [uiData, setUiData] = useState({})

  const { id } = useParams()

  const { dependencies } = useContext(AppContext)
  const { fundRaise, account, web3 } = dependencies

  //Define function to get fundraise data
  let getFundRaiseData = React.useCallback(async function getFundRaiseData() {
    return await fundRaise.methods.fundRaises(id).call()
  },[fundRaise.methods,id]);

  //Define setupDonateListener function
  let setupDonateListener= React.useCallback(function setupDonateListener() {
    fundRaise.events.Donated({}, (error, contractEvent) => {
      const { amount } = contractEvent.returnValues
      const updatedTotal = parseInt(amount) + parseInt(uiData.current) + ''
      setUiData(previousState => ({ ...previousState, current: updatedTotal, modalVisible: false }))
    })
  },[uiData,fundRaise.events]);

  //Define event listener for withdrawal
  let setupWithdrawListener= React.useCallback(function setupWithdrawListener() {
    fundRaise.events.Withdraw({}, (error, contractEvent) => {
      setUiData(previousState => ({ ...previousState, status: false }))
    })
  },[fundRaise.events])

  

  useEffect(() => {
    (async function() {
      setUiData(await getFundRaiseData())
    })()
  }, [getFundRaiseData])
  
  useEffect(() => {
    if (uiData.current) {
      setupDonateListener()
      setupWithdrawListener()
      setLoading(false)
    }
  }, [uiData, setupDonateListener, setupWithdrawListener])

  

  function onChange(event) {
    setDonateForm(event.target.value)
  }

  async function onSubmit(event) {
    event.preventDefault()
    await fundRaise.methods.donate(id).send({ from: account, value: web3.utils.toWei(donateForm, 'ether') })
  }

  async function withdraw() {
    await fundRaise.methods.withdraw(id).send({ from: account })
  }

  return (
    !loading ?
      <FundRaise
        title={uiData.title}
        id={id}
        description={uiData.description}
        current={web3.utils.fromWei(uiData.current, 'ether')}
        goal={web3.utils.fromWei(uiData.goal, 'ether')}
        closeModal={() => setUiData(previousState => ({ ...previousState, modalVisible: false }))}
        onChange={onChange}
        onSubmit={onSubmit}
        modalVisible={uiData.modalVisible}
        openModal={() => setUiData(previousState => ({ ...previousState, modalVisible: true }))}
        userIsFundRaiseCreator={uiData.creator === account}
        withdraw={withdraw}
        active={uiData.status}
      /> :
      <Alert key="info" variant="info">
      Loading project details ...
      </Alert>
  )
}