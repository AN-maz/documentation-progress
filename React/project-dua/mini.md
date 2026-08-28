# Mini Project Personal - Multi page 

Di Modul ini teman-teman akan memcoba membuat web multi page dengan materi yang sudah diperoleh, jadi akan coba membuat contoh tempatenya yang nanti untuk konten ataupun temanya teman-teman bisa improve dengan selera atau konsep masing-masing.

Jadi lebih ke mempelajari workflow projectnya

# Setup project

cari lokasi project yg akan disimpan, kemudian buka terminal, ketik:

```bash
npm create vite@latest
```
kemudian:
- isi nama project 
- Select a framework `React`
- select a variant `JavaScript`
- Which Linter to use `ESlint`
- Install with npm and start now `yes`

lalu buka file projectnya

--- 

## Setup Tailwind

bisa kunjungi web dokumentasinya: `https://tailwindcss.com/docs/installation/using-vite`

kemudian ikuti step by stepnya

### Step 4
Temen-temen bisa simpan di file `index.css` jadi nanti untuk file css cuma itu saja 

untuk file app.css bisa dihapus

### Hasil projectnya kosongan

harusnya untuk file yang ada strukturnya seperti ini:

````
src
|____app.jsx
|____main.jsx
|____index.css
````

### app.jsx

```jsx

function App(){
  return(
    <>
    <h1>Hello MasPur</h1
    ></>
  )
}

export default App
```

# Struktur Project

```plaintext
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── FeatureCard.jsx
│   │       └── ProfileCard.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── hooks/
│   │   └── useDocumentTitle.js
│   ├── views/
│   │   ├── AboutView.jsx
│   │   ├── ContactView.jsx
│   │   └── HomeView.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
```

## App Derectory

### file `index.css`

```css
@import "tailwindcss";

@theme {
  --color-primary: #4F46E5;
  --color-secondary: #14B8A6;
  --color-dark: #1E293B;
}

html {
  scroll-behavior: smooth;
}
```

### App.jsx

```jsx

import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomeView from './views/HomeView'
import AboutView from './views/AboutView'
import ContactView from './views/ContactView'
import { useDocumentTitle } from './hooks/useDocumentTitle'

const pageTitles = {
  home: null,
  about: 'About',
  contact: 'Contact',
}

function App() {
  const [activePage, setActivePage] = useState('home')

  useDocumentTitle(pageTitles[activePage])

  function renderView() {
    switch (activePage) {
      case 'about':
        return <AboutView />
      case 'contact':
        return <ContactView />
      default:
        return <HomeView onNavigate={setActivePage} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1">{renderView()}</main>
      <Footer />
    </div>
  )
}

export default App

```

## view directory

### HomeView.jsx

```jsx
import { services, companyInfo } from '../data/mockData'
import Button from '../components/ui/Button'
import FeatureCard from '../components/ui/FeatureCard'

function HomeView({ onNavigate }) {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-dark mb-4">
            {companyInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-dark/60 mb-8 max-w-2xl mx-auto">
            {companyInfo.tagline}
          </p>
          <Button variant="primary" onClick={() => onNavigate('about')}>
            Learn More About Us
          </Button>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">
          Our Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <FeatureCard
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default HomeView
```

### AboutView.jsx

```jsx
import { companyInfo, team } from '../data/mockData'
import ProfileCard from '../components/ui/ProfileCard'

function AboutView() {
  return (
    <>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-dark text-center mb-6">About OXIGEN</h2>
        <p className="text-dark/70 text-lg leading-relaxed text-center mb-12">
          {companyInfo.description}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-dark/70 leading-relaxed">{companyInfo.vision}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
            <ul className="space-y-3">
              {companyInfo.mission.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-dark/70">
                  <span className="text-secondary mt-1 shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-dark/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <ProfileCard
                key={member.id}
                name={member.name}
                role={member.role}
                photo={member.photo}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutView
```

### ContactView.jsx

```jsx
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
```

## components directory

### layout/Navbar.jsx

