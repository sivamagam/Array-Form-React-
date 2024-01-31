import './App.css';
import { useState } from 'react';
import { Form, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [form, setForm] = useState({ detailsarray: [], submitError: "" });
  const [tableform, setTableForm] = useState({ detailsarray: [] });
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event, idx, name) => {
    const { value } = event.target;
    const arrdetails = form.detailsarray.map((each, index) =>
      index === idx ? { ...each, [name]: value } : each
    );
    setForm({ ...form, detailsarray: arrdetails, submitError: '' });
  };

  const handleAddRow = () => {
    setEditIndex(null);
    setShowModal(true);
    setForm({ detailsarray: [{ pname: "", pemail: "" }], submitError: "" })
  };

  const handleDeleteRow = (idx) => {
    const updatedRows = tableform.detailsarray.filter((_, index) => index !== idx);
    setTableForm({ ...tableform, detailsarray: updatedRows });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setForm({ detailsarray: [], submitError: "" });
  };

  const handleAddmore = () => {
    setForm({ ...form, detailsarray: [...form.detailsarray, { pname: '', pemail: '' }] })
  }

  const handleDeleteMore = (e, index) => {
    let arr = form.detailsarray.filter((each, idx) => idx !== index)
    setForm({ ...form, detailsarray: arr })
  }

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedTableArray = [...tableform.detailsarray];
      updatedTableArray[editIndex] = form.detailsarray[0];
      setTableForm({ ...tableform, detailsarray: updatedTableArray });
    } else {
      setTableForm({
        ...tableform,
        detailsarray: [...tableform.detailsarray, ...form.detailsarray]
      });
    }
    handleCloseModal();
  };

  return (
    <div className="App">
      <header className="text-center">
        <Button variant="primary" onClick={handleAddRow}>Add Row</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableform.detailsarray.map((data, idx) => (
              <tr key={idx}>
                <td>{data.pname}</td>
                <td>{data.pemail}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteRow(idx)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add/Edit Modal */}
        <Modal show={showModal} size={"lg"} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editIndex !== null ? 'Edit Row' : 'Add Row'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {form.detailsarray.map((each, idx) => (
              <div key={idx}>
                <div>details {idx + 1}</div>
                <Row className='d-flex'>
                  <Col md={5}>
                    <Form.Control
                      name="pname"
                      value={each.pname || ''}
                      placeholder='name'
                      onChange={(e) => handleInputChange(e, idx, "pname")}
                    />
                  </Col>
                  <Col md={5}>

                    <Form.Control
                      name="pemail"
                      placeholder='email'
                      value={each.pemail || ''}
                      onChange={(e) => handleInputChange(e, idx, "pemail")}
                    />
                  </Col>
                  <Col md={2}>
                    {idx ?

                      <Button variant="danger" onClick={(e) => handleDeleteMore(e, idx)}>Delete</Button> : null}
                  </Col>

                </Row>
              </div>


            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleAddmore}>Addmore</Button>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Modal.Footer>
        </Modal>
      </header>
    </div>
  );
}

export default App;
