import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact, resetContactState } from "../redux/slices/contactSlice";

// shadcn/ui components
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Loader from "../components/Loader";

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contacts);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createContact(form));
  };

  useEffect(() => {
    if (success) {
      // You can replace this with a toast/notification later
      alert("Your message has been sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
      dispatch(resetContactState());
    }

    if (error) {
      // You can replace this with a toast/notification later
      alert(`Error: ${error}`);
    }
  }, [success, error, dispatch]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <Textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