```jsx
import { useState } from 'react'
import { navLinks } from '../../data/mockData'

function Navbar({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-dark text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button
          onClick={() => { onNavigate('home'); setOpen(false) }}
          className="text-2xl font-bold tracking-tight hover:text-secondary transition-colors cursor-pointer"
        >
          OXIGEN
        </button>

        <button
          className="md:hidden cursor-pointer p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activePage === link.id
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div className="md:hidden bg-dark px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setOpen(false) }}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-1 cursor-pointer ${
                activePage === link.id
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
```

### layout/Footer.jsx

```jsx
function Footer() {
  return (
    <footer className="bg-dark text-white/60 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} OXIGEN. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
```

### ui/Button.jsx

```jsx
function Button({ children, variant = 'primary', onClick, type = 'button' }) {
  const base = 'inline-block font-semibold rounded-lg transition-all duration-200 cursor-pointer text-center'

  const styles = {
    primary: 'bg-primary text-white hover:opacity-90 px-6 py-3',
    secondary: 'bg-secondary text-white hover:opacity-90 px-6 py-3',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3',
  }

  return (
    <button type={type} className={`${base} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
```

### ui/FeatureCard.jsx

```jsx
function FeatureCard({ title, description }) {
  return (
    <article className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-secondary hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold text-dark mb-3">{title}</h3>
      <p className="text-dark/70 leading-relaxed">{description}</p>
    </article>
  )
}

export default FeatureCard
```

### ui/ProfileCard.jsx

```jsx
function ProfileCard({ name, role, photo }) {
  return (
    <article className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
      <img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 bg-primary/10"
      />
      <h3 className="text-lg font-bold text-dark">{name}</h3>
      <p className="text-secondary font-medium text-sm mt-1">{role}</p>
    </article>
  )
}

export default ProfileCard
```

## hooks directory

### useDocumentTitle.js

```js
import { useEffect } from 'react'

export function useDocumentTitle(pageName) {
  useEffect(() => {
    document.title = pageName ? `OXIGEN | ${pageName}` : 'OXIGEN'
    window.scrollTo(0, 0)
  }, [pageName])
}
```

## data directory

### mockData.js

```js
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export const services = [
  {
    id: 1,
    title: 'English Club',
    description: 'Weekly conversation practice to boost your English speaking confidence in a friendly environment.',
  },
  {
    id: 2,
    title: 'Writing Workshop',
    description: 'Learn academic and creative writing skills through guided workshops and peer reviews.',
  },
  {
    id: 3,
    title: 'Cultural Exchange',
    description: 'Explore diverse cultures through events, food festivals, and international student partnerships.',
  },
  {
    id: 4,
    title: 'Debate & Public Speaking',
    description: 'Sharpen your argumentation and presentation skills in a supportive competitive setting.',
  },
]

export const team = [
  {
    id: 1,
    name: 'Alexandra Chen',
    role: 'President',
    photo: 'https://api.dicebear.com/9.x/avataaars/svg?seed=alexandra',
  },
  {
    id: 2,
    name: 'Bryan Pratama',
    role: 'Vice President',
    photo: 'https://api.dicebear.com/9.x/avataaars/svg?seed=bryan',
  },
  {
    id: 3,
    name: 'Citra Dewi',
    role: 'Secretary',
    photo: 'https://api.dicebear.com/9.x/avataaars/svg?seed=citra',
  },
  {
    id: 4,
    name: 'Dimas Saputra',
    role: 'Treasurer',
    photo: 'https://api.dicebear.com/9.x/avataaars/svg?seed=dimas',
  },
  {
    id: 5,
    name: 'Purwa',
    role: 'Staff',
    photo: 'https://api.dicebear.com/9.x/avataaars/svg?seed=putra',
  }
]

export const companyInfo = {
  name: 'OXIGEN',
  tagline: 'Empowering Voices, Connecting Cultures',
  description: 'OXIGEN is a student-led organization dedicated to fostering language learning, cultural understanding, and personal growth. Founded in 2020, we have grown into a vibrant community of learners and leaders.',
  vision: 'To be a leading platform that empowers individuals to communicate confidently across cultures and languages.',
  mission: [
    'Provide accessible language learning opportunities for all students.',
    'Create a supportive community for cultural exchange and collaboration.',
    'Develop leadership and communication skills through practical experiences.',
  ],
}
``` 






