const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    margin: 50,
    size: 'A4'
});

doc.pipe(fs.createWriteStream('certs/Mohamad_Nihad_Alsufe_Resume.pdf'));

const primaryFont = 'Helvetica';
const boldFont = 'Helvetica-Bold';
const italicFont = 'Helvetica-Oblique';
const primaryColor = '#000000';
const secondaryColor = '#333333';



function drawDivider() {
    doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - 50, doc.y).strokeColor('#cccccc').stroke().strokeColor(primaryColor);
    doc.moveDown(0.5);
}



function addSectionHeader(title) {
    doc.moveDown(0.5);
    doc.font(boldFont).fontSize(14).fillColor(primaryColor).text(title.toUpperCase());
    drawDivider();
}



function addExperienceHeader(title, company, date, location) {
    doc.font(boldFont).fontSize(12).fillColor(primaryColor).text(title, { continued: true });
    doc.font(primaryFont).text(` | ${company} `, { continued: true });
    doc.font(italicFont).fontSize(10).fillColor(secondaryColor).text(`— ${location}`, { align: 'right' });
    doc.font(italicFont).fontSize(10).text(date);
    doc.moveDown(0.3);
}



function addBullet(text) {
    doc.font(primaryFont).fontSize(10).fillColor(secondaryColor).text(`• ${text}`, {
        lineGap: 3,
        paragraphGap: 4
    });
}



doc.font(boldFont).fontSize(24).fillColor(primaryColor).text('Mohamad Nihad Alsufe', { align: 'center' });
doc.font(primaryFont).fontSize(12).fillColor(secondaryColor).text('CEO & CTO | AI Systems Architect | Full-Stack Engineer', { align: 'center' });
doc.moveDown(0.4);

doc.font(primaryFont).fontSize(10).text(
    'Sharjah, UAE | +971 56 910 0882 | mn121529@gmail.com',
    { align: 'center' }
);
doc.fillColor('#0066cc').text(
    'linkedin.com/in/mo-nihad-alsufe | github.com/abolambA | ovm.ae',
    { align: 'center', link: 'https://www.linkedin.com/in/mo-nihad-alsufe/' }
);
doc.fillColor(primaryColor);



addSectionHeader('Professional Summary');
doc.font(primaryFont).fontSize(10).fillColor(secondaryColor).text(
    'Visionary technical leader and AI Systems Architect with extensive experience in designing and deploying fast, highly-scalable, production-level infrastructures. As the CEO and CTO of Organic Vision AI, I bridge the gap between business strategy and deep-tech engineering, architecting multi-agent LLM systems, developing cross-platform applications, and pioneering integrations in humanoid robotics and intelligent automation. Proven track record of delivering enterprise-grade cloud backends, engaging in high-stakes hackathons, and fostering technology communities across the Middle East.',
    { align: 'justify', lineGap: 3 }
);



addSectionHeader('Professional Experience');

addExperienceHeader('CEO & CTO & AI Systems Architect', 'Organic Vision AI', 'Present', 'Sharjah, UAE');
addBullet('Lead the end-to-end technical direction and business strategy of an AI-first media and marketing agency, ensuring no disconnect between strategic enterprise goals and cutting-edge engineering execution.');
addBullet('Architect and deploy fast, highly scalable AI systems and infrastructure tailored for extreme high-performance demands, utilizing Google Cloud and NVIDIA generative AI frameworks.');
addBullet('Develop and integrate advanced Agentic AI workflows and multi-agent systems using LangChain, n8n, Claude, and specialized orchestration tools to automate content pipelines and data analysis.');
addBullet('Spearhead research and implementation of humanoid robotics, specifically investigating integrations with the T1 humanoid robot from Booster Robotics for autonomous AI-driven tasks.');
addBullet('Build comprehensive full-stack and cloud-native solutions leveraging Next.js, React, Node.js, and Firebase (Cloud Functions, Firestore, Realtime DB) to power core product offerings.');

doc.moveDown(0.5);
addExperienceHeader('Founder & Community Leader', 'Syrian Speedcubing Community', '2019 – Present', 'Syria / UAE');
addBullet('Founded and scaled the national competitive speedcubing community from zero establishing robust event frameworks and active member ecosystems.');
addBullet('Nationally ranked #4 competitive speedcuber in Syria.');
addBullet('Appointed as the official Middle East brand representative for Cubuzzle, managing regional partnerships and technical brand integrations.');



