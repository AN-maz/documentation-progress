import { useState } from 'react'
import Button from '../components/ui/Button'

function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-dark text-center mb-4">Contact Us</h2>
      <p className="text-dark/60 text-center mb-10">
        Have a question or want to get involved? Drop us a message!
      </p>

      {submitted && (
        <p className="text-secondary font-semibold text-center mb-6 bg-secondary/10 py-3 rounded-lg">
          Thank you! Your message has been sent successfully.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-dark font-medium mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-dark/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-dark"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-dark font-medium mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-dark/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-dark"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-dark font-medium mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full border border-dark/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-dark resize-none"
            placeholder="Write your message here..."
          />
        </div>

        <Button type="submit" variant="primary">Send Message</Button>
      </form>
    </section>
  )
}

export default ContactView
