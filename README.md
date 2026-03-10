# Portfolio - Mohamad Nihad Alsufe

This is the source code for my personal portfolio website. It showcases my work as a CEO, CTO, and Full-Stack Developer based in the UAE.

## Project Structure

- `index.html`: Main entryway and structural layout.
- `css/style.css`: Custom styling, including a clean dark-mode aesthetic and responsive grid system.
- `js/script.js`: Interactive elements like the custom cursor, particle background, and scroll-reveal animations.
- `server.js`: Node.js backend using Express and Resend for the contact form.

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS, JavaScript.
- **Backend**: Node.js, Express.
- **Tools**: Google Cloud, Firebase, Resend API.
- **Hosting**: Designed for deployment on Vercel.

## Local Setup

1. **Clone the repo.**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Create a `.env` file in the root and add your Resend API key:
   ```env
   RESEND_API_KEY=your_key_here
   ```
4. **Run the server**:
   ```bash
   npm start
   ```
   The site will be available on `http://localhost:3000`.

## Scripts

- `generate_resume.js`: A specialized script that generates an ATS-friendly PDF version of my career highlights.

---
Built and maintained by Mohamad Nihad Alsufe.
