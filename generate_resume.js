const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument({
    margin: 50,
    size: 'A4'
});

// Pipe its output somewhere, like to a file or HTTP response
doc.pipe(fs.createWriteStream('certs/Mohamad_Nihad_Alsufe_Resume.pdf'));

const primaryFont = 'Helvetica';
const boldFont = 'Helvetica-Bold';

// ---------------- HEADER ----------------
doc.font(boldFont).fontSize(22).text('Mohamad Nihad Alsufe', { align: 'center' });

doc.moveDown(0.3);
doc.font(primaryFont).fontSize(10).text(
    'Sharjah, UAE | +971 56 910 0882 | mn121529@gmail.com',
    { align: 'center' }
);
doc.text(
    'linkedin.com/in/mo-nihad-alsufe | github.com/abolambA | ovm.ae',
    { align: 'center' }
);

doc.moveDown(1.5);

// Helper function for section titles
function addSectionHeader(title) {
    doc.font(boldFont).fontSize(14).text(title.toUpperCase());
    doc.moveTo(doc.x, doc.y).lineTo(doc.x + 495, doc.y).stroke();
    doc.moveDown(0.5);
}

// ---------------- EXPERIENCE ----------------
addSectionHeader('Experience');

doc.font(boldFont).fontSize(12).text('Organic Vision', { continued: true });
doc.font(primaryFont).text(' | Sharjah, UAE', { align: 'right' });
doc.font(boldFont).fontSize(11).text('CEO & CTO');
doc.moveDown(0.2);
doc.font(primaryFont).fontSize(10).text('• Run a UAE-based AI media and marketing agency constructing intelligent pipeline systems and AI-enhanced technical infrastructure.');
doc.text('• Architect full-stack production systems: LLM pipelines, automated content generation, REST APIs, and multi-provider auth flows.');
doc.text('• Take end-to-end ownership of product delivery: defining system architecture in Next.js / React, cloud capabilities in Firebase, and client strategy.');

doc.moveDown(0.8);

doc.font(boldFont).fontSize(12).text('Syrian Speedcubing Community', { continued: true });
doc.font(primaryFont).text(' | Syria', { align: 'right' });
doc.font(boldFont).fontSize(11).text('Founder & Leader');
doc.moveDown(0.2);
doc.font(primaryFont).fontSize(10).text('• Founded and scaled the national competitive speedcubing community from zero.');
doc.text('• Currently nationally ranked #4 cuber in Syria.');
doc.text('• Official Middle East brand representative for Cubuzzle.');

doc.moveDown(1.5);

// ---------------- PROJECTS & ENGINEERING ----------------
addSectionHeader('Projects & Engineering');

doc.font(boldFont).fontSize(11).text('NearSchool');
doc.font(primaryFont).fontSize(10).text('• Live production app tackling school-parent communication at scale.');
doc.text('• Built using Flutter (cross-platform iOS & Android codebase) and Firebase (Cloud Functions, Realtime DB, Firestore, Offline-first architecture).');

doc.moveDown(0.8);

doc.font(boldFont).fontSize(11).text('AI Media Pipelines & Platform Infrastructure');
doc.font(primaryFont).fontSize(10).text('• Constructed comprehensive multi-tenant LLM content engines to auto-schedule and publish on-brand creative campaigns.');
doc.text('• End-to-end video production capability including aerial drone cinematography (GCAA Licensed), Premiere Pro, After Effects, and Adobe integration pipelines.');

doc.moveDown(1.5);

// ---------------- SKILLS ----------------
addSectionHeader('Skills & Tools');
doc.font(boldFont).fontSize(10).text('Languages & Frameworks: ', { continued: true });
doc.font(primaryFont).text('Dart, TypeScript, Node.js, C++, React, Next.js, Tailwind CSS, Flutter');
doc.moveDown(0.2);

doc.font(boldFont).text('Cloud & Architecture: ', { continued: true });
doc.font(primaryFont).text('Firebase (Firestore, Realtime DB, Cloud Functions), REST APIs, WebSockets, JWT, OAuth 2.0');
doc.moveDown(0.2);

doc.font(boldFont).text('Creative & Media: ', { continued: true });
doc.font(primaryFont).text('Adobe Premiere Pro, After Effects, Photoshop, Figma, Color Grading, Motion Graphics, Fusion 360');
doc.moveDown(0.2);

doc.font(boldFont).text('Other: ', { continued: true });
doc.font(primaryFont).text('Business Strategy, Product Management, AI Marketing, Git, CI/CD');
doc.moveDown(0.2);

doc.font(boldFont).text('Spoken Languages: ', { continued: true });
doc.font(primaryFont).text('Arabic (Native), English (C2), Turkish (B2), German (B1)');

doc.moveDown(1.5);

// ---------------- AWARDS & RECOGNITION ----------------
addSectionHeader('Awards & Certifications');
doc.font(primaryFont).fontSize(10);
doc.text('• Apple & Google Developer Programs Active Member');
doc.text('• GCAA Licensed Drone Operator (UAE Civil Aviation)');
doc.text('• Certificate of Recognition, WORLDDEF 2026 Dubai');
doc.text('• Certificate of Appreciation, TDRA UAE National Hackathon (Feb 2025)');
doc.text('• KUEC Robothon Completion, Khalifa University Enterprises (Nov 2025)');
doc.text('• NASA Galactic Problem Solver, International Space Apps Challenge (Oct 2023)');
doc.text('• TDRA Virtual Camp 9th Edition Completion (Aug 2023)');

// Finalize PDF file
doc.end();
console.log("PDF Resume generated successfully at certs/Mohamad_Nihad_Alsufe_Resume.pdf");