addSectionHeader('Key Technical Initiatives');
doc.font(boldFont).fontSize(11).fillColor(primaryColor).text('NearSchool — Production EdTech Architecture');
doc.moveDown(0.2);
addBullet('Architected and shipped a live production mobile application resolving school-parent communication bottlenecks at massive scale.');
addBullet('Built entirely on Flutter for a unified iOS/Android codebase, backed by Firebase Realtime DB and Firestore utilizing highly-optimized offline-first sync protocols.');

doc.moveDown(0.5);
doc.font(boldFont).fontSize(11).fillColor(primaryColor).text('Agentic AI & LLM Automation Pipelines');
doc.moveDown(0.2);
addBullet('Engineered multi-tenant intelligence engines capable of autonomous campaign ideation, scheduling, and brand-safe content delivery without human intervention.');
addBullet('Created proprietary orchestration scripts utilizing Model Context Protocol (MCP), Python, Flowise, and n8n to connect diverse APIs with deterministic LLM behaviors.');



addSectionHeader('Technical Skills & Expertise');

const skillsX = doc.x;
doc.font(boldFont).fontSize(10).fillColor(primaryColor).text('AI & Architecture:', skillsX);
doc.font(primaryFont).fillColor(secondaryColor).text('Agentic AI (LangChain, Flowise, n8n, MCP) • LLM Integrations (Claude, OpenAi, Google Cloud, NVIDIA) • System Design • Cloud Architecture', skillsX + 110, doc.y - 12);

doc.moveDown(0.5);
doc.font(boldFont).fillColor(primaryColor).text('Languages/Web:', skillsX);
doc.font(primaryFont).fillColor(secondaryColor).text('TypeScript, JavaScript, Dart, Python, C++ • React, Next.js, Node.js, Tailwind CSS', skillsX + 110, doc.y - 12);

doc.moveDown(0.5);
doc.font(boldFont).fillColor(primaryColor).text('Infrastructure:', skillsX);
doc.font(primaryFont).fillColor(secondaryColor).text('Firebase (Firestore, Realtime DB, Cloud Functions) • REST APIs, WebSockets, OAuth 2.0, JWT • CI/CD pipeline automation', skillsX + 110, doc.y - 12);

doc.moveDown(0.5);
doc.font(boldFont).fillColor(primaryColor).text('Creative Media:', skillsX);
doc.font(primaryFont).fillColor(secondaryColor).text('Adobe Premiere Pro, After Effects, Photoshop, Figma, Motion Graphics, Fusion 360', skillsX + 110, doc.y - 12);

doc.moveDown(0.5);
doc.font(boldFont).fillColor(primaryColor).text('Core Competencies:', skillsX);
doc.font(primaryFont).fillColor(secondaryColor).text('Executive Leadership, Product Management, High-Stakes Hackathons, Humanoid Robotics Integration', skillsX + 110, doc.y - 12);

doc.moveDown(0.5);
doc.font(boldFont).fillColor(primaryColor).text('Languages:', skillsX);
doc.font(primaryFont).fillColor(secondaryColor).text('Arabic (Native) • English (C2/Bilingual) • Turkish (B2) • German (B1)', skillsX + 110, doc.y - 12);



doc.moveDown(1.5);


addSectionHeader('Certifications, Awards & Developer Programs');
doc.font(primaryFont).fontSize(10).fillColor(secondaryColor);

const certs = [
    'Apple & Google Developer Programs — Active Verified Member',
    'GCAA Licensed Commercial Drone Operator — UAE Civil Aviation',
    'MCP: Build Agents with Claude, Cursor, Flowise, Python & n8n — Udemy (Feb 2026)',
    'AI Agents: Building Teams of LLM Agents That Work For You — Udemy (Jan 2026)',
    'Introduction to AI Automation with n8n & LangChain — Udemy (Jan 2026)',
    'Certificate of Recognition — WORLDDEF Dubai (Feb 2026)',
    'Certificate of Appreciation — UAE National Hackathon, TDRA (Feb 2025)',
    'Certificate of Appreciation — KUEC Robothon, Khalifa University Enterprises & Huawei (Nov 2025)',
    'Galactic Problem Solver — NASA International Space Apps Challenge (Oct 2023)',
    'TDRA Virtual Camp Completion — 9th Edition, UAE Digital Government (Aug 2023)'
];

certs.forEach(cert => addBullet(cert));



doc.end();
console.log("Extended ATS Resume generated successfully at certs/Mohamad_Nihad_Alsufe_Resume.pdf");
