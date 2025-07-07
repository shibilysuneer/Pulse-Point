
// import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitRegistrationDetails } from "../../redux/slices/hospital/hospitalSlice";
import type { AppDispatch, RootState } from "../../redux/store";

interface PrefilledState {
  name: string;
  email: string;
  registrationNumber: string;
  phone: string;
}

export default function HospitalRegister() {
  const location = useLocation();
const dispatch = useDispatch<AppDispatch>();  
const navigate = useNavigate()

const hospital = useSelector((state: RootState) => state.hospital.hospital?.hospital);
console.log(hospital?._id); 

  const { name = "", email = "", registrationNumber = "", phone = "" } = (location.state || {}) as PrefilledState;

  const [form] = Form.useForm();

  
  useEffect(() => {
    form.setFieldsValue({
      name,
      email,
      registrationNumber,
      phone
    });
  }, [name, email, registrationNumber, phone, form]);

  const handleFinish = async(values: any) => {
    console.log("Submitted data:", values);
    try {
      await dispatch(submitRegistrationDetails({
        licenseNumber:values.licenseNumber,
        website: values.website,
        address: values.address,
      })).unwrap();
       message.success("Submitted for verification");

    navigate("/hospital/home");
    } catch (err: any) {
       console.error("Submit Error:", err);
   
    message.error(err || "Failed to submiat");
    }
  };

  return (
  <Card
  title="Hospital Verification Registration"
  variant="outlined"
  style={{ maxWidth: 600, margin: "40px auto" }}
  styles={{
    header: {
      backgroundColor: "#fff5f5",
      color: "#a30000",
    },
  }}
>
      <Form
  form={form}
  layout="vertical"
  onFinish={handleFinish}
>

        <Form.Item
          label="Hospital Name"
          name="name"
          rules={[{ required: true, message: "Please enter hospital name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Registration Number"
          name="registrationNumber"
          rules={[{ required: true, message: "Please enter registration number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="License Number"
          name="licenseNumber"
          rules={[{ required: true, message: "Please enter license number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input />
        </Form.Item>

        <Card type="inner" title="Address">
          <Form.Item
            label="Street"
            name={['address', 'street']}
            rules={[{ required: true, message: "Please enter street" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name={['address', 'city']}
            rules={[{ required: true, message: "Please enter city" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="State"
            name={['address', 'state']}
            rules={[{ required: true, message: "Please enter state" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Zip Code"
            name={['address', 'zipCode']}
            rules={[{ required: true, message: "Please enter zip code" }]}
          >
            <Input />
          </Form.Item>
        </Card>

        {hospital?.status !== "pending" && (
  <Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      block
      style={{ backgroundColor: "#d32f2f", borderColor: "#d32f2f" }}
    >
      Submit for Verification
    </Button>
  </Form.Item>
 )} 

        
      </Form>
    </Card>
  );
}
